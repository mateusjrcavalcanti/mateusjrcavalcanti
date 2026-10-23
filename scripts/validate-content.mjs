import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const errors = [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function markdownFiles(directory) {
  const path = join(root, directory);
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isFile() && extname(entry.name) === ".md") return [join(path, entry.name)];
    const readme = join(path, entry.name, "README.md");
    return entry.isDirectory() && existsSync(readme) ? [readme] : [];
  });
}

function read(file) {
  const source = readFileSync(file, "utf8");
  const document = matter(source);
  return { file, ...document };
}

function required(document, fields) {
  for (const field of fields) {
    const value = document.data[field];
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`${document.file}: "${field}" deve ser uma string preenchida.`);
    }
  }
}

function stringList(document, field) {
  const value = document.data[field];
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || item.trim() === "")) {
    errors.push(`${document.file}: "${field}" deve ser uma lista preenchida de strings.`);
  }
}

function isoDate(document, field, optional = false) {
  const value = document.data[field];
  if (optional && value === undefined) return;
  if (!(typeof value === "string" || value instanceof Date) || Number.isNaN(Date.parse(String(value)))) {
    errors.push(`${document.file}: "${field}" deve conter uma data válida.`);
  }
}

function unique(items, label) {
  const seen = new Map();
  for (const { value, file } of items) {
    if (!value) continue;
    const previous = seen.get(value);
    if (previous) errors.push(`${file}: ${label} duplicado "${value}"; já usado em ${previous}.`);
    else seen.set(value, file);
  }
}

function taxonomySlug(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function validImage(document) {
  const image = document.data.image;
  if (typeof image !== "string") return;
  if (URL.canParse(image)) return;
  if (!image.startsWith("/")) {
    errors.push(`${document.file}: "image" deve ser uma URL ou caminho absoluto.`);
    return;
  }
  const generatedLogo = /^\/(?:favicon\.ico|logo\.(?:ico|png|svg)|(?:short|wide)\/logo\.(?:ico|png|svg))$/.test(image);
  if (!generatedLogo && !existsSync(join(root, "public", image.slice(1)))) {
    errors.push(`${document.file}: imagem interna não encontrada em public: "${image}".`);
  }
}

const projects = markdownFiles("content/projects").map(read);
const posts = markdownFiles("content/blog").map(read);
const postSlug = ({ file, data }) => data.slug ?? (basename(file) === "README.md" ? basename(dirname(file)) : basename(file, ".md"));

for (const project of projects) {
  required(project, ["slug", "title", "description", "image", "category", "context", "status", "year"]);
  stringList(project, "tags");
  const expectedSlug = basename(project.file, ".md");
  if (project.data.slug !== expectedSlug) errors.push(`${project.file}: o slug deve ser "${expectedSlug}".`);
  if (typeof project.data.featured !== "boolean") errors.push(`${project.file}: "featured" deve ser booleano.`);
  validImage(project);
}

for (const post of posts) {
  required(post, ["title", "excerpt", "image", "category"]);
  stringList(post, "tags");
  const slug = postSlug(post);
  if (typeof slug !== "string" || !slugPattern.test(slug)) errors.push(`${post.file}: slug inválido "${slug}".`);
  isoDate(post, "publishedAt");
  isoDate(post, "updatedAt", true);
  if (post.data.updatedAt && Date.parse(String(post.data.updatedAt)) < Date.parse(String(post.data.publishedAt))) {
    errors.push(`${post.file}: "updatedAt" não pode ser anterior a "publishedAt".`);
  }
  validImage(post);
}

unique(projects.map(({ file, data }) => ({ file, value: data.slug })), "slug de projeto");
unique(projects.map(({ file, data }) => ({ file, value: data.id ?? data.slug })), "id de projeto");
unique(posts.map((post) => ({ file: post.file, value: postSlug(post) })), "slug de artigo");

const taxonomies = posts.flatMap(({ file, data }) => [
  ...(typeof data.category === "string" ? [{ file, name: data.category, kind: "categoria" }] : []),
  ...(Array.isArray(data.tags) ? data.tags.filter((tag) => typeof tag === "string").map((name) => ({ file, name, kind: "tag" })) : []),
]);
for (const kind of ["categoria", "tag"]) {
  const distinct = [...new Map(taxonomies.filter((item) => item.kind === kind).map((item) => [item.name, item])).values()];
  unique(distinct.map((item) => ({ file: item.file, value: taxonomySlug(item.name) })), `slug de ${kind}`);
}

const internalRoutes = new Set([
  "/", "/projetos", "/curriculo", "/certificados", "/blog",
  "/blog/categorias", "/blog/tags", "/feed.xml", "/knowledge.json", "/llms.txt",
  ...projects.map(({ data }) => `/projetos/${data.slug}`),
  ...posts.map((post) => `/blog/${postSlug(post)}`),
  ...taxonomies.filter((item) => item.kind === "categoria").map((item) => `/blog/categorias/${taxonomySlug(item.name)}`),
  ...taxonomies.filter((item) => item.kind === "tag").map((item) => `/blog/tags/${taxonomySlug(item.name)}`),
]);
for (const document of [...projects, ...posts]) {
  for (const match of document.content.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (!target.startsWith("/") || target.startsWith("//")) continue;
    const path = target.split("#", 1)[0].replace(/\/$/, "") || "/";
    if (!internalRoutes.has(path)) {
      errors.push(`${document.file}: link interno não corresponde a uma rota conhecida: "${target}".`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Conteúdo válido: ${projects.length} projeto(s) e ${posts.length} artigo(s).`);
