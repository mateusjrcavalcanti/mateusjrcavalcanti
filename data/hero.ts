import type { HeroMetric, SectionConfig } from "./types";

export const hero = {
  id: "hero",
  name: "Início",
  color: "#f97316",
  eyebrow: "Full Stack Developer · Software Engineering",
  titleWords: ["Mateus", "Junior", ""],
  description:
    "Desenvolvedor de software e graduando em Engenharia de Computação pela UNIVASF, com atuação em aplicações web, infraestrutura, automação e sistemas embarcados.",
  metrics: [
    { value: "6+ anos", label: "de experiência", active: true },
    { value: "UNIVASF", label: "· Eng. Computação" },
    { value: "Full Stack", label: "& Embarcados" },
  ],
  techStack: [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Laravel",
    "Docker",
    "PostgreSQL",
    "Python",
  ],
  scrollCta: "Conheça meu trabalho",
} satisfies SectionConfig & {
  eyebrow: string;
  titleWords: [string, string, string];
  description: string;
  metrics: HeroMetric[];
  techStack: string[];
  scrollCta: string;
};

export type HeroData = typeof hero;
