import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : null;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 w-full max-w-site mx-auto px-[5%] pt-40 md:pt-48 pb-24">
        {!project ? (
          <div className="text-center py-32">
            <h1 className="font-heading text-4xl font-light text-foreground mb-6">
              Project not found
            </h1>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-paragraph text-sm uppercase tracking-widestplus text-accent hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              All projects
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-paragraph text-xs uppercase tracking-widestplus text-secondary hover:text-accent transition-colors duration-300 mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              All projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow mb-6">
                Case study — {String(index + 1).padStart(2, '0')}
              </p>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
                <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground tracking-tight max-w-4xl">
                  {project.title}
                </h1>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-paragraph text-xs uppercase tracking-widestplus text-foreground border-b border-accent pb-2 hover:text-accent transition-colors duration-300 shrink-0"
                  >
                    View source
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-20">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-paragraph text-[0.65rem] uppercase tracking-widestplus text-secondary border border-light-gray px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
                <div className="md:col-span-2 space-y-16">
                  {(
                    [
                      ['Overview', project.shortDescription],
                      ['Problem', project.problemStatement],
                      ['Approach', project.approachTaken],
                      ['Results & Impact', project.resultsImpact],
                    ] as const
                  ).map(
                    ([heading, body]) =>
                      body && (
                        <section key={heading}>
                          <h2 className="eyebrow mb-6">{heading}</h2>
                          <p className="font-heading text-xl md:text-2xl font-light text-foreground leading-relaxed whitespace-pre-line">
                            {body}
                          </p>
                        </section>
                      )
                  )}
                </div>

                <aside className="md:col-span-1">
                  {project.toolsUsed?.length ? (
                    <div className="sticky top-32">
                      <h3 className="eyebrow mb-6">Tools & Technologies</h3>
                      <div>
                        {project.toolsUsed.map((tool) => (
                          <div
                            key={tool}
                            className="font-paragraph text-base text-dark-gray py-3 border-b border-light-gray"
                          >
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </aside>
              </div>

              {next && next.id !== project.id && (
                <div className="mt-28 pt-10 border-t border-light-gray">
                  <Link to={`/projects/${next.id}`} className="group block">
                    <p className="eyebrow mb-4">Next project</p>
                    <span className="inline-flex items-center gap-4 font-heading text-3xl md:text-5xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                      {next.title}
                      <ArrowRight className="w-7 h-7 text-accent group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
