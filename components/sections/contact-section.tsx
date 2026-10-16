"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail, ArrowUpRight, Contact as Linkedin } from "lucide-react";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import type { ContactSectionData } from "@/data";

export function ContactSection({
  data: contactData,
}: {
  data: ContactSectionData;
}) {
  const ACCENT = contactData.color;
  const socialLinks = [
    { icon: Github, label: "GitHub", href: contactData.github },
    { icon: Linkedin, label: "LinkedIn", href: contactData.linkedin },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={contactData.id}
      ref={sectionRef}
      className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] fx-float-soft rounded-[46%_54%_61%_39%] blur-[155px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}15` }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] fx-float-soft-delayed rounded-[46%_54%_61%_39%] blur-[125px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}0a` }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[360px] h-[360px] fx-pulse-soft -translate-x-[46%] -translate-y-[48%] -rotate-[10deg] rounded-[58%_42%_37%_63%] blur-[110px] pointer-events-none"
        style={{ backgroundColor: `${ACCENT}12` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${ACCENT}04 1px,transparent 1px),linear-gradient(90deg,${ACCENT}04 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center py-20">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
            style={{
              backgroundColor: `${ACCENT}15`,
              borderColor: `${ACCENT}40`,
              color: ACCENT,
            }}
          >
            <Mail className="h-4 w-4" />
            {contactData.eyebrow}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {contactData.title}{" "}
            <span style={{ color: ACCENT }}>{contactData.highlight}</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto">
            {contactData.description}
          </p>
        </div>

        {/* Social links */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group relative flex w-[150px] flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${300 + i * 100}ms` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${ACCENT}40`;
                  e.currentTarget.style.backgroundColor = `${ACCENT}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-xl transition-colors"
                  style={{ backgroundColor: `${ACCENT}10`, color: ACCENT }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {link.label}
                </span>
                <ArrowUpRight className="absolute top-3 right-3 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>

        {/* Email direct */}
        <div
          className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link
            href={`mailto:${contactData.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 shadow-lg"
            style={{
              backgroundColor: ACCENT,
              boxShadow: `0 10px 25px -5px ${ACCENT}50`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 15px 30px -5px ${ACCENT}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 10px 25px -5px ${ACCENT}50`;
            }}
          >
            <Mail className="h-5 w-5" />
            {contactData.email}
          </Link>
        </div>
      </div>
    </section>
  );
}
