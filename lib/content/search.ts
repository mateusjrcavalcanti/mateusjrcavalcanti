import "server-only";

import { certifications, site } from "@/data";
import { getBlogPostMetadata } from "./posts";
import { getProjectMetadata } from "./projects";
import { blogPostPath, projectPath, routes } from "../routes";

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  group: "Páginas" | "Projetos" | "Artigos" | "Certificações";
  keywords: string[];
}

export function getSearchEntries(): SearchEntry[] {
  const pages: SearchEntry[] = [
    ["Início", site.description, routes.home, ["home", "portfólio"]],
    ["Projetos", "Projetos e estudos de caso.", routes.projects, ["portfolio"]],
    ["Trajetória", "Experiência profissional e formação.", "/#experiencia", ["experiência", "formação"]],
    ["Currículo", "Currículo profissional para impressão e PDF.", routes.resume, ["resume", "pdf"]],
    ["Certificados", "Certificações e credenciais.", routes.certifications, ["cursos"]],
    ["Blog", "Artigos e aprendizados técnicos.", routes.blog, ["posts", "conteúdo"]],
    ["Contato", "Canais de contato e redes profissionais.", "/#contato", ["email", "linkedin", "github"]],
  ].map(([title, description, href, keywords]) => ({
    title: title as string,
    description: description as string,
    href: href as string,
    keywords: keywords as string[],
    group: "Páginas" as const,
  }));

  return [
    ...pages,
    ...getProjectMetadata().map((project) => ({
      title: project.title,
      description: project.description,
      href: projectPath(project.slug),
      group: "Projetos" as const,
      keywords: [...project.tags, project.context, project.category],
    })),
    ...getBlogPostMetadata().map((post) => ({
      title: post.title,
      description: post.excerpt,
      href: blogPostPath(post.slug),
      group: "Artigos" as const,
      keywords: [...post.tags, post.category, post.author],
    })),
    ...certifications.map((certification) => ({
      title: certification.title,
      description: `${certification.issuer} · ${certification.issueDate}`,
      href: routes.certifications,
      group: "Certificações" as const,
      keywords: [...certification.skills, certification.issuer],
    })),
  ];
}
