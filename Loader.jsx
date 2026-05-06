import { useState, useEffect } from 'react';

export default function Loader() {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Completely remove the loader from DOM after 2.5 seconds
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`global-loader ${isFading ? 'fade-out' : ''}`}>
      <img
        src="https://cdn.dribbble.com/userupload/23043714/file/original-24fdb53d3c4e5e50b14c006b87ee5085.gif"
        alt="Loading..."
        className="loader-gif"
        onError={(e) => {
          // Fallback if Dribbble hotlinking is blocked
          e.target.style.display = 'none';
        }}
      />
      {/* Optional fallback text logic if image fails */}
      <h2 className="loader-text">ANGRY SNAKES</h2>
    </div>
  );
}
