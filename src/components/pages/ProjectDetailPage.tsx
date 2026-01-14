import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Projects>('projects', id);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-[10%] pt-48 pb-32 min-h-[800px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !project ? (
          <div className="text-center py-32">
            <h1 className="font-heading text-4xl text-foreground mb-6">Project Not Found</h1>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-paragraph text-base text-accent hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-paragraph text-sm uppercase tracking-wider text-secondary hover:text-accent transition-colors duration-300 mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-8 text-foreground tracking-tight">
                {project.title}
              </h1>

              {project.tags && (
                <div className="flex flex-wrap gap-3 mb-16">
                  {project.tags.split(',').map((tag, i) => (
                    <span
                      key={i}
                      className="font-paragraph text-sm text-secondary px-4 py-2 border border-light-gray"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {project.projectImage && (
                <div className="mb-20 w-full">
                  <Image
                    src={project.projectImage}
                    alt={project.title || 'Project image'}
                    className="w-full h-auto"
                    width={1600}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-20">
                <div className="md:col-span-2 space-y-16">
                  {project.shortDescription && (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Overview
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </section>
                  )}

                  {project.problemStatement && (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Problem
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-line">
                        {project.problemStatement}
                      </p>
                    </section>
                  )}

                  {project.approachTaken && (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Approach
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-line">
                        {project.approachTaken}
                      </p>
                    </section>
                  )}

                  {project.resultsImpact && (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Results & Impact
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-line">
                        {project.resultsImpact}
                      </p>
                    </section>
                  )}
                </div>

                <div className="md:col-span-1">
                  {project.toolsUsed && (
                    <section className="sticky top-32">
                      <h3 className="font-heading text-lg uppercase tracking-wider text-secondary mb-6">
                        Tools & Technologies
                      </h3>
                      <div className="space-y-3">
                        {project.toolsUsed.split(',').map((tool, i) => (
                          <div
                            key={i}
                            className="font-paragraph text-base text-foreground py-3 border-b border-light-gray"
                          >
                            {tool.trim()}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
