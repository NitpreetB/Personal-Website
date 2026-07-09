export type WorkExperience = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate?: string; // undefined = Present
  bullets: string[];
};

export const experiences: WorkExperience[] = [
  {
    id: 'super-data-analyst',
    jobTitle: 'Data Analyst',
    companyName: 'Super.com',
    location: 'San Francisco, CA',
    startDate: '2025-01-01',
    endDate: undefined,
    bullets: [
      'Built and deployed a Shifted Beta-Geometric (sBG) LTV model forecasting per-subscriber value, replacing a static $43 Google Ads heuristic and cutting estimation error to ~3% to focus bid spend on high-LTV users.',
      'Refactored a contextual multi-armed bandit pricing model and its dbt pipelines, cutting compute and maintenance spend by $20K annually while lifting net revenue per session by 6%.',
      'Built scalable dbt data models and pricing transformation pipelines that improved data fidelity and drove an 8% gain in brand-level pricing precision across top hotel partners.',
      'Designed Looker and Amplitude dashboards for pricing KPIs, enabling self-serve analytics for stakeholders and improving pricing response time by 5.5%.',
    ],
  },
  {
    id: 'arcturus-mlops',
    jobTitle: 'Machine Learning Engineer',
    companyName: 'Arcturus Networks Inc.',
    location: 'Toronto, ON',
    startDate: '2024-01-01',
    endDate: '2024-08-01',
    bullets: [
      'Redesigned and deployed a Docker-based MLOps pipeline with automated labeling, training, and validation, streamlining model fine-tuning and delivering a 15% performance gain for existing customers.',
      'Engineered an automated YOLOv5 testing pipeline to evaluate model distillation and layer freezing for incremental learning, reducing training and deployment time by 35%.',
      'Built Python tooling using perceptual hashing and k-NN to filter duplicate images, raising data quality and increasing model mAP from 0.88 to 0.97.',
    ],
  },
  {
    id: 'ats-machine-vision',
    jobTitle: 'Machine Vision Engineer',
    companyName: 'ATS Life Sciences',
    location: 'Cambridge, ON',
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    bullets: [
      'Optimized image-processing algorithms in Python, OpenCV, and scikit-learn, powering a YOLOv8 model that reached 98% detection and classification accuracy.',
      'Integrated an Orbbec 3D camera into a flexible feeder system via an optimized Python codebase, improving runtime efficiency by 45% and part-classification accuracy by 35%.',
      'Analyzed large-scale image datasets to optimize automated part-picking, achieving a 45% improvement in centroid detection accuracy.',
    ],
  },
  {
    id: 'blue-lion-ml-research',
    jobTitle: 'Machine Learning Research Engineer',
    companyName: 'Blue Lion Labs',
    location: 'Waterloo, ON',
    startDate: '2022-05-01',
    endDate: '2022-08-01',
    bullets: [
      'Trained Generative Adversarial Networks (GANs) to synthesize 400+ high-fidelity phytoplankton images, improving dataset diversity and supporting image classifiers that reached 95% accuracy.',
      'Co-authored a research report published with AAAI demonstrating the feasibility of synthetic phytoplankton image generation using GANs.',
    ],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Python', 'SQL', 'R'],
  },
  {
    category: 'ML & Data Science',
    skills: [
      'scikit-learn',
      'PyTorch',
      'Pandas',
      'NumPy',
      'OpenCV',
      'A/B Testing',
      'Statistical Modeling',
    ],
  },
  {
    category: 'Data & Infrastructure',
    skills: ['Snowflake', 'dbt', 'Docker', 'Git', 'Looker', 'Amplitude'],
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  program?: string;
  location: string;
  period: string;
};

export const education: EducationEntry[] = [
  {
    school: 'University of British Columbia',
    degree: 'Master of Data Science (MDS)',
    location: 'Vancouver, BC',
    period: 'Sep 2026 – Jul 2027',
  },
  {
    school: 'University of Waterloo',
    degree: 'Bachelor of Applied Sciences (BASc)',
    program: 'Honours in Mechanical Engineering',
    location: 'Waterloo, ON',
    period: 'Sep 2021 – Apr 2026',
  },
];
