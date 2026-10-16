import type { BlogPost, ContentSectionConfig } from "./types";

export const blogSection = {
  id: "blog",
  name: "Blog",
  color: "#10b981",
  eyebrow: "Conteúdo",
  title: "Blog",
  highlight: "& artigos",
  description:
    "Compartilho aprendizados, tutoriais e experiências sobre desenvolvimento.",
  ctaLabel: "Ver todos",
  mobileCtaLabel: "Ver todos os artigos",
} satisfies ContentSectionConfig & { ctaLabel: string; mobileCtaLabel: string };

export type BlogSectionData = typeof blogSection;

// Populated later from Markdown files in content/blog.
export const blogPosts: BlogPost[] = [];
