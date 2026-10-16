import type { ContentSectionConfig, Project, ProjectCategory } from "./types";

export const projectCategoryColors = {
  todos: "#f59e0b",
  web: "#3b82f6",
  mobile: "#8b5cf6",
  devops: "#10b981",
} as const;

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  web: "Web",
  mobile: "Mobile",
  devops: "DevOps",
};

export const projects: Project[] = [
  {
    id: "robotica-educativa-univasf",
    slug: "robotica-educativa-univasf",
    category: "web",
    title: "Robótica Educativa UNIVASF",
    description:
      "Plataforma web oficial da UNIVASF para democratização do ensino de robótica e programação em escolas públicas do Vale do São Francisco.",
    image: "/projetos/robotica-educativa-univasf.png",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "UI/UX",
      "Acessibilidade",
      "Core Web Vitals",
    ],
    context: "Acadêmico",
    status: "Concluído",
    featured: true,
    liveUrl: "https://robotica-educativa-univasf.vercel.app/",
    githubUrl: "https://github.com/mateusjrcavalcanti",
    year: "2026",
  },
];

export const projectsSection = {
  id: "projetos",
  name: "Projetos",
  color: "#06b6d4",
  eyebrow: "Portfólio",
  title: "Meus",
  highlight: "projetos",
  description:
    "Uma seleção dos projetos que construí ao longo da minha carreira, organizados por área de atuação.",
  allFilterLabel: "Todos",
  countLabel: "projetos em exibição",
  catalogLabel: "Ver catálogo completo de projetos →",
  caseStudyLabel: "Ver estudo de caso →",
  subColors: projectCategoryColors,
  categoryLabels: projectCategoryLabels,
  items: projects,
} satisfies ContentSectionConfig & {
  allFilterLabel: string;
  countLabel: string;
  catalogLabel: string;
  caseStudyLabel: string;
  subColors: typeof projectCategoryColors;
  categoryLabels: Record<ProjectCategory, string>;
  items: Project[];
};

export type ProjectsSectionData = typeof projectsSection;
