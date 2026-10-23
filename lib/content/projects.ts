import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import matter from "gray-matter";
import type { Project, ProjectCategory } from "@/data";
import {
  assertUnique,
  optionalString,
  requireBoolean,
  requireString,
  stringArray,
} from "./shared";

const projectsDirectory = join(process.cwd(), "content", "projects");
const projectCategories = new Set<ProjectCategory>(["web", "mobile", "devops"]);

export interface ProjectDocument {
  metadata: Project;
  content: string;
}

function readProject(filePath: string): ProjectDocument {
  const source = readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const category = requireString(data, "category", filePath) as ProjectCategory;

  if (!projectCategories.has(category)) {
    throw new Error(`${filePath}: categoria de projeto inválida: "${category}".`);
  }

  const slug = requireString(data, "slug", filePath);
  if (slug !== basename(filePath, ".md")) {
    throw new Error(`${filePath}: o slug deve ser igual ao nome do arquivo.`);
  }

  const image = requireString(data, "image", filePath);
  if (!image.startsWith("/")) {
    throw new Error(`${filePath}: o campo "image" deve começar com "/".`);
  }

  return {
    metadata: {
      id: optionalString(data, "id") ?? slug,
      slug,
      category,
      title: requireString(data, "title", filePath),
      description: requireString(data, "description", filePath),
      image: image as `/${string}`,
      tags: stringArray(data, "tags", filePath),
      context: requireString(data, "context", filePath),
      status: requireString(data, "status", filePath),
      featured: requireBoolean(data, "featured", filePath),
      liveUrl: optionalString(data, "liveUrl"),
      githubUrl: optionalString(data, "githubUrl"),
      year: requireString(data, "year", filePath),
    },
    content: content.trim(),
  };
}

export function getAllProjects() {
  if (!existsSync(projectsDirectory)) return [];

  const projects = readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name) === ".md")
    .map((entry) => readProject(join(projectsDirectory, entry.name)));
  assertUnique(
    projects.map((project) => ({ value: project.metadata.slug, source: project.metadata.title })),
    "slug de projeto",
  );
  assertUnique(
    projects.map((project) => ({ value: project.metadata.id, source: project.metadata.title })),
    "id de projeto",
  );
  return projects.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title, "pt-BR"));
}

export function getProjectMetadata() {
  return getAllProjects().map(({ metadata }) => metadata);
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.metadata.slug === slug);
}
