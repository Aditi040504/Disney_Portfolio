/**
 * Central Portfolio Data Model
 * Extracted directly from Disney.pdf (Authoritative Resume Source)
 *
 * Rules:
 * - No invented achievements, metrics, certifications, dates, or jobs.
 * - Accurate representation of all skills, education, experience, and projects.
 */

export interface ContactInfo {
  name: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  location: string;
  linkedInUrl: string | null;
  gitHubUrl: string | null;
}

export interface EducationItem {
  degree: string;
  duration: string;
  university: string;
  institute: string;
  location: string;
  honors: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  chapterNumber: string;
  duration: string;
  technologies: string[];
  summary: string;
  achievements: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export const PORTFOLIO_DATA = {
  hero: {
    name: "ADITI SAPKAL",
    role: "Infrastructure Specialist – Cloud Application Operations",
    tagline: "Cloud • AI • Creative Technology",
  },
  contact: {
    name: "Aditi Sapkal",
    title: "Infrastructure Specialist – Cloud Application Operations",
    subtitle: "Computer Science Graduate & Creative Technologist",
    phone: "+91-885-687-7479",
    email: "aditisapkal417@gmail.com",
    location: "Satara, Maharashtra",
    linkedInUrl: "https://www.linkedin.com/in/aditisapkal",
    gitHubUrl: "https://github.com/Aditi040504",
  } as ContactInfo,
  careerObjective: {
    headline: "A Journey from Computer Science to Cinematic Technology",
    text: "Computer Science graduate and IBM Infrastructure Specialist with a strong interest in animation, visual storytelling, digital content creation, and emerging AI technologies. Experienced in UI/UX design and AI-assisted projects, with hands-on exploration of video editing, Blender, and interactive visual design. Eager to develop professional animation skills in a creative environment.",
    // Visual theme cards derived directly from Career Objective & Experience
    keyThemes: [
      {
        title: "Infrastructure & Operations",
        description: "Cloud Application Operations at IBM, focused on patching monitoring, compliance, and vulnerability remediation.",
      },
      {
        title: "AI & Emerging Technologies",
        description: "Hands-on exploration of Machine Learning, Generative AI, Prompt Engineering, and AI-assisted tools like Claude Code.",
      },
      {
        title: "Visual Design & Creative Tech",
        description: "Interest in UI/UX design, interactive visual design, video editing, and hands-on 3D exploration in Blender.",
      },
    ],
  },
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    duration: "Aug. 2021 – July 2025",
    university: "Dr. Babasaheb Ambedkar Technological University",
    institute: "Dnyanshree Institute of Engineering and Technology",
    location: "Satara, Maharashtra",
    honors: "First Class with Distinction",
  } as EducationItem,
  experience: {
    role: "Infrastructure Specialist – Cloud Application Operations",
    company: "IBM",
    duration: "April 2026 – Present",
    highlights: [
      "Joined IBM in April 2026 and successfully completed the Infrastructure Specialist – Cloud Application Operations training program.",
      "Achieved a score of 95% in the comprehensive training assessment.",
      "Worked with cross-functional teams to monitor patching activities, verify remediation status, and ensure compliance with remediation timelines.",
      "Worked on vulnerability management, remediation tracking, and application support activities.",
      "Collaborated with project teams to analyze, prioritize, and track application vulnerabilities across systems.",
    ],
  } as ExperienceItem,
  technicalSkills: [
    {
      category: "Programming Languages",
      iconName: "code",
      skills: ["Python", "SQL", "HTML", "CSS"],
    },
    {
      category: "Operating System",
      iconName: "terminal",
      skills: ["Linux (Basics)"],
    },
    {
      category: "AI / ML & Modern Tools",
      iconName: "sparkles",
      skills: ["Machine Learning", "Generative AI", "Prompt Engineering", "Claude Code"],
    },
    {
      category: "Developer Tools & DevOps",
      iconName: "tools",
      skills: ["Google Colab Platform", "VS Code", "GitHub", "Figma", "Git", "Jenkins", "Ansible", "Terraform"],
    },
    {
      category: "Design & Practices",
      iconName: "palette",
      skills: ["REST APIs", "UI/UX Design", "Blender (Beginner)", "Attention to Details", "Communication Skills", "Agile Workflow"],
    },
    {
      category: "Spoken Languages",
      iconName: "globe",
      skills: ["English (Fluent)", "Hindi (Fluent)", "Marathi (Fluent)", "Japanese (Beginner)"],
    },
  ] as SkillCategory[],
  projects: [
    {
      id: "code-coach",
      chapterNumber: "CHAPTER I",
      title: "Code Coach",
      duration: "February 2026",
      technologies: ["Flask", "JavaScript", "HTML", "CSS"],
      summary: "A full-stack AI-assisted developer learning and debugging platform.",
      achievements: [
        "Developed a full-stack web platform with scalable backend and responsive UI.",
        "Improved debugging speed by 35% by developing an AI-powered assistant that provides real-time code feedback and optimization suggestions.",
        "Supported multiple programming languages and enhanced learning efficiency by generating contextual explanations using external AI APIs.",
      ],
    },
    {
      id: "worktime-timer",
      chapterNumber: "CHAPTER II",
      title: "Worktime Timer App",
      duration: "June 2025 – July 2025",
      technologies: ["Electron.js", "JavaScript", "HTML", "CSS"],
      summary: "A cute, visually interactive personal productivity desktop application.",
      achievements: [
        "Designed and developed a personal productivity desktop application featuring a custom, cute visual interface, interactive UI elements, and small animations.",
        "Created the UI/UX in Figma with a focus on visual appeal, usability, and engaging user interactions.",
        "Implemented real-time timers, interactive elements, and small animations to make the experience more engaging.",
        "Created and published a video demonstration of the application on LinkedIn.",
      ],
    },
    {
      id: "system-care-chatbot",
      chapterNumber: "CHAPTER III",
      title: "Intelligent System Care Chatbot",
      duration: "September 2024 – May 2025",
      technologies: ["Python", "AI/ML", "HTML", "CSS"],
      summary: "An intelligent diagnostics and health-monitoring chatbot assistant.",
      achievements: [
        "Automated system health monitoring, reducing manual diagnostics time by 40% through CPU, RAM, and storage analysis.",
        "Improved anomaly detection accuracy by implementing threshold-based monitoring and alert mechanisms.",
        "Enhanced usability and personalization by developing persistent user settings and adaptive chatbot responses using NLP.",
      ],
    },
  ] as ProjectItem[],
  certifications: [
    {
      name: "Google Analytics Certification",
      issuer: "Google",
      year: "2024",
    },
    {
      name: "Summer Internship Program on AI",
      issuer: "IBM SkillsBuild",
      year: "2024",
    },
    {
      name: "Consultant Job Simulation",
      issuer: "Accenture",
      year: "2024",
    },
    {
      name: "AI/ML for Geodata Analysis",
      issuer: "ISRO",
      year: "2023",
    },
    {
      name: "TCS iON Career Edge: Young Professional",
      issuer: "TCS iON",
      year: "2023",
    },
    {
      name: "Web Development",
      issuer: "Internshala",
      year: "2022",
    },
  ] as CertificationItem[],
  credits: {
    supertitle: "A PERSONAL PORTFOLIO EXPERIENCE",
    authorLabel: "Created & Designed by",
    authorName: "ADITI SAPKAL",
    inspirationLabel: "Inspired by the visual poetry of",
    inspirationTitle: "TANGLED",
    creativeInspiration: "Walt Disney Animation Studios / Disney",
    disclaimer:
      "This is an independent personal portfolio project inspired by the visual style and themes of Tangled. It is not affiliated with, sponsored by, or endorsed by Disney.",
    closingGreeting: "THANK YOU FOR WATCHING",
  },
};
