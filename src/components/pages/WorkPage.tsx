import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Experience } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function WorkPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const result = await BaseCrudService.getAll<Experience>('experience');
      setExperiences(result.items);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Present';
    try {
      return format(new Date(date), 'MMM yyyy');
    } catch {
      return 'Present';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-12 text-foreground">Work Experience</h1>
            
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              ) : experiences.length > 0 ? (
                <div className="space-y-12">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-l-2 border-accent pl-8 pb-8"
                    >
                      <div className="mb-4">
                        <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                          {exp.jobTitle}
                        </h2>
                        <p className="font-paragraph text-xl text-accent mb-2">
                          {exp.companyName}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-secondary">
                          <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                          {exp.location && <span>• {exp.location}</span>}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-paragraph text-lg text-secondary">
                    No work experience available yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
