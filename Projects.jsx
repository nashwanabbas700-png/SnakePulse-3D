import { useEffect, useRef } from 'react';

const projects = [
  {
    number: '01',
    category: 'Branding',
    title: 'VENOM STUDIOS',
    image: '/Sequence Snake/00030.png',
  },
  {
    number: '02',
    category: 'Marketing',
    title: 'COBRA FINANCE',
    image: '/Sequence Snake/00080.png',
  },
  {
    number: '03',
    category: 'Growth',
    title: 'MAMBA TECH',
    image: '/Sequence Snake/00140.png',
  },
];

export default function Projects() {
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
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-header reveal">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">OUR PROJECTS</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <div
            className={`project-card reveal reveal-delay-${i + 1}`}
            key={project.number}
            id={`project-${project.number}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-card-image"
            />
            <div className="project-card-overlay" />
            <span className="project-number">{project.number}</span>
            <div className="project-card-content">
              <div className="project-category">{project.category}</div>
              <h3>{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
