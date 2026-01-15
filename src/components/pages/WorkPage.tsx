import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { format } from "date-fns";

type WorkExperience = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string; // ISO-ish
  endDate?: string; // undefined = Present
  bullets: string[];
};

export default function WorkPage() {
  const experiences: WorkExperience[] = [
    {
      id: "super-data-analyst",
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
      id: "arcturus-mlops",
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
      id: "ats-machine-vision",
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
      id: "blue-lion-ml-research",
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
  ];

  const formatDate = (date?: string) => {
    if (!date) return "Present";
    try {
      return format(new Date(date), "MMM yyyy");
    } catch {
      return "Present";
    }
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

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 18 }}
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
                      <span className="font-paragraph text-sm text-secondary">
                        • {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="font-paragraph text-base text-foreground/80 leading-relaxed"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
