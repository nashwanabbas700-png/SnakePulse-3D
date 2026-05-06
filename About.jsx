import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">About Us</div>
        <h2 className="section-title">ABOUT OUR AGENCY</h2>
        <p className="section-desc">
          We build aggressive digital strategies that turn attention into profit
          and brands into leaders. Our team of 600+ experts delivers results
          that speak for themselves.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-features">
          <div className="about-feature reveal reveal-delay-1">
            <div className="about-feature-icon">🎯</div>
            <div>
              <h4>Strategic Vision</h4>
              <p>
                We don't just market — we engineer attention. Our data-driven
                approach ensures every dollar works harder.
              </p>
            </div>
          </div>
          <div className="about-feature reveal reveal-delay-2">
            <div className="about-feature-icon">⚡</div>
            <div>
              <h4>Rapid Execution</h4>
              <p>
                Speed kills the competition. We move fast, iterate faster, and
                deliver results at unprecedented velocity.
              </p>
            </div>
          </div>
          <div className="about-feature reveal reveal-delay-3">
            <div className="about-feature-icon">🔥</div>
            <div>
              <h4>Aggressive Growth</h4>
              <p>
                Average isn't in our vocabulary. We push boundaries and shatter
                ceilings to scale your brand relentlessly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
