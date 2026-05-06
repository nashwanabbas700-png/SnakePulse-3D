const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#stats' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-logo">ANGRY SNAKES</div>
      <ul className="footer-links">
        {footerLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="footer-copy">© 2026 Angry Snakes Agency</div>
    </footer>
  );
}
