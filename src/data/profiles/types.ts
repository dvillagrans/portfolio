import { ReactNode } from "react";

export interface ProfileWork {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
}

export interface ProfileProject {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  role: string;
  description: string;
  technologies: string[];
  links: Array<{
    type: string;
    href: string;
    icon: ReactNode;
  }>;
  image: {
    src: string;
  };
  video?: string;
}

export interface ProfileData {
  summary: string;
  summaryEs: string;
  highlightedSkills: string[];
  work: ProfileWork[];
  projects: ProfileProject[];
  relevantCertifications: string[];
}
