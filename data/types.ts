export interface SectionConfig {
  id: string;
  name: string;
  color: string;
  enabled?: boolean;
}

export interface ContentSectionConfig extends SectionConfig {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export interface HeroMetric {
  value: string;
  label: string;
  active?: boolean;
}

export type ProjectCategory = "web" | "mobile" | "devops";

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string;
  image: `/${string}`;
  tags: string[];
  context: string;
  status: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
}

export interface ExperiencePosition {
  title: string;
  subtitle?: string;
  periodLabel: string;
  duration?: string;
  location?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logo?: string;
  period: [string, string?];
  periodLabel?: string;
  description: string;
  technologies: string[];
  current?: boolean;
  positions?: ExperiencePosition[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerUrl?: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  skills: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  featured?: boolean;
}

export type SkillIconKey =
  "frontend" | "backend" | "database" | "devops" | "architecture" | "embedded";

export interface SkillCategory {
  title: string;
  description: string;
  iconKey: SkillIconKey;
  skills: string[];
}

export interface NavigationItem {
  href: string;
  label: string;
  sectionId: string;
}

export interface FooterLink {
  href: string;
  label: string;
  featured?: boolean;
}
