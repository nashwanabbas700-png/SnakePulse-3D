import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 192;
const FPS = 24;

// Pre-build all image paths
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(5, '0');
  return `/Sequence Snake/${num}.png`;
});

export default function SnakeSequence({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const allLoadedRef = useRef(false);

  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    // Set canvas size to match image aspect ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw image covering the canvas
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = rect.width / rect.height;

    let drawW, drawH, drawX, drawY;
    if (canvasAspect > imgAspect) {
      drawW = rect.width;
      drawH = rect.width / imgAspect;
      drawX = 0;
      drawY = (rect.height - drawH) / 2;
    } else {
      drawH = rect.height;
      drawW = rect.height * imgAspect;
      drawX = (rect.width - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload all images
  useEffect(() => {
    const images = [];

    framePaths.forEach((path, i) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedCountRef.current++;
        if (loadedCountRef.current === TOTAL_FRAMES) {
          allLoadedRef.current = true;
          drawFrame(0);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawFrame]);

  // Animation loop
  useEffect(() => {
    const interval = 1000 / FPS;

    const animate = (timestamp) => {
      animationRef.current = requestAnimationFrame(animate);

      if (!allLoadedRef.current) return;

      const delta = timestamp - lastTimeRef.current;
      if (delta < interval) return;

      lastTimeRef.current = timestamp - (delta % interval);
      currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
      drawFrame(currentFrameRef.current);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (allLoadedRef.current) {
        drawFrame(currentFrameRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Apply scroll-based scale
  const scale = 1 - scrollProgress * 0.15;

  return (
    <div
      className="snake-canvas-container"
      style={{ transform: `scale(${scale})` }}
    >
      <canvas ref={canvasRef} className="snake-canvas" />
    </div>
  );
}
