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
               <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex items-center gap-4 mb-8"
               >
                 <div className="h-px w-12 bg-accent"></div>
                 <span className="font-paragraph text-sm uppercase tracking-widest text-accent font-medium">
                   System Architecture & AI
                 </span>
               </motion.div>
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
                01 / Philosophy
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
        <section id="projects" className="w-full py-32 px-[5%] max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative">
            {/* Sticky Sidebar */}
            <div className="md:col-span-3 hidden md:block">
              <div className="sticky top-32">
                <h2 className="font-heading text-5xl font-bold text-foreground mb-4 tracking-tight">
                  Selected<br/>Work
                </h2>
                <p className="font-paragraph text-sm text-secondary uppercase tracking-widest mb-8">
                  Case Studies &<br/>Deployments
                </p>
                <div className="h-px w-12 bg-accent mb-8"></div>
                <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mobile Title */}
            <div className="md:hidden col-span-1 mb-12">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Selected Work</h2>
              <div className="h-px w-full bg-foreground/10"></div>
            </div>

            {/* Projects List */}
            <div className="md:col-span-9 flex flex-col gap-32">
              {isLoadingProjects ? (
                <div className="h-96 flex items-center justify-center bg-light-gray/20 animate-pulse">
                  <span className="text-secondary">Loading Projects...</span>
                </div>
              ) : projects.length > 0 ? (
                projects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} index={index} />
                ))
              ) : (
                <div className="py-20 text-center border border-dashed border-secondary/30">
                  <p className="text-secondary">No projects currently available.</p>
                </div>
              )}
              
              <div className="md:hidden mt-12">
                 <Link to="/projects">
                  <Button variant="outline" className="w-full">View All Projects</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- ABOUT & SKILLS SECTION --- */}
        <section id="about" className="w-full py-32 px-[5%] max-w-[120rem] mx-auto bg-foreground text-background">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <span className="sticky top-32 block font-paragraph text-xs font-bold uppercase tracking-widest text-secondary-foreground/60">
                02 / Profile
              </span>
            </div>
            
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
                <div className="space-y-6 font-paragraph text-lg text-secondary-foreground/90 leading-relaxed">
                  <p>
                    I'm a data scientist and AI engineer with a passion for building systems that make 
                    sense of complex data. My work sits at the intersection of machine learning, software 
                    engineering, and product development.
                  </p>
                  <p>
                    Over the past several years, I've developed production ML systems, designed data 
                    pipelines processing millions of records, and built AI-powered tools that help teams 
                    make better decisions.
                  </p>
                </div>
                <div className="space-y-6 font-paragraph text-lg text-secondary-foreground/90 leading-relaxed">
                  <p>
                    My approach is rooted in first principles thinking and iterative development. I focus 
                    on understanding the problem deeply before jumping to solutions.
                  </p>
                  <p>
                    When I'm not coding, I'm reading research papers, experimenting with new frameworks, 
                    or thinking about how AI can augment human capabilities rather than replace them.
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="border-t border-secondary-foreground/20 pt-20">
                <h3 className="font-heading text-3xl mb-12 text-primary-foreground">Technical Arsenal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category}>
                      <h4 className="font-paragraph text-xs uppercase tracking-widest text-accent mb-6">
                        {category}
                      </h4>
                      <ul className="space-y-3">
                        {categorySkills.map((skill) => (
                          <li key={skill._id} className="flex items-center justify-between border-b border-secondary-foreground/10 pb-2">
                            <span className="text-secondary-foreground font-medium">{skill.skillName}</span>
                            {skill.proficiencyLevel && (
                              <span className="text-xs text-secondary-foreground/50">{skill.proficiencyLevel}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section id="resume" className="w-full py-32 px-[5%] max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <div className="sticky top-32">
                <span className="block font-paragraph text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                  03 / Timeline
                </span>
                <h2 className="font-heading text-4xl font-bold text-foreground mb-8">Experience</h2>
                <Button 
                  variant="default" 
                  className="bg-foreground text-background hover:bg-accent hover:text-white transition-colors rounded-none"
                >
                  Download Resume
                </Button>
              </div>
            </div>

            <div className="md:col-span-8 md:col-start-5 relative border-l border-light-gray pl-8 md:pl-16 space-y-20">
              {isLoadingExperience ? (
                <div className="animate-pulse text-secondary">Loading timeline...</div>
              ) : experience.length > 0 ? (
                experience.map((exp, index) => (
                  <motion.div 
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-background border-2 border-secondary group-hover:border-accent group-hover:bg-accent transition-colors duration-300 rounded-full z-10" />
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                        {exp.companyName}
                      </h3>
                      <span className="font-paragraph text-sm font-medium text-accent uppercase tracking-wider">
                        {exp.startDate && new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                      </span>
                    </div>
                    
                    <h4 className="font-paragraph text-xl text-dark-gray mb-4">{exp.jobTitle}</h4>
                    
                    {exp.description && (
                      <p className="font-paragraph text-secondary leading-relaxed max-w-3xl">
                        {exp.description}
                      </p>
                    )}
                    
                    {exp.location && (
                      <p className="mt-4 text-xs text-secondary uppercase tracking-widest">
                        {exp.location}
                      </p>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-secondary">No experience data available.</p>
              )}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="w-full py-32 px-[5%] max-w-[120rem] mx-auto bg-light-gray/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <span className="sticky top-32 block font-paragraph text-xs font-bold uppercase tracking-widest text-secondary">
                04 / Contact
              </span>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-8 tracking-tight">
                Let's Build<br/>Something.
              </h2>
              <p className="font-paragraph text-xl text-secondary mb-16 max-w-2xl">
                I'm always interested in hearing about new projects, opportunities, or just connecting with fellow builders.
              </p>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-secondary mb-2 group-focus-within:text-accent transition-colors">Name</label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-0 border-b border-secondary/30 rounded-none px-0 py-4 text-xl bg-transparent focus-visible:ring-0 focus-visible:border-accent transition-colors placeholder:text-secondary/20 h-auto"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-secondary mb-2 group-focus-within:text-accent transition-colors">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-0 border-b border-secondary/30 rounded-none px-0 py-4 text-xl bg-transparent focus-visible:ring-0 focus-visible:border-accent transition-colors placeholder:text-secondary/20 h-auto"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-secondary mb-2 group-focus-within:text-accent transition-colors">Message</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="border-0 border-b border-secondary/30 rounded-none px-0 py-4 text-xl bg-transparent focus-visible:ring-0 focus-visible:border-accent transition-colors placeholder:text-secondary/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-foreground text-background hover:bg-accent hover:text-white transition-all duration-300 rounded-none px-12 h-16 text-lg"
                  >
                    Send Message
                  </Button>

                  <div className="flex gap-8">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-foreground transition-colors">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-foreground transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="mailto:alex@example.com" className="text-secondary hover:text-foreground transition-colors">
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
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