import { useState, useEffect } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 glassmorphism rounded-full px-6 py-3">
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              activeSection === item.href.substring(1)
                ? "text-cyber-blue"
                : "text-white hover:text-cyber-blue"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
