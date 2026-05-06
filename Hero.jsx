import { useState, useEffect } from 'react';
import SnakeSequence from './SnakeSequence';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Background gradient overlay */}
      <div className="hero-bg-gradient" />

      {/* Snake animation */}
      <SnakeSequence scrollProgress={scrollProgress} />

      {/* Dark overlay for text readability */}
      <div className="hero-overlay" />

      {/* Main content */}
      <div className="hero-content">
        {/* Left side */}
        <div className="hero-left">
          <h1 className="hero-title">
            ANGRY<br />SNAKES
          </h1>
          <p className="hero-subtitle">
            Aggressive agency for best business solutions
          </p>
          <div className="hero-cta">
            <button className="btn-services" id="btn-services">Services</button>
            <button className="btn-play" id="btn-play" aria-label="Play video">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="hero-right">
          <div className="hero-tagline">
            <h2>We Turn<br />Attention<br />Into Money</h2>
            <p>
              We build aggressive digital strategies that turn attention into
              profit and brands into leaders.
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">+312%</div>
              <div className="stat-label">average ROI</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">$10M+</div>
              <div className="stat-label">generated for clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="hero-bottom-stats">
        <div className="bottom-stat">
          <div className="bottom-stat-item">
            <div className="value">600</div>
            <div className="label">workers</div>
          </div>
          <div className="bottom-stat-divider" />
          <div className="bottom-stat-item">
            <div className="value">100%</div>
            <div className="label">result</div>
          </div>
        </div>
      </div>

      {/* Bottom tags */}
      <div className="hero-bottom-tags">
        <span className="tag-pill">YOUR PLAN</span>
        <span className="tag-pill">DIGITAL</span>
        <span className="tag-pill">AGENCY</span>
      </div>
    </section>
  );
}
