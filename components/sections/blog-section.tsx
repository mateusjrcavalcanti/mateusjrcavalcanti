"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost, BlogSectionData } from "@/data";

interface BlogSectionProps {
  posts: BlogPost[];
  section: BlogSectionData;
}

export function BlogSection({ posts, section }: BlogSectionProps) {
  const ACCENT = section.color;
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
      id={section.id}
      ref={sectionRef}
      className="snap-section relative h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      <div
        className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-[46%_54%_61%_39%] blur-[135px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}12` }}
      />
      <div
        className="absolute bottom-20 right-[15%] w-[350px] h-[350px] rounded-[58%_42%_37%_63%] blur-[110px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}0a` }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -translate-x-[44%] -translate-y-[52%] rotate-[12deg] rounded-[64%_36%_52%_48%] blur-[105px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}12` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${ACCENT}06 1px,transparent 1px),linear-gradient(90deg,${ACCENT}06 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-12">
        {/* Header */}
        <div
          className={`flex items-end justify-between mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border"
              style={{
                backgroundColor: `${ACCENT}15`,
                borderColor: `${ACCENT}40`,
                color: ACCENT,
              }}
            >
              <BookOpen className="h-4 w-4" />
              {section.eyebrow}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
              {section.title}{" "}
              <span style={{ color: ACCENT }}>{section.highlight}</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
              {section.description}
            </p>
          </div>
          <Link
            href={`#${section.id}`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors border"
            style={{
              backgroundColor: `${ACCENT}10`,
              borderColor: `${ACCENT}30`,
              color: ACCENT,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${ACCENT}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${ACCENT}10`;
            }}
          >
            {section.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Posts grid — compact 3x2 to fit in viewport */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`#${section.id}`}
              className="group flex gap-3 p-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
              style={{ transitionDelay: `${250 + i * 60}ms` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${ACCENT}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
              }}
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3
                  className="font-bold text-foreground text-sm mb-1 line-clamp-2 transition-colors leading-tight group-hover:text-current"
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-auto">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <ArrowRight
                className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0"
                style={{ color: ACCENT }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            href={`#${section.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors border"
            style={{
              backgroundColor: `${ACCENT}10`,
              borderColor: `${ACCENT}30`,
              color: ACCENT,
            }}
          >
            {section.mobileCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
