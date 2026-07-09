import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-panel border-t border-light-gray relative overflow-hidden">
      {/* faint gold glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, #E3A857, transparent)' }}
      />

      <div className="max-w-site mx-auto px-[5%] pt-24 pb-12 relative">
        <div className="mb-20">
          <p className="eyebrow mb-6">Correspondence</p>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-x-3 gap-y-2 flex-wrap font-heading text-2xl md:text-4xl text-foreground hover:text-accent transition-colors duration-300"
          >
            <span className="italic">Write to me —</span>
            <span className="border-b border-accent/40 group-hover:border-accent transition-colors">
              {site.email}
            </span>
            <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pt-8 border-t border-light-gray">
          <div>
            <p className="font-heading italic text-xl text-foreground mb-1">
              {site.name}
            </p>
            <p className="font-paragraph text-sm text-secondary">
              © {currentYear}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-paragraph text-xs uppercase tracking-widestplus">
            <Link to="/projects" className="text-dark-gray hover:text-accent transition-colors">
              Projects
            </Link>
            <Link to="/work" className="text-dark-gray hover:text-accent transition-colors">
              Experience
            </Link>
            <Link to="/story" className="text-dark-gray hover:text-accent transition-colors">
              Story
            </Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-dark-gray hover:text-accent transition-colors">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-dark-gray hover:text-accent transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
