import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BaseCrudService } from "@/integrations";
import { Experience } from "@/entities";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function WorkPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    loadExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadExperiences = async () => {
    try {
      setIsLoading(true);
      setLoadError(false);
      const result = await BaseCrudService.getAll<Experience>("experience");
      setExperiences(result.items || []);
    } catch (error) {
      console.error("Error loading experiences:", error);
      setLoadError(true);
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Present";
    try {
      return format(new Date(date), "MMM yyyy");
    } catch {
      return "Present";
    }
  };

  // Turn description into bullets if it's a long string (optional, but keeps resume look)
  const toBullets = (description?: string): string[] => {
    const raw = description?.trim();
    if (!raw) return [];

    const parts = raw
      .split(/\r?\n|•|\u2022|-\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    return parts.length ? parts : [raw];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-10 text-foreground">
              Work Experience
            </h1>

            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              ) : experiences.length > 0 ? (
                <div className="space-y-12">
                  {loadError ? (
                    <p className="font-paragraph text-sm text-secondary mb-4">
                      (Couldn’t load experiences from the CMS.)
                    </p>
                  ) : null}

                  {experiences.map((exp, index) => {
                    const bullets = toBullets(exp.description);

                    return (
                      <motion.div
                        key={(exp as any)._id ?? `${exp.companyName}-${exp.jobTitle}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="border-l-2 border-accent pl-8 pb-2"
                      >
                        <div className="mb-3">
                          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                              {exp.jobTitle}
                            </h2>

                            <div className="font-paragraph text-sm text-secondary">
                              {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <p className="font-paragraph text-xl text-accent">
                              {exp.companyName}
                            </p>

                            {(exp as any).location ? (
                              <span className="font-paragraph text-sm text-secondary">
                                • {(exp as any).location}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {bullets.length > 0 ? (
                          <ul className="mt-4 space-y-2 list-disc pl-5">
                            {bullets.map((b, i) => (
                              <li
                                key={i}
                                className="font-paragraph text-base text-foreground/80 leading-relaxed"
                              >
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </motion.div>
                    );
                  })}
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
