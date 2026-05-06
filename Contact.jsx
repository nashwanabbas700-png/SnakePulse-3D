import { useEffect, useRef } from 'react';

export default function Contact() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label" style={{ justifyContent: 'center' }}>
          Get In Touch
        </div>
      </div>
      <h2 className="contact-title reveal reveal-delay-1">LET'S TALK</h2>
      <p className="contact-desc reveal reveal-delay-2">
        We turn attention into money. Ready to dominate?
      </p>
      <button className="btn-contact reveal reveal-delay-3" id="btn-contact">
        Start a Project
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
      <div className="contact-info reveal reveal-delay-4">
        <div className="contact-info-item">
          <span>Email</span>
          hello@angrysnakes.com
        </div>
        <div className="contact-info-item">
          <span>Phone</span>
          +1 234 567 8900
        </div>
      </div>
    </section>
  );
}
