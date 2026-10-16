import type { FooterLink, NavigationItem } from "./types";

export const site = {
  name: "Mateus Junior",
  brand: "mateusjr",
  title: "Mateus Junior — Full Stack Developer",
  description:
    "Portfólio de Mateus Junior, desenvolvedor de software e graduando em Engenharia de Computação pela UNIVASF.",
  locale: "pt-BR",
  languageLabel: "PT",
  searchLabel: "Buscar...",
  sourceLabel: "GitHub",
  footerBuiltWithPrefix: "Feito com",
  footerBuiltWith: "Next.js & Tailwind",
  copyrightYear: 2026,
  copyrightLabel: "Todos os direitos reservados.",
  homeLabel: "Início",
  themeToggleLabel: "Alternar tema",
  menuToggleLabel: "Abrir menu",
  navigation: [
    { href: "#projetos", label: "Projetos", sectionId: "projetos" },
    { href: "#experiencia", label: "Currículo", sectionId: "experiencia" },
    { href: "#blog", label: "Blog", sectionId: "blog" },
    { href: "#contato", label: "Contato", sectionId: "contato" },
  ] satisfies NavigationItem[],
  footerLinks: [
    { href: "#projetos", label: "Projetos" },
    { href: "#certificacoes", label: "Certificados" },
    { href: "#experiencia", label: "Currículo (ATS / PDF)", featured: true },
    { href: "#blog", label: "Blog" },
  ] satisfies FooterLink[],
} as const;
