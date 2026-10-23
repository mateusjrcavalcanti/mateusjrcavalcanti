import type { FooterLink, NavigationItem, SectionConfig } from "./types";
import { routes } from "@/lib/routes";

export { createBlogSection } from "./blog";
export type { BlogSectionData } from "./blog";
export { certifications, certificationsSection } from "./certifications";
export type { CertificationsSectionData } from "./certifications";
export { contact, contactSection } from "./contact";
export type { ContactSectionData } from "./contact";
export { experiences, experienceSection } from "./experiences";
export type { ExperienceSectionData } from "./experiences";
export { hero } from "./hero";
export type { HeroData } from "./hero";
export {
  createProjectsSection,
  projectCategoryColors,
  projectCategoryLabels,
} from "./projects";
export type { ProjectsSectionData } from "./projects";
export { skillCategories, skillsSection } from "./skills";
export type { SkillsSectionData } from "./skills";
export type {
  BlogPost,
  Certification,
  ContentSectionConfig,
  Experience,
  ExperiencePosition,
  FooterLink,
  HeroMetric,
  NavigationItem,
  Project,
  ProjectCategory,
  SectionConfig,
  SkillCategory,
  SkillIconKey,
} from "./types";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mateusjunior.dev"
).replace(/\/$/, "");

export function withBasePath(path: `/${string}`) {
  return `${basePath}${path}`;
}

export function resolveContentImage(path: string) {
  return path.startsWith("/") ? withBasePath(path as `/${string}`) : path;
}

export function getSiteAssetUrl(path: `/${string}`) {
  return `${siteUrl}${path}`;
}

export function getVisibleSections<T extends SectionConfig>(sections: T[]) {
  return sections.filter((section) => section.enabled !== false);
}

export const site = {
  name: "Mateus Junior",
  alternateName: "Mateus JR",
  brand: "mateusjr",
  url: siteUrl,
  basePath,
  title: "Mateus Junior — Full Stack Developer",
  titleTemplate: "%s | Mateus Junior",
  description:
    "Portfólio de Mateus Junior, desenvolvedor de software e graduando em Engenharia de Computação pela UNIVASF.",
  jobTitle: "Desenvolvedor de Software",
  university: "Universidade Federal do Vale do São Francisco (UNIVASF)",
  keywords: [
    "Mateus Junior",
    "Mateus JR",
    "Engenharia de Computação",
    "UNIVASF",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Laravel",
    "Docker",
    "PostgreSQL",
    "Sistemas Embarcados",
  ],
  twitterHandle: "@mateusjrcavalcanti",
  locale: "pt-BR",
  languageLabel: "PT",
  searchLabel: "Buscar...",
  sourceLabel: "GitHub",
  footerBuiltWithPrefix: "Feito com",
  footerBuiltWith: "Next.js & Tailwind",
  copyrightYear: 2026,
  copyrightLabel: "Todos os direitos reservados.",
  homeLabel: "Início",
  themeToggleLabel: "Alternar tema",
  menuToggleLabel: "Abrir menu",
  navigation: [
    { href: "/#projetos", label: "Projetos", sectionId: "projetos" },
    { href: "/#experiencia", label: "Trajetória", sectionId: "experiencia" },
    { href: "/#blog", label: "Blog", sectionId: "blog" },
    { href: "/#contato", label: "Contato", sectionId: "contato" },
  ] satisfies NavigationItem[],
  footerLinks: [
    { href: routes.projects, label: "Projetos" },
    { href: routes.certifications, label: "Certificados" },
    { href: routes.resume, label: "Currículo (ATS / PDF)", featured: true },
    { href: routes.blog, label: "Blog" },
  ] satisfies FooterLink[],
} as const;
