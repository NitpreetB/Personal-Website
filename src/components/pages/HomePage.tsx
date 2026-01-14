// HPI 1.7-G
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BaseCrudService } from "@/integrations";
import { Projects, Experience, Skills } from "@/entities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

// --- Utility Components for "The Zen Grid" ---

const SectionDivider = () => <div className="w-full h-px bg-light-gray my-0" />;

const GridOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-[5%] max-w-[120rem] mx-auto opacity-[0.03]">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="w-px h-full bg-foreground" />
    ))}
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="sticky top-32 block font-paragraph text-xs font-bold uppercase tracking-widest text-secondary">
    {children}
  </span>
);

const SectionShell = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`w-full py-32 px-[5%] max-w-[120rem] mx-auto ${className}`}>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-3">
        <SectionLabel>{label}</SectionLabel>
      </div>
      <div className="md:col-span-8 md:col-start-5">{children}</div>
    </div>
  </section>
);

// --- Main Component ---

export default function HomePage() {
  // 1. Data Fidelity Protocol: Canonize & Preserve
  const [projects, setProjects] = useState<Projects[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingExperience, setIsLoadingExperience] = useState(true);

  // Scroll Progress for global bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoadingProjects(true);
      setIsLoadingExperience(true);

      const [projectsResult, experienceResult, skillsResult] = await Promise.all([
        BaseCrudService.getAll<Projects>("projects", {}, { limit: 6 }),
        BaseCrudService.getAll<Experience>("experience", {}, { limit: 10 }),
        BaseCrudService.getAll<Skills>("skills", {}, { limit: 20 }),
      ]);

      setProjects(projectsResult.items);
      setExperience(
        experienceResult.items.sort((a, b) => {
          const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
          const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
          return dateB - dateA;
        })
      );
      setSkills(skillsResult.items);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoadingProjects(false);
      setIsLoadingExperience(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

  // --- Animation Refs ---
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // --- Reviews data (edit these) ---
  const albumReviews = [
    {
      title: "Album One",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
      rating: "9.2/10",
      blurb: "Precision production, no filler, insane replay value.",
    },
    {
      title: "Album Two",
      cover:
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
      rating: "8.4/10",
      blurb: "Big hooks with a moody edge — the sequencing is perfect.",
    },
    {
      title: "Album Three",
      cover:
        "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1200&q=80",
      rating: "7.9/10",
      blurb: "A bold concept album that sticks the landing.",
    },
  ];

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
              >
                {"Nitpreet Bamra"}
              </motion.h1>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="font-paragraph text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground font-light"
              > Engineer · Analyst · Student
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-12 flex gap-6"
              >

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
            <span className="font-paragraph text-xs uppercase tracking-widest text-secondary">
              Scroll to Explore
            </span>
          </motion.div>
        </section>

        <SectionDivider />

        {/* --- ABOUT ME (teaser + button to About page) --- */}
        <SectionShell label="01 / About" className="bg-background">
          <div className="space-y-10">
            <p className="font-paragraph text-xl md:text-2xl leading-relaxed text-dark-gray">
              I’m Nitpreet — I build data products and intelligent systems end-to-end,
              from messy real-world data to shipped experiences. I care about
              simplicity, correctness, and results you can actually measure.
            </p>

            <div>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 px-8 h-14 text-lg"
                >
                  More About Me <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </SectionShell>

        <SectionDivider />

        {/* --- MISSISSAUGA SECTION (text + photo) --- */}
        <SectionShell label="03 / Home Base" className="bg-light-gray/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                Mississauga, Ontario
              </h2>
              <p className="font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray">
                A city that thrives on its diversity
              </p>
              <p className="font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray">
       
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-light-gray border border-light-gray">
                <Image
                  src="https://media.istockphoto.com/id/1083429836/photo/absolute-towers-in-mississauga-ontario-canada-night-shot.jpg?s=612x612&w=0&k=20&c=0qCqzC05UhQps7C30VkWQaSdds4FJSPET2wW8uvK7bU="
                  alt="A city scene representing Mississauga"
                  width={1600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/5" />
              </div>
              <p className="mt-4 font-paragraph text-xs uppercase tracking-widest text-secondary">
                The City
              </p>
            </div>
          </div>
        </SectionShell>

        <SectionDivider />

        {/* --- REVIEWS SECTION (3 album covers + rating + one-liner) --- */}
        <SectionShell label="04 / Reviews" className="bg-background">
          <div className="space-y-10">
            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray">
              A small corner where I rate albums I’m looping. Short notes, no essays.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {albumReviews.map((a, idx) => (
                <div key={idx} className="group">
                  <div className="relative w-full aspect-square overflow-hidden bg-light-gray border border-light-gray">
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500 z-10" />
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={a.cover}
                        alt={`${a.title} cover`}
                        width={1200}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-heading text-xl font-bold">{a.title}</h3>
                      <span className="font-paragraph text-sm uppercase tracking-widest text-secondary">
                        {a.rating}
                      </span>
                    </div>
                    <p className="mt-2 font-paragraph text-base text-dark-gray">
                      {a.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional: link to a dedicated reviews page later */}
            {/* <div>
              <Link to="/reviews">
                <Button variant="outline" size="lg" className="rounded-none ...">
                  See All Reviews <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div> */}
          </div>
        </SectionShell>

        <SectionDivider />

        {/* --- BLOG SECTION (link to blog page) --- */}
        <SectionShell label="05 / Writing" className="bg-light-gray/30">
          <div className="space-y-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Blog
            </h2>
            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray">
              I write about building systems, learning in public, and the small lessons
              that compound. Mostly practical notes — occasionally a deep dive.
            </p>

            <div>
              <Link to="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 px-8 h-14 text-lg"
                >
                  Read the Blog <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </SectionShell>

        <SectionDivider />

        {/* --- PROJECTS SECTION PLACEHOLDER (keep your existing implementation here) --- */}
        {/* Example anchor so your hero button works */}
  

        <SectionDivider />
      </main>
      <Footer />
    </div>
  );
}

// --- Sub-Components ---

function ProjectCard({ project }: { project: Projects; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

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
              src={
                project.projectImage ||
                "https://static.wixstatic.com/media/830b33_64cbde5666404da089ccdb982d07cc85~mv2.png?originWidth=1600&originHeight=896"
              }
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
                {project.tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium uppercase tracking-wider border border-light-gray px-3 py-1 text-secondary"
                  >
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
