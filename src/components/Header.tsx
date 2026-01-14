import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/story' },
    { label: 'Work', path: '/work' },
    { label: 'Education', path: '/education' },
    { label: 'Projects', path: '/projects' },
    { label: 'Travel', path: '/travel' },
    { label: 'Activities', path: '/activities' },
    { label: 'Music', path: '/music' },
    { label: 'Movies', path: '/movies' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-light-gray' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[120rem] mx-auto px-[5%] py-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-heading text-xl font-bold text-foreground hover:text-accent transition-colors duration-300"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-accent font-semibold'
                  : 'text-foreground hover:text-accent'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="text-foreground hover:text-accent transition-colors">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-paragraph text-base uppercase tracking-wider transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-accent font-semibold'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
