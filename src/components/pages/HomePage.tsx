// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ArrowDown, ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Projects, Experience, Skills } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';

// --- Utility Components for "The Zen Grid" ---

const SectionDivider = () => (
  <div className="w-full h-px bg-light-gray my-0" />
);

const GridOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-[5%] max-w-[120rem] mx-auto opacity-[0.03]">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="w-px h-full bg-foreground" />
    ))}
  </div>
);

// --- Main Component ---

export default function HomePage() {
  // 1. Data Fidelity Protocol: Canonize & Preserve
  const [projects, setProjects] = useState<Projects[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingExperience, setIsLoadingExperience] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Scroll Progress for global bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoadingProjects(true);
      setIsLoadingExperience(true);

      const [projectsResult, experienceResult, skillsResult] = await Promise.all([
        BaseCrudService.getAll<Projects>('projects', {}, { limit: 6 }),
        BaseCrudService.getAll<Experience>('experience', {}, { limit: 10 }),
        BaseCrudService.getAll<Skills>('skills', {}, { limit: 20 })
      ]);

      setProjects(projectsResult.items);
      setExperience(experienceResult.items.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA;
      }));
      setSkills(skillsResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingProjects(false);
      setIsLoadingExperience(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

  // --- Animation Refs ---
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      <Header />
      <main className="w-full relative">
        {/* Optional Grid Overlay for "Zen Grid" feel */}
        {/* <GridOverlay /> */}
        {/* --- HERO SECTION --- */}
        <section 
          ref={heroRef}
          className="relative w-full min-h-screen flex flex-col justify-center px-[5%] pt-32 pb-20 max-w-[120rem] mx-auto"
        >
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-12 mb-8 md:mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter font-bold text-foreground uppercase"
              >{"Nitpreet Bamra"}</motion.h1>
            </div>

            <div className="md:col-span-5 md:col-start-1 flex flex-col justify-end">

            </div>

            <div className="md:col-span-6 md:col-start-7">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="font-paragraph text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground font-light"
              >
                Building intelligent systems that solve complex problems. Specializing in machine learning, data engineering, and scalable AI solutions.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-12 flex gap-6"
              >
                 <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 px-8 h-14 text-lg"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Selected Work
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-[5%] flex items-center gap-4"
          >
            <ArrowDown className="w-5 h-5 animate-bounce text-secondary" />
            <span className="font-paragraph text-xs uppercase tracking-widest text-secondary">Scroll to Explore</span>
          </motion.div>
        </section>
        <SectionDivider />
        {/* --- PHILOSOPHY / INTRO --- */}
        <section className="w-full py-32 px-[5%] max-w-[120rem] mx-auto bg-light-gray/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <span className="sticky top-32 block font-paragraph text-xs font-bold uppercase tracking-widest text-secondary">
                01 / Story
              </span>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="font-paragraph text-xl md:text-2xl leading-relaxed text-dark-gray">
                In a world of noise, clarity is the ultimate sophistication. My approach to engineering is rooted in first principles—stripping away the non-essential to reveal the core logic of a problem. Whether architecting a data pipeline or training a neural network, I strive for solutions that are robust, scalable, and elegantly simple.
              </p>
            </div>
          </div>
        </section>

                <section className="w-full py-32 px-[5%] max-w-[120rem] mx-auto bg-light-gray/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <span className="sticky top-32 block font-paragraph text-xs font-bold uppercase tracking-widest text-secondary">
                01 / Story
              </span>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="font-paragraph text-xl md:text-2xl leading-relaxed text-dark-gray">
                In a world of noise, clarity is the ultimate sophistication. My approach to engineering is rooted in first principles—stripping away the non-essential to reveal the core logic of a problem. Whether architecting a data pipeline or training a neural network, I strive for solutions that are robust, scalable, and elegantly simple.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />
        {/* --- PROJECTS SECTION (Sticky Sidebar Layout) --- */}
        <SectionDivider />
        {/* --- ABOUT & SKILLS SECTION --- */}

        {/* --- EXPERIENCE SECTION --- */}
        <SectionDivider />
        {/* --- CONTACT SECTION --- */}
      </main>
      <Footer />
    </div>
  );
}

// --- Sub-Components ---

function ProjectCard({ project, index }: { project: Projects; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group block"
    >
      <Link to={`/projects/${project._id}`} className="block">
        {/* Image Container with Parallax/Scale Effect on Hover */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-light-gray mb-8">
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500 z-10" />
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
             <Image
              src={project.projectImage || "https://static.wixstatic.com/media/830b33_64cbde5666404da089ccdb982d07cc85~mv2.png?originWidth=1600&originHeight=896"}
              alt={project.title || "Project Preview"}
              width={1600}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Floating Action Button */}
          <div className="absolute bottom-0 right-0 bg-background p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 border-t border-l border-light-gray">
            <ArrowRight className="w-8 h-8 text-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="font-paragraph text-lg text-secondary leading-relaxed mb-6">
              {project.shortDescription}
            </p>
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.split(',').map((tag, i) => (
                  <span key={i} className="text-xs font-medium uppercase tracking-wider border border-light-gray px-3 py-1 text-secondary">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}