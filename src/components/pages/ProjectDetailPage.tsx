import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

type Project = {
  id: string;
  title: string;
  tags: string[];
  projectImage?: string;

  shortDescription?: string;
  problemStatement?: string;
  approachTaken?: string;
  resultsImpact?: string;

  toolsUsed?: string[];
  link?: string; // github/demo/writeup
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  // ✅ Manual dataset (same ids as ProjectsPage)
  const projects: Project[] = useMemo(
    () => [
      {
        id: "fraud-message-classifier",
        title: "Fraud Message Classifier",
        tags: ["Python", "scikit-learn", "NLP", "Streamlit", "TF-IDF"],
        link: "https://github.com/NitpreetB/spam-classifier",
        shortDescription:
          "Spam vs. not-spam message classifier using TF-IDF + Multinomial Naive Bayes, packaged into a Streamlit app for interactive predictions.",
        problemStatement:
          "Build a lightweight and reliable text classifier to detect fraudulent/spam messages and expose it through a simple UI for fast testing and iteration.",
        approachTaken:
          "Preprocessed text, created TF-IDF features, trained a Multinomial Naive Bayes model, and wrapped inference in a Streamlit app for real-time usage and retraining workflows.",
        resultsImpact:
          "A practical end-to-end ML mini-product: data → model → UI. Fast inference, easy to test, and simple to extend to new classes or larger datasets.",
        toolsUsed: ["Python", "NLTK", "scikit-learn", "TF-IDF", "Streamlit"],
      },
      {
        id: "lane-detection-system",
        title: "Lane Detection System",
        tags: ["Python", "OpenCV", "Computer Vision"],
        shortDescription:
          "Real-time lane detection pipeline using OpenCV with bird’s-eye transform, dynamic thresholding, and sliding-window lane tracking.",
        problemStatement:
          "Detect lane boundaries robustly under varying lighting and road conditions in real-time.",
        approachTaken:
          "Applied perspective warp to bird’s-eye view, performed color/gradient thresholding, used sliding windows + polynomial fits to track lane lines frame-to-frame.",
        resultsImpact:
          "Clean and interpretable lane boundaries suitable for downstream steering/trajectory logic in a driving stack.",
        toolsUsed: ["Python", "OpenCV", "Perspective Transform", "Image Processing"],
      },
      {
        id: "active-ball-balancing-stewart-platform",
        title: "Active Ball Balancing Stewart Platform",
        tags: ["OpenCV", "Controls", "PID", "Robotics"],
        shortDescription:
          "Stewart platform that tracks and balances a ball using OpenCV position detection and PID control for real-time servo actuation.",
        problemStatement:
          "Stabilize a ball on a moving platform by estimating position in real time and applying control outputs fast enough to correct motion.",
        approachTaken:
          "Used OpenCV to detect the ball centroid, converted pixel displacement to control error, and tuned a PID controller to command servo angles with stable response.",
        resultsImpact:
          "Demonstrated closed-loop control with vision feedback—bridging perception and actuation in a real robotic system.",
        toolsUsed: ["OpenCV", "PID Control", "Servos", "Embedded/Robotics"],
      },
      {
        id: "detectme",
        title: "DetectME",
        tags: ["YOLOv5", "MediaPipe", "OpenCV", "Flask"],
        shortDescription:
          "Sports analysis tool combining YOLOv5 + MediaPipe for object + pose detection and OpenCV ball tracking to estimate optimal release angles.",
        problemStatement:
          "Provide athlete feedback by detecting body pose + ball motion from video and extracting useful performance metrics.",
        approachTaken:
          "Used YOLOv5 for person/object detection, MediaPipe for pose landmarks, and OpenCV tracking to estimate ball trajectory/release timing.",
        resultsImpact:
          "A combined CV pipeline that turns raw video into structured feedback signals for training and analysis.",
        toolsUsed: ["YOLOv5", "MediaPipe", "OpenCV", "Python", "Flask"],
      },
      {
        id: "dinoio",
        title: "DINOio",
        tags: ["Reinforcement Learning", "DQN", "Python", "OCR"],
        link: "https://github.com/NitpreetB/Dino",
        shortDescription:
          "Deep Q-Network agent that plays Chrome Dino using keyboard automation and OCR to detect game state and restart training loops.",
        problemStatement:
          "Train an RL agent to learn timing-based jumping behavior from screen pixels without direct game APIs.",
        approachTaken:
          "Implemented a DQN training loop, used automation for actions, and used OCR to detect game-over/reset conditions between episodes.",
        resultsImpact:
          "A full RL-to-real-interface demo: observation → action → reward → training loop with minimal integration assumptions.",
        toolsUsed: ["Python", "DQN", "Automation", "OCR (Tesseract)"],
      },
      {
        id: "sorting-visualizer",
        title: "Sorting Visualizer",
        tags: ["Python", "Algorithms", "Visualization"],
        shortDescription:
          "Interactive Python visualizer for classic sorting algorithms using generators for step-by-step animation.",
        problemStatement:
          "Make sorting algorithms intuitive by visualizing each step of swaps/comparisons in real time.",
        approachTaken:
          "Implemented algorithms as generator functions yielding intermediate states and rendered transitions frame-by-frame.",
        resultsImpact:
          "Clear educational tool for building intuition around algorithm behavior and complexity.",
        toolsUsed: ["Python", "Algorithms", "Generators", "Visualization"],
      },
      {
        id: "pocketwatch",
        title: "PocketWatch",
        tags: ["React", "JavaScript", "HTML/CSS", "APIs"],
        shortDescription:
          "Expense tracking web app built with React, including spending limits and spreadsheet export for transaction logs.",
        problemStatement:
          "Help users log spending quickly, visualize totals, and export data for external analysis.",
        approachTaken:
          "Built a React UI with structured transaction models, budget thresholds, and export functionality.",
        resultsImpact:
          "Clean personal-finance utility that reinforces good tracking habits and makes data portable.",
        toolsUsed: ["React", "JavaScript", "HTML/CSS", "Syncfusion"],
      },
    ],
    []
  );

  const project = useMemo(
    () => projects.find((p) => p.id === id) ?? null,
    [projects, id]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-[10%] pt-48 pb-32 min-h-[800px]">
        {!project ? (
          <div className="text-center py-32">
            <h1 className="font-heading text-4xl text-foreground mb-6">
              Project Not Found
            </h1>
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
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight">
                  {project.title}
                </h1>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300"
                  >
                    View Link <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}
              </div>

              {project.tags?.length ? (
                <div className="flex flex-wrap gap-3 mb-16">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-paragraph text-sm text-secondary px-4 py-2 border border-light-gray"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {project.projectImage ? (
                <div className="mb-20 w-full">
                  <Image
                    src={project.projectImage}
                    alt={project.title}
                    className="w-full h-auto"
                    width={1600}
                  />
                </div>
              ) : null}

              <div className="grid md:grid-cols-3 gap-20">
                <div className="md:col-span-2 space-y-16">
                  {project.shortDescription ? (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Overview
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </section>
                  ) : null}

                  {project.problemStatement ? (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Problem
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-line">
                        {project.problemStatement}
                      </p>
                    </section>
                  ) : null}

                  {project.approachTaken ? (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Approach
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-line">
                        {project.approachTaken}
                      </p>
                    </section>
                  ) : null}

                  {project.resultsImpact ? (
                    <section>
                      <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground uppercase tracking-tight">
                        Results & Impact
                      </h2>
                      <p className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-line">
                        {project.resultsImpact}
                      </p>
                    </section>
                  ) : null}
                </div>

                <div className="md:col-span-1">
                  {project.toolsUsed?.length ? (
                    <section className="sticky top-32">
                      <h3 className="font-heading text-lg uppercase tracking-wider text-secondary mb-6">
                        Tools & Technologies
                      </h3>
                      <div className="space-y-3">
                        {project.toolsUsed.map((tool, i) => (
                          <div
                            key={i}
                            className="font-paragraph text-base text-foreground py-3 border-b border-light-gray"
                          >
                            {tool}
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null}
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
