import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Layers } from "lucide-react";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { PageShell } from "@/components/layout";
import {
  projectCategoryColors,
  projectCategoryLabels,
  site,
  withBasePath,
} from "@/data";
import { getProjectMetadata } from "@/lib/content/projects";
import { absoluteUrl, projectPath, routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Projetos de Engenharia e Software",
  description:
    "Catálogo de projetos profissionais, independentes e acadêmicos desenvolvidos por Mateus Junior.",
  alternates: { canonical: absoluteUrl(site.url, routes.projects) },
};

export default function ProjectsPage() {
  const projects = getProjectMetadata();

  return (
    <PageShell>
      <Link
        href="/#projetos"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Voltar para o início
      </Link>

      <header className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
          <Layers className="size-3.5" />
          Catálogo de Engenharia
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Todos os <span className="text-primary">projetos</span>
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Sistemas, plataformas e projetos de engenharia desenvolvidos ao longo
          da minha trajetória profissional e acadêmica.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const color = projectCategoryColors[project.category];

          return (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={projectPath(project.slug)}
                className="relative block aspect-video overflow-hidden bg-secondary"
              >
                <Image
                  src={withBasePath(project.image)}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex gap-1.5">
                  <span className="rounded-md border border-border/60 bg-background/90 px-2.5 py-0.5 text-[11px] font-bold">
                    {project.context}
                  </span>
                  <span className="rounded-md bg-emerald-500/80 px-2.5 py-0.5 text-[11px] font-bold text-white">
                    {project.status}
                  </span>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span
                    className="font-semibold uppercase tracking-wider"
                    style={{ color }}
                  >
                    {projectCategoryLabels[project.category]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" /> {project.year}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold">{project.title}</h2>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-border/40 pt-4">
                  <Link
                    href={projectPath(project.slug)}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Ver estudo de caso →
                  </Link>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="Código no GitHub">
                        <Github className="size-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Ver demonstração">
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
