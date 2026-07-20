import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';

const menuGroups: { label: string; links: { label: string; path: string }[] }[] = [
  {
    label: 'The Work',
    links: [
      { label: 'RouteGrade', path: '/routegrade' },
      { label: 'Projects', path: '/projects' },
      { label: 'Experience', path: '/work' },
      { label: 'Education', path: '/education' },
    ],
  },
  {
    label: 'The Person',
    links: [
      { label: 'My Story', path: '/story' },
      { label: 'Travel', path: '/travel' },
    ],
  },
  {
    label: 'The Takes',
    links: [
      { label: 'Music', path: '/music' },
      { label: 'Movies', path: '/movies' },
    ],
  },
];

const quickLinks = [
  { label: 'RouteGrade', path: '/routegrade' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/work' },
  { label: 'Story', path: '/story' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the overlay on navigation and lock body scroll while open
  useEffect(() => setIsOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
          isScrolled && !isOpen
            ? 'bg-background/85 backdrop-blur-md border-b border-light-gray'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-site mx-auto px-[5%] py-5 flex items-center justify-between">
          <Link
            to="/"
            className="font-heading italic text-2xl text-foreground hover:text-accent transition-colors duration-300"
          >
            nb<span className="text-accent">.</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-paragraph text-xs uppercase tracking-widestplus transition-colors duration-300 ${
                    location.pathname.startsWith(link.path)
                      ? 'text-accent'
                      : 'text-dark-gray hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen((v) => !v)}
              className="group flex items-center gap-3 font-paragraph text-xs uppercase tracking-widestplus text-foreground"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="hidden sm:inline">{isOpen ? 'Close' : 'Index'}</span>
              <span className="relative w-8 h-8 border border-light-gray group-hover:border-accent transition-colors duration-300 flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block w-4 h-px bg-foreground transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-[3px]' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-px bg-foreground transition-transform duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-[3px]' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen index overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="min-h-full max-w-site mx-auto px-[5%] pt-32 pb-16 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {menuGroups.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + gi * 0.08 }}
                  >
                    <p className="eyebrow mb-6">
                      0{gi + 1} — {group.label}
                    </p>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={`group inline-flex items-baseline gap-3 font-heading text-4xl lg:text-5xl leading-tight transition-colors duration-300 ${
                              location.pathname === link.path
                                ? 'text-accent italic'
                                : 'text-foreground hover:text-accent hover:italic'
                            }`}
                          >
                            {link.label}
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-16 pt-8 border-t border-light-gray flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <p className="font-paragraph text-sm text-secondary">{site.location}</p>
                <div className="flex items-center gap-6 font-paragraph text-xs uppercase tracking-widestplus">
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-dark-gray hover:text-accent transition-colors">
                    GitHub
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-dark-gray hover:text-accent transition-colors">
                    LinkedIn
                  </a>
                  <a href={`mailto:${site.email}`} className="text-dark-gray hover:text-accent transition-colors">
                    Email
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
