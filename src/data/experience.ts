export type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  description?: string;
};

export const experiences: ExperienceItem[] = [
  {
    role: "Frontend Dev",
    company: "Yakshar",
    duration: "Oct 2025 - Dec 2025",
    description: "Collaborated with design and backend teams.",
  },
  {
    role: "Frontend Dev",
    company: "Capsai",
    duration: "Jan 2026 - Feb 2026",
    description: "Developed and maintained responsive web applications.",
  },
  {
    role: "Full Stack Engineer",
    company: "Full Stack Engineer",
    duration: "Mar 2026 - Present",
    description: "Building full stack applications.",
  },
];
