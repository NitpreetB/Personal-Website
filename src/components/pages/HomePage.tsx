import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { featuredProjects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { site } from '@/data/site';

// --- Shared shells ---

const SectionShell = ({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`w-full py-28 md:py-36 px-[5%] ${className}`}>
    <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-3">
        <span className="eyebrow sticky top-32 block">{label}</span>
      </div>
      <div className="md:col-span-9 lg:col-span-8">{children}</div>
    </div>
  </section>
);

const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Page ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);

  const heroWords = site.name.split(' ');

  const reviewLinks = [
    {
      title: 'Music',
      to: '/music',
      note: 'Albums on rotation, rated without mercy.',
      cover:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Movies',
      to: '/movies',
      note: 'The good, the bad, and the rewatched.',
      cover:
        'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[80]"
        style={{ scaleX }}
      />
      <Header />

      <main className="w-full relative">
        {/* --- HERO --- */}
        <section
          ref={heroRef}
          className="relative w-full min-h-screen flex flex-col justify-end px-[5%] pb-24 pt-40"
        >
          {/* Night-walk photo, sunk into the dark */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/photos/night-walk.jpg"
              alt=""
              aria-hidden
              className="w-full h-full object-cover object-center opacity-50 saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-site mx-auto w-full"
          >
            <h1 className="font-heading font-light text-[13.5vw] md:text-[10.5vw] leading-[0.9] tracking-tight text-foreground">
              {heroWords.map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.15 + wi * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${wi === 1 ? 'italic text-accent' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="md:col-span-6 font-paragraph text-lg md:text-xl font-light leading-relaxed text-dark-gray max-w-xl"
              >
                {site.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="md:col-span-6 md:text-right font-paragraph text-sm text-secondary"
              >
                <p>
                  Currently — <span className="text-foreground">{site.currently}</span>
                </p>
                <p className="mt-1">Mechatronics @ University of Waterloo</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-6 left-[5%] z-10 flex items-center gap-4"
          >
            <ArrowDown className="w-4 h-4 animate-bounce text-accent" />
            <span className="eyebrow">Scroll to explore</span>
          </motion.div>
        </section>

        {/* --- ABOUT --- */}
        <SectionShell label="01 — About">
          <Reveal>
            <p className="font-heading text-3xl md:text-5xl font-light leading-tight text-foreground">
              I like systems you can <em className="text-accent">feel</em> —
              pricing models that move markets, cameras that watch roads,
              platforms that balance on the edge.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray max-w-2xl">
              I'm a final-year Mechatronics Engineering student at the
              University of Waterloo, currently working in data at Super.com.
              Four co-ops deep into machine learning, computer vision, and
              analytics — and still collecting obsessions on the side.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              to="/story"
              className="group mt-12 inline-flex items-center gap-3 font-paragraph text-sm uppercase tracking-widestplus text-foreground border-b border-accent pb-2 hover:text-accent transition-colors duration-300"
            >
              Read my story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </SectionShell>

        {/* --- SELECTED PROJECTS --- */}
        <section className="w-full py-28 md:py-36 px-[5%] bg-panel border-y border-light-gray">
          <div className="max-w-site mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="eyebrow block mb-4">02 — Selected work</span>
                <h2 className="font-heading text-4xl md:text-6xl font-light text-foreground">
                  Projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="group hidden md:inline-flex items-center gap-2 font-paragraph text-xs uppercase tracking-widestplus text-secondary hover:text-accent transition-colors"
              >
                View all
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div>
              {featuredProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.05}>
                  <Link
                    to={`/projects/${project.id}`}
                    className="group grid grid-cols-12 gap-4 items-baseline py-10 border-b border-light-gray hover:border-accent/60 transition-colors duration-500"
                  >
                    <span className="col-span-2 md:col-span-1 font-heading italic text-lg text-secondary group-hover:text-accent transition-colors">
                      0{index + 1}
                    </span>
                    <div className="col-span-10 md:col-span-6">
                      <h3 className="font-heading text-2xl md:text-4xl font-light text-foreground group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
                        {project.title}
                      </h3>
                      <p className="mt-3 font-paragraph text-base text-secondary leading-relaxed max-w-xl md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0 transition-all duration-500">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-9 flex flex-wrap gap-2 md:justify-end">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-paragraph text-[0.65rem] uppercase tracking-widestplus text-secondary border border-light-gray px-3 py-1 group-hover:border-accent-dim transition-colors duration-500"
                        >
                          {tag}
                        </span>
                      ))}
                      <ArrowUpRight className="w-5 h-5 ml-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Link
              to="/projects"
              className="group mt-12 inline-flex md:hidden items-center gap-2 font-paragraph text-xs uppercase tracking-widestplus text-secondary hover:text-accent transition-colors"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* --- EXPERIENCE --- */}
        <SectionShell label="03 — Experience">
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <Reveal key={exp.id} delay={index * 0.05}>
                <Link
                  to="/work"
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-7 border-b border-light-gray hover:border-accent/60 transition-colors duration-500"
                >
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                      {exp.companyName}
                    </h3>
                    <p className="mt-1 font-paragraph text-sm text-secondary">
                      {exp.jobTitle}
                    </p>
                  </div>
                  <p className="font-paragraph text-xs uppercase tracking-widestplus text-secondary shrink-0">
                    {format(new Date(exp.startDate), 'MMM yyyy')} —{' '}
                    {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/work"
              className="group mt-12 inline-flex items-center gap-3 font-paragraph text-sm uppercase tracking-widestplus text-foreground border-b border-accent pb-2 hover:text-accent transition-colors duration-300"
            >
              Full experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </SectionShell>

        {/* --- OFF HOURS / REVIEWS --- */}
        <section className="w-full py-28 md:py-36 px-[5%] bg-panel border-y border-light-gray">
          <div className="max-w-site mx-auto">
            <span className="eyebrow block mb-4">04 — Off hours</span>
            <h2 className="font-heading text-4xl md:text-6xl font-light text-foreground mb-6">
              The Takes
            </h2>
            <p className="font-paragraph text-lg text-dark-gray max-w-2xl mb-16">
              Everything I consume, rated. Explore the good, the bad, and the
              ugly — and steal an obsession or two.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviewLinks.map((item, idx) => (
                <Reveal key={item.to} delay={idx * 0.08}>
                  <Link to={item.to} className="group block">
                    <div className="relative w-full aspect-[16/10] overflow-hidden border border-light-gray">
                      <img
                        src={item.cover}
                        alt={`${item.title} — reviews`}
                        loading="lazy"
                        className="w-full h-full object-cover saturate-[0.6] group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-3xl font-light text-foreground group-hover:text-accent group-hover:italic transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-paragraph text-sm text-dark-gray">
                          {item.note}
                        </p>
                      </div>
                      <div className="absolute top-5 right-5 w-9 h-9 border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-accent transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[{ label: 'Travel', to: '/travel' }].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group inline-flex items-center gap-2 font-paragraph text-xs uppercase tracking-widestplus text-secondary hover:text-accent transition-colors"
                >
                  {l.label}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- HOME BASE --- */}
        <SectionShell label="05 — Home base">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground">
                  Mississauga,
                  <br />
                  <em className="text-accent">Ontario</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-paragraph text-lg leading-relaxed text-dark-gray">
                  A city that thrives on its own diversity and culture. Home
                  base between Waterloo terms and wherever work points next.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="relative w-full aspect-[16/10] overflow-hidden border border-light-gray">
                  <img
                    src="https://media.istockphoto.com/id/1083429836/photo/absolute-towers-in-mississauga-ontario-canada-night-shot.jpg?s=612x612&w=0&k=20&c=0qCqzC05UhQps7C30VkWQaSdds4FJSPET2wW8uvK7bU="
                    alt="Absolute Towers, Mississauga at night"
                    loading="lazy"
                    className="w-full h-full object-cover saturate-[0.8]"
                  />
                  <div className="absolute inset-0 bg-background/20" />
                </div>
                <p className="mt-4 eyebrow">43.59° N, 79.64° W</p>
              </Reveal>
            </div>
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
}
