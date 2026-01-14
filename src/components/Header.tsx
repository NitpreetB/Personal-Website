import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-light-gray' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[120rem] mx-auto px-[10%] py-8 flex items-center justify-between">

        <div className="flex items-center gap-12">
          <button
            onClick={() => scrollToSection('home')}
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('resume')}
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300"
          >
            Resume
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300"
          >
            Contact
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
