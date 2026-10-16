"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Code2 } from "lucide-react";
import type { HeroData } from "@/data";

export function Hero({ data }: { data: HeroData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        containerRef.current.getBoundingClientRect();
      const x = (clientX - left - width / 2) / 20;
      const y = (clientY - top - height / 2) / 20;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id={data.id}
      ref={containerRef}
      className="snap-section relative h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{ ["--mouse-x" as string]: "0px", ["--mouse-y" as string]: "0px" }}
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[120px] transition-transform duration-300"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * -1.5), calc(var(--mouse-y) * -1.5))",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-600/30 rounded-full blur-[100px] transition-transform duration-300"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 1.2), calc(var(--mouse-y) * 1.2))",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-amber-500/20 rounded-full blur-[80px] transition-transform duration-300"
        style={{
          transform:
            "translate(calc(-50% + var(--mouse-x)), calc(-50% + var(--mouse-y)))",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8">
            <Code2 className="h-4 w-4" />
            {data.eyebrow}
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <span className="text-foreground">{data.titleWords[0]}</span>{" "}
          <span className="text-primary">{data.titleWords[1]}</span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          {data.description}
        </p>

        {/* Quick Highlights / Metrics Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-220">
          {data.metrics.map((metric) => (
            <div
              key={metric.value}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 text-xs font-medium text-muted-foreground"
            >
              {metric.active ? (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ) : null}
              <strong className="text-foreground">{metric.value}</strong>{" "}
              {metric.label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          {data.techStack.map((tech, i) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-full bg-secondary/80 text-xs font-medium text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
              style={{ animationDelay: `${400 + i * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <a
          href="#projetos"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-medium">{data.scrollCta}</span>
          <ArrowDown className="h-4 w-4 text-primary" />
        </a>
      </div>
    </section>
  );
}
