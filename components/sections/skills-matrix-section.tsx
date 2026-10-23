"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Server, Database, Container, Cpu, Layers } from "lucide-react";
import type { SkillIconKey, SkillsSectionData } from "@/data";

const skillIcons: Record<SkillIconKey, React.ElementType> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Container,
  architecture: Layers,
  embedded: Cpu,
};

export function SkillsMatrixSection({ data }: { data: SkillsSectionData }) {
  if (!data.enabled) return null;

  return <SkillsMatrixSectionContent data={data} />;
}

function SkillsMatrixSectionContent({ data }: { data: SkillsSectionData }) {
  const accent = data.color;
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

  return (
    <section
      id={data.id}
      ref={sectionRef}
      className="snap-section relative min-h-screen flex flex-col justify-center overflow-hidden bg-background py-20"
    >
      {/* Background gradients */}
      <div
        className="absolute top-1/3 left-10 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: `${accent}1a` }}
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: `${accent}12` }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border"
            style={{
              color: accent,
              borderColor: `${accent}4d`,
              backgroundColor: `${accent}1a`,
            }}
          >
            <Cpu className="h-4 w-4" />
            {data.eyebrow}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {data.title} <span style={{ color: accent }}>{data.highlight}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((category, idx) => {
            const Icon = skillIcons[category.iconKey];

            return (
              <div
                key={category.title}
                className={`p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + idx * 80}ms` }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = `${accent}66`;
                  event.currentTarget.style.boxShadow = `0 10px 15px -3px ${accent}0d`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "";
                  event.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      color: accent,
                      borderColor: `${accent}33`,
                      backgroundColor: `${accent}1a`,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary/80 text-foreground border border-border/50 transition-colors cursor-default"
                      onMouseEnter={(event) => {
                        event.currentTarget.style.borderColor = `${accent}66`;
                        event.currentTarget.style.backgroundColor = `${accent}0d`;
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.borderColor = "";
                        event.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
