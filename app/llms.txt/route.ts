import { site } from "@/data";
import { getBlogPostMetadata } from "@/lib/content/posts";
import { getProjectMetadata } from "@/lib/content/projects";
import { absoluteUrl, blogPostPath, projectPath, routes } from "@/lib/routes";

export const dynamic = "force-static";

export function GET() {
  const projects = getProjectMetadata().map((project) =>
    `- [${project.title}](${absoluteUrl(site.url, projectPath(project.slug))}): ${project.description}`,
  );
  const posts = getBlogPostMetadata().map((post) =>
    `- [${post.title}](${absoluteUrl(site.url, blogPostPath(post.slug))}): ${post.excerpt}`,
  );
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Páginas",
    `- [Projetos](${absoluteUrl(site.url, routes.projects)})`,
    `- [Currículo](${absoluteUrl(site.url, routes.resume)})`,
    `- [Certificados](${absoluteUrl(site.url, routes.certifications)})`,
    `- [Blog](${absoluteUrl(site.url, routes.blog)})`,
    "",
    "## Projetos",
    ...(projects.length ? projects : ["Nenhum projeto publicado."]),
    "",
    "## Artigos",
    ...(posts.length ? posts : ["Nenhum artigo publicado."]),
    "",
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
