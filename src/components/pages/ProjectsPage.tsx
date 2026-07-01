import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Selected work"
      title={
        <>
          All <em className="text-accent">projects</em>
        </>
      }
      intro="Computer vision, controls, reinforcement learning, and the occasional web app — built to learn something each time."
    >
      <div>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
          >
            <Link
              to={`/projects/${project.id}`}
              className="group grid grid-cols-12 gap-4 items-baseline py-10 border-b border-light-gray hover:border-accent/60 transition-colors duration-500"
            >
              <span className="col-span-2 md:col-span-1 font-heading italic text-lg text-secondary group-hover:text-accent transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="col-span-10 md:col-span-7">
                <h2 className="font-heading text-2xl md:text-4xl font-light text-foreground group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
                  {project.title}
                </h2>
                <p className="mt-3 font-paragraph text-base text-secondary leading-relaxed max-w-2xl">
                  {project.shortDescription}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-paragraph text-[0.65rem] uppercase tracking-widestplus text-secondary border border-light-gray px-3 py-1 group-hover:border-accent-dim transition-colors duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex col-span-4 justify-end">
                <span className="inline-flex items-center gap-2 font-paragraph text-xs uppercase tracking-widestplus text-secondary group-hover:text-accent transition-colors">
                  Case study
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
