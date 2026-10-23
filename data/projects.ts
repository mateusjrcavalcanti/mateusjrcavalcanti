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

const projectsSectionConfig = {
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
} satisfies ContentSectionConfig & {
  allFilterLabel: string;
  countLabel: string;
  catalogLabel: string;
  caseStudyLabel: string;
  subColors: typeof projectCategoryColors;
  categoryLabels: Record<ProjectCategory, string>;
};

export function createProjectsSection(items: Project[]) {
  return {
    ...projectsSectionConfig,
    enabled: items.length > 0,
    items,
  };
}

export type ProjectsSectionData = ReturnType<typeof createProjectsSection>;
