import type { BlogPost, ContentSectionConfig } from "./types";

const blogSectionConfig = {
  id: "blog",
  name: "Blog",
  color: "#10b981",
  eyebrow: "Conteúdo",
  title: "Blog",
  highlight: "&",
  suffix: "artigos",
  description:
    "Compartilho aprendizados, tutoriais e experiências sobre desenvolvimento.",
  ctaLabel: "Ver todos",
  mobileCtaLabel: "Ver todos os artigos",
} satisfies ContentSectionConfig & {
  suffix: string;
  ctaLabel: string;
  mobileCtaLabel: string;
};

export function createBlogSection(items: BlogPost[]) {
  return {
    ...blogSectionConfig,
    enabled: items.length > 0,
  };
}

export type BlogSectionData = ReturnType<typeof createBlogSection>;
