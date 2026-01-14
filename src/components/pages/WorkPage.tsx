import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BaseCrudService } from "@/integrations";
import { Experience } from "@/entities";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";
import { format } from "date-fns";

type ExperienceLike = {
  _id: string;
  jobTitle: string;
  companyName: string;
  location?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  // support both CMS string + local bullets
  description?: string;
  bullets?: string[];
};

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

  // ✅ Your relevant resume experience (fallback + also used if CMS is empty)
  const resumeFallback: ExperienceLike[] = useMemo(
    () => [
      {
        _id: "super-data-analyst",
        jobTitle: "Data Analyst",
        companyName: "Super.com",
        location: "San Francisco, CA",
        startDate: "2025-01-01",
        endDate: undefined,
        bullets: [
          "Refactored a contextual multi-armed bandit pricing model and its dbt pipelines, reducing compute/maintenance spend by $20K/year and increasing net revenue per session by 6%.",
          "Productionized scalable dbt data models and pricing transformation pipelines, increasing data fidelity and enabling an 8% lift in brand-level pricing precision for top hotel partners.",
          "Developed Looker and Amplitude dashboards for pricing KPIs, enabling self-serve insights and improving pricing response time by 5.5%.",
        ],
      },
      {
        _id: "arcturus-mlops",
        jobTitle: "Machine Learning Operations Engineer",
        companyName: "Arcturus Networks Inc.",
        location: "Toronto, ON",
        startDate: "2024-01-01",
        endDate: "2024-08-01",
        bullets: [
          "Redesigned and deployed a Docker-based MLOps pipeline with automated labeling, training, and validation, improving model fine-tuning and delivering a 15% performance gain for existing customers.",
          "Engineered an automated YOLOv5 testing pipeline to evaluate model distillation and layer freezing for incremental learning, reducing training and deployment time by 35%.",
          "Developed Python scripts using perceptual hashing and k-NN algorithms to filter duplicate images, boosting data quality and increasing model mAP from 0.88 to 0.97.",
        ],
      },
      {
        _id: "ats-machine-vision",
        jobTitle: "Machine Vision Engineer",
        companyName: "ATS Life Sciences",
        location: "Cambridge, ON",
        startDate: "2023-09-01",
        endDate: "2023-12-01",
        bullets: [
          "Optimized image-processing algorithms using Python, OpenCV, and scikit-learn, enabling a YOLO model that achieved 98% detection and classification accuracy.",
          "Pioneered a Python codebase to integrate an Orbbec 3D camera into a flexible feeder system, improving runtime efficiency by 45% and boosting part-classification accuracy by 35%.",
          "Analyzed large-scale image datasets from diverse acquisition setups to optimize automated part-picking, achieving a 15% improvement in centroid detection accuracy.",
        ],
      },
      {
        _id: "blue-lion-ml-research",
        jobTitle: "Machine Learning Research Engineer",
        companyName: "Blue Lion Labs",
        location: "Waterloo, ON",
        startDate: "2022-05-01",
        endDate: "2022-08-01",
        bullets: [
          "Trained Generative Adversarial Networks (GANs) to synthesize 400+ high-fidelity phytoplankton images, improving dataset diversity and supporting image classification models with 95% accuracy.",
          "Published a research report with AAAI demonstrating the feasibility of synthetic phytoplankton algae image generation using GANs.",
        ],
      },
    ],
    []
  );

  // If CMS has items, use them; otherwise use your resume fallback
  const displayExperiences: ExperienceLike[] = useMemo(() => {
    if (experiences && experiences.length > 0) {
      // map CMS type to our display type
      return experiences.map((exp) => ({
        _id: (exp as any)._id ?? `${exp.companyName}-${exp.jobTitle}`,
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        location: (exp as any).location,
        startDate: exp.startDate as any,
        endDate: exp.endDate as any,
        description: exp.description,
      }));
    }
    return resumeFallback;
  }, [experiences, resumeFallback]);

  const toBullets = (exp: ExperienceLike): string[] => {
    if (exp.bullets?.length) return exp.bullets;

    // If description comes from CMS as a string, try to split into bullets nicely
    const raw = exp.description?.trim();
    if (!raw) return [];

    // Split by newline or bullet-like separators
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
              ) : displayExperiences.length > 0 ? (
                <div className="space-y-12">
                  {loadError ? (
                    <p className="font-paragraph text-sm text-secondary mb-4">
                      (Couldn’t load experiences from the CMS — showing resume highlights instead.)
                    </p>
                  ) : null}

                  {displayExperiences.map((exp, index) => {
                    const bullets = toBullets(exp);

                    return (
                      <motion.div
                        key={exp._id}
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
                            {exp.location ? (
                              <span className="font-paragraph text-sm text-secondary">
                                • {exp.location}
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
