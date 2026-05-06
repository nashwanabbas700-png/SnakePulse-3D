import { useEffect, useRef } from 'react';

const services = [
  {
    icon: '📈',
    title: 'MARKETING',
    desc: 'Digital strategy that cuts through the noise. We create campaigns that dominate feeds and drive conversions.',
    items: ['Social Media Domination', 'Paid Advertising', 'SEO & Content Strategy', 'Email Automation'],
  },
  {
    icon: '🎨',
    title: 'BRANDING',
    desc: 'Creative design that commands attention. We build brand identities that are impossible to ignore.',
    items: ['Brand Identity Design', 'Visual Guidelines', 'UI/UX Design', 'Motion Graphics'],
  },
  {
    icon: '🚀',
    title: 'GROWTH',
    desc: 'Scaling brands from local to global. We engineer growth systems that compound results over time.',
    items: ['Growth Hacking', 'Conversion Optimization', 'Analytics & Insights', 'Market Expansion'],
  },
];

export default function Services() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-header reveal">
        <div className="section-label">What We Do</div>
        <h2 className="section-title">OUR SERVICES</h2>
        <p className="section-desc">
          Three pillars of dominance. Every service is designed to make your
          competition irrelevant.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, i) => (
          <div
            className={`service-card reveal reveal-delay-${i + 1}`}
            key={service.title}
            id={`service-${service.title.toLowerCase()}`}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <ul className="service-list">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
