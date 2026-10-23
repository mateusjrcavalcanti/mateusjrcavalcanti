import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, Mail, MapPin } from "lucide-react";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { PageShell } from "@/components/layout";
import { ResumeActions } from "@/components/resume-actions";
import { certifications, contact, experiences, site, skillCategories } from "@/data";
import { getProjectMetadata } from "@/lib/content/projects";
import { formatExperiencePeriod } from "@/lib/utils";
import { absoluteUrl, projectPath, routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Currículo profissional",
  description:
    "Currículo técnico de Mateus Junior, desenvolvedor de software e graduando em Engenharia de Computação pela UNIVASF.",
  alternates: { canonical: absoluteUrl(site.url, routes.resume) },
};

export default function ResumePage() {
  const projects = getProjectMetadata();

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link href="/#experiencia" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> Voltar para o início
          </Link>
          <ResumeActions />
        </div>

        <article className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm sm:p-12 print:border-0 print:bg-white print:p-0 print:text-neutral-900 print:shadow-none">
          <header className="mb-8 border-b border-border/70 pb-6 print:border-neutral-300">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl print:text-2xl print:text-black">{site.name}</h1>
                <p className="mt-1 font-medium text-primary print:text-neutral-800">Engenheiro de Computação em formação · Desenvolvedor Full Stack</p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground print:text-neutral-600">
                <MapPin className="size-3.5" /> Petrolina, PE · Juazeiro, BA
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground print:text-neutral-700">
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5"><Mail className="size-3.5" /> {contact.email}</a>
              <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5"><Github className="size-3.5" /> GitHub</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5"><ExternalLink className="size-3.5" /> LinkedIn</a>
              <a href={site.url} className="inline-flex items-center gap-1.5"><Globe className="size-3.5" /> {new URL(site.url).host}</a>
            </div>
          </header>

          <ResumeSection title="Resumo profissional">
            <p className="text-sm leading-relaxed text-muted-foreground print:text-neutral-800">
              Desenvolvedor Full Stack e graduando em Engenharia de Computação, com experiência no ciclo de desenvolvimento de software, da arquitetura à infraestrutura, automação e publicação em produção.
            </p>
          </ResumeSection>

          <ResumeSection title="Experiência e formação">
            <div className="space-y-6">
              {experiences.map((experience) => (
                <div key={experience.id} className="break-inside-avoid">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="font-bold print:text-black">{experience.role}</h3>
                      <p className="text-sm text-primary print:text-neutral-700">{experience.company}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground print:text-neutral-600">{formatExperiencePeriod(experience.period, experience.current, experience.periodLabel)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground print:text-neutral-800">{experience.description}</p>
                  {experience.positions && (
                    <ul className="mt-3 space-y-2 border-l border-border pl-4 print:border-neutral-300">
                      {experience.positions.map((position) => (
                        <li key={`${position.title}-${position.periodLabel}`}>
                          <div className="flex flex-wrap justify-between gap-2 text-sm"><strong>{position.title}</strong><span className="text-xs text-muted-foreground">{position.periodLabel}</span></div>
                          {position.subtitle && <p className="mt-1 text-xs text-muted-foreground print:text-neutral-700">{position.subtitle}</p>}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">{experience.technologies.map((technology) => <span key={technology} className="rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground print:border print:border-neutral-300 print:bg-transparent">{technology}</span>)}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Competências técnicas">
            <div className="grid gap-4 sm:grid-cols-2">
              {skillCategories.map((category) => (
                <div key={category.title} className="break-inside-avoid">
                  <h3 className="text-sm font-bold">{category.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground print:text-neutral-700">{category.skills.join(" · ")}</p>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Projetos selecionados">
            <div className="space-y-4">
              {projects.filter((project) => project.featured).map((project) => (
                <div key={project.id} className="break-inside-avoid">
                  <div className="flex items-center gap-2"><h3 className="text-sm font-bold">{project.title}</h3><Link href={projectPath(project.slug)} aria-label={`Ver ${project.title}`} className="print:hidden"><ExternalLink className="size-3" /></Link></div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground print:text-neutral-700">{project.description}</p>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Certificações">
            <ul className="space-y-2 text-sm">
              {certifications.map((certification) => <li key={certification.id}><strong>{certification.title}</strong><span className="text-muted-foreground"> · {certification.issuer} · {certification.issueDate}</span></li>)}
            </ul>
          </ResumeSection>
        </article>
      </div>
    </PageShell>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8 break-inside-avoid last:mb-0 print:mb-5">
      <h2 className="mb-3 border-b border-border/50 pb-1 text-xs font-bold uppercase tracking-wider text-primary print:border-neutral-300 print:text-black">{title}</h2>
      {children}
    </section>
  );
}
