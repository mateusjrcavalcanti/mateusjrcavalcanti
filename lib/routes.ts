export const routes = {
  home: "/",
  projects: "/projetos",
  resume: "/curriculo",
  certifications: "/certificados",
  blog: "/blog",
  blogCategories: "/blog/categorias",
  blogTags: "/blog/tags",
  feed: "/feed.xml",
  knowledge: "/knowledge.json",
  llms: "/llms.txt",
  siteImage: "/og/site.png",
} as const;

export function projectPath(slug: string) {
  return `${routes.projects}/${slug}` as const;
}

export function blogPostPath(slug: string) {
  return `${routes.blog}/${slug}` as const;
}

export function blogCategoryPath(slug: string) {
  return `${routes.blogCategories}/${slug}` as const;
}

export function blogTagPath(slug: string) {
  return `${routes.blogTags}/${slug}` as const;
}

export function projectImagePath(slug: string) {
  return `/og/projects/${slug}` as const;
}

export function blogPostImagePath(slug: string) {
  return `/og/blog/${slug}` as const;
}

export function absoluteUrl(siteUrl: string, path: string) {
  return `${siteUrl.replace(/\/$/, "")}${path}`;
}
