import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, Calendar, ExternalLink, GraduationCap } from "lucide-react";
import { PageShell } from "@/components/layout";
import { certifications, certificationsSection, site } from "@/data";

export const metadata: Metadata = {
  title: "Cursos e certificações",
  description:
    "Cursos, especializações e certificações técnicas de Mateus Junior.",
  alternates: { canonical: `${site.url}/certificados` },
};

function getFaviconUrl(sourceUrl?: string) {
  if (!sourceUrl) return null;
  try {
    const url = new URL("https://www.google.com/s2/favicons");
    url.searchParams.set("domain", new URL(sourceUrl).hostname);
    url.searchParams.set("sz", "128");
    return url.toString();
  } catch {
    return null;
  }
}

export default function CertificationsPage() {
  const accent = certificationsSection.color;

  return (
    <PageShell>
      <Link href="/#certificacoes" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Voltar para o início
      </Link>
      <header className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold" style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}15` }}>
          <Award className="size-3.5" /> Credenciais e capacitação contínua
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Cursos <span style={{ color: accent }}>&amp;</span> certificações
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Especializações, cursos técnicos e certificações obtidas ao longo da minha trajetória em software e infraestrutura.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification) => {
          const favicon = getFaviconUrl(certification.issuerUrl);
          return (
            <article key={certification.id} className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary/80 p-1.5">
                      {favicon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={favicon} alt="" className="size-full rounded-sm object-contain" />
                      ) : (
                        <GraduationCap className="size-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">{certification.issuer}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground/80"><Calendar className="size-3" /> {certification.issueDate}</span>
                    </div>
                  </div>
                  {certification.credentialUrl && (
                    <a href={certification.credentialUrl} target="_blank" rel="noreferrer" aria-label={`Ver credencial: ${certification.title}`} className="rounded-lg bg-secondary/60 p-1.5 text-muted-foreground hover:text-primary">
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
                <h2 className="text-base font-bold leading-snug">{certification.title}</h2>
                {certification.credentialId && <p className="mt-2 break-all font-mono text-[10px] text-muted-foreground">ID: {certification.credentialId}</p>}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                {certification.skills.map((skill) => <span key={skill} className="rounded-md border border-border/30 bg-secondary/70 px-2 py-0.5 text-[11px] text-muted-foreground">{skill}</span>)}
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
