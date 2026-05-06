import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 600, suffix: '+', label: 'Workers', duration: 2000 },
  { value: 100, suffix: '%', label: 'Result Rate', duration: 1800 },
  { value: 312, suffix: '%', prefix: '+', label: 'Average ROI', duration: 2200 },
  { value: 10, suffix: 'M+', prefix: '$', label: 'Generated Revenue', duration: 1600 },
];

function AnimatedNumber({ value, suffix, prefix, duration, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <span className="stat-number">
      {prefix || ''}{count}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" id="stats" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div
            className={`stat-item reveal reveal-delay-${i + 1}`}
            key={stat.label}
          >
            <AnimatedNumber
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              duration={stat.duration}
              isVisible={isVisible}
            />
            <div className="stat-text">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
