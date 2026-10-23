"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Award,
  ExternalLink,
  GraduationCap,
  Calendar,
  ArrowRight,
} from "lucide-react";
import type { CertificationsSectionData } from "@/data";

function getFaviconUrl(sourceUrl?: string) {
  if (!sourceUrl) return null;

  try {
    const hostname = new URL(sourceUrl).hostname;
    const faviconUrl = new URL("https://www.google.com/s2/favicons");
    faviconUrl.searchParams.set("domain", hostname);
    faviconUrl.searchParams.set("sz", "128");
    return faviconUrl.toString();
  } catch {
    return null;
  }
}

export function CertificationsSection({
  data,
}: {
  data: CertificationsSectionData;
}) {
  if (!data.enabled) return null;

  return <CertificationsSectionContent data={data} />;
}

function CertificationsSectionContent({
  data,
}: {
  data: CertificationsSectionData;
}) {
  const ACCENT = data.color || "#ec4899";
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visibleItems = data.items.slice(0, 5);

  return (
    <section
      id={data.id}
      ref={sectionRef}
      className="snap-section relative min-h-screen flex items-center overflow-hidden bg-background py-20"
    >
      {/* Decorative Orbs */}
      <div
        className="absolute top-20 right-[10%] w-[350px] h-[350px] rounded-[52%_48%_62%_38%] blur-[120px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}12` }}
      />
      <div
        className="absolute bottom-20 left-[8%] w-[300px] h-[300px] rounded-[42%_58%_45%_55%] blur-[110px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}08` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${ACCENT}05 1px,transparent 1px),linear-gradient(90deg,${ACCENT}05 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-4 border"
            style={{
              backgroundColor: `${ACCENT}15`,
              borderColor: `${ACCENT}40`,
              color: ACCENT,
            }}
          >
            <Award className="h-3.5 w-3.5" />
            {data.eyebrow}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {data.title} <span style={{ color: ACCENT }}>{data.highlight}</span>{" "}
            {data.suffix}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleItems.map((cert, index) => {
            const faviconUrl = getFaviconUrl(
              cert.issuerUrl ?? cert.credentialUrl,
            );
            const CardWrapper = cert.credentialUrl ? "a" : "div";
            const cardProps = cert.credentialUrl
              ? {
                  href: cert.credentialUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `Ver credencial de ${cert.title} emitida por ${cert.issuer}`,
                }
              : {};

            return (
              <CardWrapper
                key={cert.id}
                {...cardProps}
                className={`group relative rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card/90 hover:shadow-xl cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Logo / Favicon */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 group-hover:border-primary/40 transition-all">
                        {faviconUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={faviconUrl}
                            alt={cert.issuer}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <GraduationCap
                            className="h-6 w-6"
                            style={{ color: ACCENT }}
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate group-hover:text-foreground transition-colors">
                          {cert.issuer}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground/80 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          {cert.issueDate}
                        </span>
                      </div>
                    </div>

                    {/* External Link Indicator */}
                    {cert.credentialUrl && (
                      <div className="p-1.5 rounded-lg bg-secondary/60 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                        <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Bottom Row: Skills */}
                <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-secondary/70 text-muted-foreground border border-border/30 group-hover:border-border/60 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-muted-foreground/80">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Ver todos os certificados button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/certificados"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-secondary/80 hover:bg-secondary text-foreground border border-border/60 transition-all hover:border-primary/40 hover:-translate-y-0.5 shadow-sm group"
          >
            <span>
              {data.ctaLabel} ({data.items.length})
            </span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
