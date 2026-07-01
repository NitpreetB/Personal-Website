export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  featured?: boolean;
  link?: string;
  problemStatement?: string;
  approachTaken?: string;
  resultsImpact?: string;
  toolsUsed?: string[];
};

export const projects: Project[] = [
  {
    id: 'fraud-message-classifier',
    title: 'Fraud Message Classifier',
    featured: true,
    tags: ['Python', 'scikit-learn', 'NLP', 'TF-IDF', 'Streamlit', 'NLTK'],
    link: 'https://github.com/NitpreetB/spam-classifier',
    shortDescription:
      'Spam vs. not-spam classifier using TF-IDF + Multinomial Naive Bayes, with a Streamlit app for real-time detection and retraining.',
    problemStatement:
      'Build a lightweight and reliable text classifier to detect fraudulent/spam messages and expose it through a simple UI for fast testing and iteration.',
    approachTaken:
      'Preprocessed text, created TF-IDF features, trained a Multinomial Naive Bayes model, and wrapped inference in a Streamlit app for real-time usage and retraining workflows.',
    resultsImpact:
      'A practical end-to-end ML mini-product: data → model → UI. Fast inference, easy to test, and simple to extend to new classes or larger datasets.',
    toolsUsed: ['Python', 'NLTK', 'scikit-learn', 'TF-IDF', 'Streamlit'],
  },
  {
    id: 'lane-detection-system',
    title: 'Lane Detection System',
    featured: true,
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Perspective Transform'],
    shortDescription:
      'Real-time lane detection pipeline using OpenCV with bird’s-eye perspective transform, dynamic HSV thresholding, and sliding-window tracking.',
    problemStatement:
      'Detect lane boundaries robustly under varying lighting and road conditions in real-time.',
    approachTaken:
      'Applied perspective warp to bird’s-eye view, performed color/gradient thresholding, used sliding windows + polynomial fits to track lane lines frame-to-frame.',
    resultsImpact:
      'Clean and interpretable lane boundaries suitable for downstream steering/trajectory logic in a driving stack.',
    toolsUsed: ['Python', 'OpenCV', 'Perspective Transform', 'Image Processing'],
  },
  {
    id: 'active-ball-balancing-stewart-platform',
    title: 'Active Ball Balancing Stewart Platform',
    featured: true,
    tags: ['OpenCV', 'Controls', 'PID', 'Robotics', 'Raspberry Pi'],
    shortDescription:
      '3-leg Stewart platform that tracks and balances a ball using OpenCV-based position detection and a PID controller for real-time servo control.',
    problemStatement:
      'Stabilize a ball on a moving platform by estimating position in real time and applying control outputs fast enough to correct motion.',
    approachTaken:
      'Used OpenCV to detect the ball centroid, converted pixel displacement to control error, and tuned a PID controller to command servo angles with stable response.',
    resultsImpact:
      'Demonstrated closed-loop control with vision feedback—bridging perception and actuation in a real robotic system.',
    toolsUsed: ['OpenCV', 'PID Control', 'Servos', 'Embedded/Robotics'],
  },
  {
    id: 'detectme',
    title: 'DetectME',
    featured: true,
    tags: ['YOLOv5', 'MediaPipe', 'OpenCV', 'Flask', 'Pose Estimation'],
    shortDescription:
      'Sports analysis tool combining YOLOv5 + MediaPipe for object + pose detection, plus OpenCV ball tracking to estimate optimal release angles.',
    problemStatement:
      'Provide athlete feedback by detecting body pose + ball motion from video and extracting useful performance metrics.',
    approachTaken:
      'Used YOLOv5 for person/object detection, MediaPipe for pose landmarks, and OpenCV tracking to estimate ball trajectory/release timing.',
    resultsImpact:
      'A combined CV pipeline that turns raw video into structured feedback signals for training and analysis.',
    toolsUsed: ['YOLOv5', 'MediaPipe', 'OpenCV', 'Python', 'Flask'],
  },
  {
    id: 'dinoio',
    title: 'DINOio',
    tags: ['Reinforcement Learning', 'DQN', 'Python', 'OCR', 'PyTesseract'],
    link: 'https://github.com/NitpreetB/Dino',
    shortDescription:
      'Deep Q-Network framework to play Chrome Dino using automated keyboard control and OCR to detect ‘game over’ and restart training epochs.',
    problemStatement:
      'Train an RL agent to learn timing-based jumping behavior from screen pixels without direct game APIs.',
    approachTaken:
      'Implemented a DQN training loop, used automation for actions, and used OCR to detect game-over/reset conditions between episodes.',
    resultsImpact:
      'A full RL-to-real-interface demo: observation → action → reward → training loop with minimal integration assumptions.',
    toolsUsed: ['Python', 'DQN', 'Automation', 'OCR (Tesseract)'],
  },
  {
    id: 'sorting-visualizer',
    title: 'Sorting Visualizer',
    tags: ['Python', 'Algorithms', 'Visualization', 'OOP'],
    shortDescription:
      'Interactive Python visualizer for classic sorting algorithms using OOP + generators for step-by-step animation.',
    problemStatement:
      'Make sorting algorithms intuitive by visualizing each step of swaps/comparisons in real time.',
    approachTaken:
      'Implemented algorithms as generator functions yielding intermediate states and rendered transitions frame-by-frame.',
    resultsImpact:
      'Clear educational tool for building intuition around algorithm behavior and complexity.',
    toolsUsed: ['Python', 'Algorithms', 'Generators', 'Visualization'],
  },
  {
    id: 'pocketwatch',
    title: 'PocketWatch',
    tags: ['React', 'JavaScript', 'HTML/CSS', 'API Integration'],
    shortDescription:
      'Expense tracking web app built with React, including spending limits and spreadsheet-style transaction exports.',
    problemStatement:
      'Help users log spending quickly, visualize totals, and export data for external analysis.',
    approachTaken:
      'Built a React UI with structured transaction models, budget thresholds, and export functionality.',
    resultsImpact:
      'Clean personal-finance utility that reinforces good tracking habits and makes data portable.',
    toolsUsed: ['React', 'JavaScript', 'HTML/CSS', 'Syncfusion'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
