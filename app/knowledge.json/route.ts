import { certifications, contact, site, skillCategories } from "@/data";
import { getBlogPostMetadata } from "@/lib/content/posts";
import { getProjectMetadata } from "@/lib/content/projects";
import { absoluteUrl, blogPostPath, projectPath } from "@/lib/routes";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    author: {
      name: site.name,
      alternateName: site.alternateName,
      description: site.description,
      jobTitle: site.jobTitle,
      url: site.url,
      github: contact.github,
      linkedin: contact.linkedin,
      skills: skillCategories.flatMap((category) => category.skills),
    },
    projects: getProjectMetadata().map((project) => ({
      ...project,
      url: absoluteUrl(site.url, projectPath(project.slug)),
    })),
    articles: getBlogPostMetadata().map((post) => ({
      ...post,
      url: absoluteUrl(site.url, blogPostPath(post.slug)),
    })),
    certifications,
    build: {
      revision: process.env.GITHUB_SHA ?? null,
      runId: process.env.GITHUB_RUN_ID ?? null,
    },
  });
}
