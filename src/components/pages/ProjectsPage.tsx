import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    loadProjects();
  }, [skip]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Projects>('projects', {}, { limit: pageSize, skip });
      
      if (skip === 0) {
        setProjects(result.items);
      } else {
        setProjects(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setSkip(prev => prev + pageSize);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-[10%] pt-48 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="font-heading text-6xl md:text-7xl mb-6 text-foreground tracking-tight uppercase">
            All Projects
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-secondary max-w-3xl">
            A comprehensive collection of technical projects, case studies, and experiments. 
            Each project represents a unique challenge and learning opportunity.
          </p>
        </motion.div>

        <div className="space-y-6 min-h-[600px]">
          {isLoading && skip === 0 ? null : projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={`/projects/${project._id}`}
                  className="block group py-12 border-b border-light-gray hover:border-foreground transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="font-heading text-2xl md:text-3xl mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="font-paragraph text-base md:text-lg text-secondary mb-6 max-w-3xl">
                        {project.shortDescription}
                      </p>
                      {project.tags && (
                        <div className="flex flex-wrap gap-3">
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
                    </div>
                    <div className="flex items-center gap-2 text-foreground group-hover:text-accent transition-colors duration-300">
                      <span className="font-paragraph text-sm uppercase tracking-wider">View Project</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="font-paragraph text-lg text-secondary py-20">No projects available.</p>
          )}
        </div>

        {hasNext && (
          <div className="mt-20 text-center">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              disabled={isLoading}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              {isLoading ? 'Loading...' : 'Load More Projects'}
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
