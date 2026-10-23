import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/data";
import {
  assertUnique,
  optionalDateString,
  optionalString,
  requireDateString,
  requireString,
  stringArray,
} from "./shared";

const postsDirectory = join(process.cwd(), "content", "blog");

export interface BlogPostDocument {
  metadata: BlogPost;
  content: string;
}

function getPostFiles() {
  if (!existsSync(postsDirectory)) return [];

  return readdirSync(postsDirectory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isFile() && extname(entry.name) === ".md") {
      return [join(postsDirectory, entry.name)];
    }
    const readme = join(postsDirectory, entry.name, "README.md");
    return entry.isDirectory() && existsSync(readme) ? [readme] : [];
  });
}

function readPost(filePath: string): BlogPostDocument {
  const source = readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const fallbackSlug =
    basename(filePath) === "README.md"
      ? basename(dirname(filePath))
      : basename(filePath, ".md");
  const slug = optionalString(data, "slug") ?? fallbackSlug;
  const image = requireString(data, "image", filePath);

  if (!image.startsWith("/") && !URL.canParse(image)) {
    throw new Error(`${filePath}: o campo "image" deve ser um caminho ou URL válido.`);
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = optionalString(data, "readTime") ?? `${Math.max(1, Math.ceil(wordCount / 200))} min`;
  const publishedAt = requireDateString(data, "publishedAt", filePath);
  const updatedAt = optionalDateString(data, "updatedAt");

  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`${filePath}: o campo "publishedAt" contém uma data inválida.`);
  }
  if (updatedAt && Number.isNaN(Date.parse(updatedAt))) {
    throw new Error(`${filePath}: o campo "updatedAt" contém uma data inválida.`);
  }
  if (updatedAt && Date.parse(updatedAt) < Date.parse(publishedAt)) {
    throw new Error(`${filePath}: "updatedAt" não pode ser anterior a "publishedAt".`);
  }

  return {
    metadata: {
      slug,
      title: requireString(data, "title", filePath),
      excerpt: requireString(data, "excerpt", filePath),
      image,
      category: requireString(data, "category", filePath),
      tags: stringArray(data, "tags", filePath),
      author: optionalString(data, "author") ?? "Mateus Junior",
      publishedAt,
      updatedAt,
      readTime,
      featured: data.featured === true,
    },
    content: content.trim(),
  };
}

export function getAllBlogPosts() {
  const posts = getPostFiles().map(readPost);
  assertUnique(
    posts.map((post) => ({ value: post.metadata.slug, source: post.metadata.title })),
    "slug de artigo",
  );
  return posts.sort(
      (a, b) =>
        Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt),
    );
}

export function getBlogPostMetadata() {
  return getAllBlogPosts().map(({ metadata }) => metadata);
}

export function getBlogPostBySlug(slug: string) {
  return getAllBlogPosts().find((post) => post.metadata.slug === slug);
}

export function slugifyTaxonomy(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getBlogCategories() {
  const categories = [...new Set(getBlogPostMetadata().map((post) => post.category))]
    .map((name) => ({ name, slug: slugifyTaxonomy(name) }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  assertUnique(
    categories.map(({ name, slug }) => ({ value: slug, source: name })),
    "slug de categoria",
  );
  return categories;
}

export function getBlogTags() {
  const tags = [...new Set(getBlogPostMetadata().flatMap((post) => post.tags))]
    .map((name) => ({ name, slug: slugifyTaxonomy(name) }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  assertUnique(
    tags.map(({ name, slug }) => ({ value: slug, source: name })),
    "slug de tag",
  );
  return tags;
}

export function getPostsByCategory(slug: string) {
  return getBlogPostMetadata().filter(
    (post) => slugifyTaxonomy(post.category) === slug,
  );
}

export function getPostsByTag(slug: string) {
  return getBlogPostMetadata().filter((post) =>
    post.tags.some((tag) => slugifyTaxonomy(tag) === slug),
  );
}

export function getAdjacentBlogPosts(slug: string) {
  const posts = getBlogPostMetadata();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
