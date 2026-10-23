"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  Award,
  Home,
  User,
  Layers,
  Briefcase,
  BookOpen,
  Mail,
  Cpu,
} from "lucide-react";
import type { SectionConfig } from "@/data";
import { useActiveSection } from "./use-active-section";

interface NavSection {
  id: string;
  name: string;
  color: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
}

const icons: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  hero: Home,
  sobre: User,
  projetos: Layers,
  experiencia: Briefcase,
  certificacoes: Award,
  competencias: Cpu,
  blog: BookOpen,
  contato: Mail,
};

const subscribeToHydration = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
}

export function SectionNav({
  data: sectionConfigs,
}: {
  data: SectionConfig[];
}) {
  const data: NavSection[] = useMemo(
    () =>
      sectionConfigs.map((s) => ({
        ...s,
        icon: icons[s.id] ?? Cpu,
      })),
    [sectionConfigs],
  );
  const activeSection = useActiveSection(sectionConfigs);
  const [customProjectsColor, setCustomProjectsColor] = useState<string | null>(
    null,
  );
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();

  // Listen to dynamic colors dispatched by the Projects section
  useEffect(() => {
    const handleColorChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCustomProjectsColor(customEvent.detail.color);
    };
    window.addEventListener("active-section-color-change", handleColorChange);
    return () =>
      window.removeEventListener(
        "active-section-color-change",
        handleColorChange,
      );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {data.map((section) => {
        const isActive = activeSection === section.id;
        const Icon = section.icon;

        // Dynamic color for projects nav dot
        const c =
          section.id === "projetos" && customProjectsColor
            ? customProjectsColor
            : section.color;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Ir para ${section.name}`}
          >
            <span
              className={`text-xs font-bold tracking-wide transition-all duration-500 whitespace-nowrap px-3 py-1.5 rounded-full ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 group-hover:opacity-70 group-hover:translate-x-0"
              }`}
              style={{
                color: isActive ? (isDark ? c : "#fff") : undefined,
                backgroundColor: isActive
                  ? isDark
                    ? `${c}20`
                    : c
                  : "transparent",
              }}
            >
              {section.name}
            </span>
            <div
              className={`relative flex items-center justify-center transition-all duration-500 rounded-full border-2 ${
                isActive
                  ? "w-11 h-11 scale-110"
                  : "w-9 h-9 group-hover:scale-105"
              }`}
              style={{
                backgroundColor: isActive
                  ? c
                  : isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                borderColor: isActive
                  ? c
                  : isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.1)",
                boxShadow: isActive
                  ? `0 0 20px ${c}50, 0 0 40px ${c}25`
                  : "none",
              }}
            >
              <Icon
                className={`transition-all duration-300 ${isActive ? "w-4.5 h-4.5" : "w-3.5 h-3.5"}`}
                style={{
                  color: isActive
                    ? "#fff"
                    : isDark
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}
