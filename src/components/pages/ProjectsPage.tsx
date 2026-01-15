import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Project = {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
};

export default function ProjectsPage() {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "fraud-message-classifier",
        title: "Fraud Message Classifier",
        shortDescription:
          "Spam vs. not-spam classifier using TF-IDF + Multinomial Naive Bayes, with a Streamlit app for real-time detection and retraining.",
        tags: ["Python", "scikit-learn", "NLP", "TF-IDF", "Streamlit", "NLTK"],
      },
      {
        id: "lane-detection-system",
        title: "Lane Detection System",
        shortDescription:
          "Real-time lane detection pipeline using OpenCV with bird’s-eye perspective transform, dynamic HSV thresholding, and sliding-window tracking.",
        tags: ["Python", "OpenCV", "Computer Vision", "Perspective Transform"],
      },
      {
        id: "active-ball-balancing-stewart-platform",
        title: "Active Ball Balancing Stewart Platform",
        shortDescription:
          "3-leg Stewart platform that tracks and balances a ball using OpenCV-based position detection and a PID controller for real-time servo control.",
        tags: ["OpenCV", "Controls", "PID", "Robotics", "Raspberry Pi"],
      },
      {
        id: "detectme",
        title: "DetectME",
        shortDescription:
          "Sports analysis tool combining YOLOv5 + MediaPipe for object + pose detection, plus OpenCV ball tracking to estimate optimal release angles.",
        tags: ["YOLOv5", "MediaPipe", "OpenCV", "Flask", "Pose Estimation"],
      },
      {
        id: "dinoio",
        title: "DINOio",
        shortDescription:
          "Deep Q-Network framework to play Chrome Dino using automated keyboard control and OCR to detect ‘game over’ and restart training epochs.",
        tags: ["Reinforcement Learning", "DQN", "Python", "OCR", "PyTesseract"],
      },
      {
        id: "sorting-visualizer",
        title: "Sorting Visualizer",
        shortDescription:
          "Interactive Python visualizer for classic sorting algorithms using OOP + generators for step-by-step animation.",
        tags: ["Python", "Algorithms", "Visualization", "OOP"],
      },
      {
        id: "pocketwatch",
        title: "PocketWatch",
        shortDescription:
          "Expense tracking web app built with React, including spending limits and spreadsheet-style transaction exports.",
        tags: ["React", "JavaScript", "HTML/CSS", "API Integration"],
      },
    ],
    []
  );

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
            A curated collection of projects across machine learning, computer vision,
            robotics, and full-stack development.
          </p>
        </motion.div>

        <div className="space-y-6 min-h-[600px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="group py-12 border-b border-light-gray hover:border-foreground transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl md:text-3xl mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h2>

                    <p className="font-paragraph text-base md:text-lg text-secondary mb-6 max-w-3xl">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="font-paragraph text-sm text-secondary px-4 py-2 border border-light-gray"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DETAILS LINK */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors duration-300"
                  >
                    <span className="font-paragraph text-sm uppercase tracking-wider">
                      Details
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
