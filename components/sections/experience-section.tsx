"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import type { ExperienceSectionData } from "@/data";
import { formatExperiencePeriod } from "@/lib/utils";

export function ExperienceSection({ data }: { data: ExperienceSectionData }) {
  if (!data.enabled) return null;

  return <ExperienceSectionContent data={data} />;
}

function ExperienceSectionContent({ data }: { data: ExperienceSectionData }) {
  const ACCENT = data.color;
  const experiences = [...data.items].sort((a, b) => {
    const getStartYear = (period: [string, string?]) => {
      const match = period[0].match(/\d{4}/);
      return match ? Number.parseInt(match[0], 10) : 0;
    };
    return getStartYear(a.period) - getStartYear(b.period);
  });
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

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

  const startDrag = (clientX: number) => {
    const el = carouselRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = clientX;
    dragStartScrollLeft.current = el.scrollLeft;
  };

  const onDragMove = (clientX: number) => {
    const el = carouselRef.current;
    if (!el || !isDragging) return;
    const deltaX = clientX - dragStartX.current;
    el.scrollLeft = dragStartScrollLeft.current - deltaX;
  };

  const endDrag = () => setIsDragging(false);

  return (
    <section
      id={data.id}
      ref={sectionRef}
      className="snap-section relative h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      <div
        className="absolute top-1/3 left-[15%] w-[400px] h-[400px] fx-float-soft rounded-[46%_54%_61%_39%] blur-[145px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}12` }}
      />
      <div
        className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] fx-float-soft-delayed rounded-[58%_42%_37%_63%] blur-[110px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}0a` }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[420px] h-[420px] fx-pulse-soft -translate-x-[43%] -translate-y-[50%] rotate-[8deg] rounded-[64%_36%_52%_48%] blur-[120px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}10` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${ACCENT}06 1px,transparent 1px),linear-gradient(90deg,${ACCENT}06 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-12">
        <div
          className={`mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border"
            style={{
              backgroundColor: `${ACCENT}15`,
              borderColor: `${ACCENT}40`,
              color: ACCENT,
            }}
          >
            <Briefcase className="h-4 w-4" />
            {data.eyebrow}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3">
            {data.title} <span style={{ color: ACCENT }}>{data.highlight}</span>{" "}
            {data.suffix}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>

        <div
          className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="absolute top-6 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, ${ACCENT}60, ${ACCENT}20, transparent)`,
            }}
          />

          <div>
            <div
              ref={carouselRef}
              className={`flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onMouseDown={(e) => startDrag(e.clientX)}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
              onTouchEnd={endDrag}
            >
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative flex-shrink-0 w-[280px] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] pt-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${300 + index * 120}ms` }}
                >
                  <div
                    className="absolute top-0 left-6 w-4 h-4 rounded-full border-2 -translate-y-1/2 transition-all duration-500 z-10"
                    style={{
                      top: "24px",
                      backgroundColor: exp.current
                        ? ACCENT
                        : "var(--background)",
                      borderColor: exp.current ? ACCENT : `${ACCENT}50`,
                      boxShadow: exp.current ? `0 0 16px ${ACCENT}60` : "none",
                    }}
                  />
                  <div
                    className="absolute left-[1.65rem] w-px"
                    style={{
                      top: "32px",
                      height: "16px",
                      backgroundColor: `${ACCENT}30`,
                    }}
                  />

                  <div
                    className="group p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 h-full min-h-[360px] flex flex-col"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${ACCENT}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                    }}
                  >
                    <span
                      className="self-start text-xs font-bold px-3 py-1.5 rounded-full mb-3 border"
                      style={
                        exp.current
                          ? {
                              backgroundColor: `${ACCENT}15`,
                              color: ACCENT,
                              borderColor: `${ACCENT}30`,
                            }
                          : undefined
                      }
                    >
                      {exp.periodLabel ||
                        formatExperiencePeriod(exp.period, exp.current)}
                    </span>

                    {exp.logo ? (
                      <div className="mb-4 flex items-center justify-center">
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/60 bg-background/70 p-1.5">
                          <Image
                            src={exp.logo}
                            alt={`Logo ${exp.company}`}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        </div>
                      </div>
                    ) : null}

                    <h3
                      className="text-base font-bold text-foreground transition-colors mb-1 group-hover:text-current"
                      style={{ ["--tw-text-opacity" as string]: 1 }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = ACCENT)
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mb-3">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      {exp.company}
                    </p>

                    {exp.positions && exp.positions.length > 0 ? (
                      <div className="mb-4 flex-1">
                        <div className="relative pl-5">
                          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border/70" />
                          <div className="space-y-4">
                            {exp.positions.map((position, pIndex) => (
                              <div
                                key={`${exp.id}-position-${pIndex}`}
                                className="relative"
                              >
                                <span className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground/60" />
                                <p className="text-sm font-semibold text-foreground leading-tight">
                                  {position.title}
                                </p>
                                {position.subtitle ? (
                                  <p className="text-xs text-muted-foreground leading-tight">
                                    {position.subtitle}
                                  </p>
                                ) : null}
                                <p className="text-xs text-muted-foreground leading-tight">
                                  {position.periodLabel}
                                  {position.duration
                                    ? ` · ${position.duration}`
                                    : ""}
                                </p>
                                {position.location ? (
                                  <p className="text-xs text-muted-foreground leading-tight">
                                    {position.location}
                                  </p>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                        {exp.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border"
                          style={{
                            backgroundColor: `${ACCENT}10`,
                            color: ACCENT,
                            borderColor: `${ACCENT}25`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
