import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { PageShell } from "@/components/layout";
import { MarkdownContent } from "@/components/markdown-content";
import { ContentTableOfContents } from "@/components/content-table-of-contents";
import { getSiteAssetUrl, site, withBasePath } from "@/data";
import {
  getAllProjects,
  getProjectBySlug,
} from "@/lib/content/projects";
import { absoluteUrl, projectImagePath, projectPath, routes } from "@/lib/routes";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map(({ metadata }) => ({ slug: metadata.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug)?.metadata;

  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.title} — Estudo de caso`,
    description: project.description,
    alternates: { canonical: absoluteUrl(site.url, projectPath(project.slug)) },
    openGraph: {
      type: "article",
      url: absoluteUrl(site.url, projectPath(project.slug)),
      title: project.title,
      description: project.description,
      images: [{
        url: getSiteAssetUrl(projectImagePath(project.slug)),
        width: 1200,
        height: 630,
        alt: project.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [getSiteAssetUrl(projectImagePath(project.slug))],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const document = getProjectBySlug(slug);
  if (!document) notFound();
  const { metadata: project, content } = document;

  const projectUrl = absoluteUrl(site.url, projectPath(project.slug));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}/#project`,
    name: project.title,
    description: project.description,
    image: getSiteAssetUrl(project.image),
    url: projectUrl,
    dateCreated: project.year,
    keywords: project.tags,
    author: { "@id": `${site.url}/#person` },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto max-w-6xl">
        <Link
          href={routes.projects}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Voltar para projetos
        </Link>

        <header className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {project.context}
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="size-3.5" /> {project.status}
            </span>
            <span className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <Calendar className="size-3.5" /> {project.year}
            </span>
          </div>
          <div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" /> Acessar demonstração
                </a>
              )}
              {project.githubUrl && (
                <a className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold" href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="size-4" /> Ver no GitHub
                </a>
              )}
            </div>
          )}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/70 bg-secondary shadow-xl">
            <Image src={withBasePath(project.image)} alt={project.title} fill priority className="object-cover" />
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <ContentTableOfContents />
          <MarkdownContent source={content} />
        </div>

        <section className="mt-10 border-t border-border/50 pt-8">
          <h2 className="mb-4 text-lg font-bold">Competências técnicas</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
