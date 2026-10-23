import type { MetadataRoute } from "next";
import { site } from "@/data";
import { getBlogCategories, getBlogPostMetadata, getBlogTags } from "@/lib/content/posts";
import { getProjectMetadata } from "@/lib/content/projects";
import { absoluteUrl, blogCategoryPath, blogPostPath, blogTagPath, projectPath, routes } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjectMetadata();
  const posts = getBlogPostMetadata();
  const categories = getBlogCategories();
  const tags = getBlogTags();

  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(site.url, routes.projects),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(site.url, projectPath(project.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl(site.url, routes.resume),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(site.url, routes.certifications),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(site.url, routes.blog),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(site.url, routes.blogCategories),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...categories.map((category) => ({
      url: absoluteUrl(site.url, blogCategoryPath(category.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    {
      url: absoluteUrl(site.url, routes.blogTags),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...tags.map((tag) => ({
      url: absoluteUrl(site.url, blogTagPath(tag.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(site.url, blogPostPath(post.slug)),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
