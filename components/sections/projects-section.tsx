"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { withBasePath, type ProjectCategory, type ProjectsSectionData } from "@/data";
import { projectPath } from "@/lib/routes";

type FilterCategory = "all" | ProjectCategory;

export function ProjectsSection({
  data: projectSection,
}: {
  data: ProjectsSectionData;
}) {
  if (!projectSection.enabled) return null;

  return <ProjectsSectionContent data={projectSection} />;
}

function ProjectsSectionContent({
  data: projectSection,
}: {
  data: ProjectsSectionData;
}) {
  const projects = projectSection.items;
  const categoryLabels = projectSection.categoryLabels;
  const categoryColors = projectSection.subColors;
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Dynamic active color for the entire section and navs
  const activeColor =
    activeFilter === "all"
      ? categoryColors.todos
      : categoryColors[activeFilter];

  // Broadcast the dynamic color when active filter or visibility changes
  useEffect(() => {
    if (isVisible) {
      window.dispatchEvent(
        new CustomEvent("active-section-color-change", {
          detail: { color: activeColor },
        }),
      );
    }
  }, [activeColor, isVisible]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
  }, [activeFilter]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateScrollState();
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeFilter]);

  const scrollProjects = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const offset = Math.max(280, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: projectSection.allFilterLabel },
    ...Object.entries(categoryLabels)
      .filter(([key]) => projects.some((p) => p.category === key))
      .map(([key, label]) => ({
        key: key as FilterCategory,
        label,
      })),
  ];

  return (
    <>
      <section
        id={projectSection.id}
        ref={sectionRef}
        className="snap-section relative min-h-screen flex flex-col justify-center overflow-hidden bg-background transition-all duration-700"
      >
        {/* Decorative — dynamically tinted to active filter color */}
        <div
          className="absolute top-1/4 right-[5%] w-[500px] h-[500px] fx-float-soft rounded-[46%_54%_61%_39%] blur-[155px] pointer-events-none transition-all duration-700"
          style={{ backgroundColor: `${activeColor}12` }}
        />
        <div
          className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] fx-float-soft-delayed rounded-[46%_54%_61%_39%] blur-[125px] pointer-events-none transition-all duration-700"
          style={{ backgroundColor: `${activeColor}08` }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[380px] h-[380px] fx-pulse-soft -translate-x-[46%] -translate-y-[48%] -rotate-[10deg] rounded-[58%_42%_37%_63%] blur-[110px] pointer-events-none transition-all duration-700"
          style={{ backgroundColor: `${activeColor}10` }}
        />
        {/* Grid — dynamically tinted grid lines */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(${activeColor}06 1px,transparent 1px),linear-gradient(90deg,${activeColor}06 1px,transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-16">
          {/* Header */}
          <div
            className={`mb-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border transition-colors duration-700"
              style={{
                backgroundColor: `${activeColor}15`,
                borderColor: `${activeColor}40`,
                color: activeColor,
              }}
            >
              <Layers className="h-4 w-4" />
              {projectSection.eyebrow}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {projectSection.title}{" "}
              <span
                className="transition-colors duration-700"
                style={{ color: activeColor }}
              >
                {projectSection.highlight}
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {projectSection.description}
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className={`flex gap-2 mb-8 flex-wrap transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              const color =
                filter.key === "all"
                  ? categoryColors.todos
                  : categoryColors[filter.key as ProjectCategory];

              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border-transparent"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: color,
                          borderColor: color,
                          boxShadow: `0 4px 20px ${color}40`,
                        }
                      : undefined
                  }
                >
                  {filter.label}
                  <span className="ml-2 text-xs opacity-70">
                    {filter.key === "all"
                      ? projects.length
                      : projects.filter((p) => p.category === filter.key)
                          .length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Projects scrollable row */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-4 flex items-center justify-end gap-2 lg:hidden">
              <button
                onClick={() => scrollProjects("left")}
                disabled={!canScrollLeft}
                aria-label="Rolar projetos para a esquerda"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  borderColor: canScrollLeft ? `${activeColor}50` : undefined,
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollProjects("right")}
                disabled={!canScrollRight}
                aria-label="Rolar projetos para a direita"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  borderColor: canScrollRight ? `${activeColor}50` : undefined,
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-4">
              <button
                onClick={() => scrollProjects("left")}
                disabled={!canScrollLeft}
                aria-label="Rolar projetos para a esquerda"
                className="hidden lg:inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border border-border/60 bg-background/85 text-foreground backdrop-blur-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  borderColor: canScrollLeft ? `${activeColor}60` : undefined,
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div
                ref={carouselRef}
                className="flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar cursor-grab active:cursor-grabbing"
              >
                {filteredProjects.map((project) => {
                  const color = categoryColors[project.category];
                  return (
                    <Link
                      key={project.id}
                      href={projectPath(project.slug)}
                      className="group/card flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden text-left focus:outline-none transition-all duration-500 border backdrop-blur-sm hover:-translate-y-2 block"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${color}10`;
                        e.currentTarget.style.borderColor = `${color}50`;
                        e.currentTarget.style.boxShadow = `0 20px 40px ${color}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={withBasePath(project.image)}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(to top, ${color}40, transparent 60%)`,
                          }}
                        />
                        {/* Category and Context badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                          <span
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-bold backdrop-blur-md"
                            style={{
                              backgroundColor: `${color}90`,
                              color: "#fff",
                            }}
                          >
                            {categoryLabels[project.category]}
                          </span>
                          {project.context && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-md bg-background/80 text-foreground border border-border/60">
                              {project.context}
                            </span>
                          )}
                          {project.status && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-md bg-emerald-500/80 text-white">
                              {project.status}
                            </span>
                          )}
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <span
                            className="px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-md shadow-lg flex items-center gap-1.5"
                            style={{
                              backgroundColor: `${color}95`,
                              color: "#fff",
                            }}
                          >
                            <BookOpen className="h-4 w-4" />
                            {projectSection.caseStudyLabel}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-foreground text-base mb-1.5 line-clamp-1 group-hover/card:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                          {project.description}
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
                              style={{
                                backgroundColor: `${color}10`,
                                borderColor: `${color}30`,
                                color: color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/50 text-muted-foreground">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => scrollProjects("right")}
                disabled={!canScrollRight}
                aria-label="Rolar projetos para a direita"
                className="hidden lg:inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border border-border/60 bg-background/85 text-foreground backdrop-blur-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  borderColor: canScrollRight ? `${activeColor}60` : undefined,
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Project count and CTA to all projects */}
          <div
            className={`mt-8 flex flex-wrap items-center justify-between gap-4 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-3xl font-bold transition-colors duration-700"
                style={{ color: activeColor }}
              >
                {filteredProjects.length}
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                {projectSection.countLabel}
              </span>
            </div>

            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{
                borderColor: `${activeColor}50`,
                backgroundColor: `${activeColor}10`,
                color: activeColor,
              }}
            >
              {projectSection.catalogLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
