import type { ContentSectionConfig, Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: "exp-freelancer",
    role: "Desenvolvedor Full Stack",
    company: "Freelancer",
    period: ["2018"],
    periodLabel: "2018 — Atual",
    current: true,
    description:
      "Desenvolvimento de soluções web completas e sob demanda, atuando do backend à infraestrutura e interfaces responsivas para clientes diversos.",
    technologies: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Node.js",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Git",
      "MySQL",
    ],
    positions: [
      {
        title: "Node.js, React & TypeScript",
        subtitle:
          "Aplicações web modernas, APIs RESTful, SSR/SSG com Next.js, arquitetura em camadas e integração com PostgreSQL e Docker.",
        periodLabel: "2023 – Atual",
        duration: "3+ anos",
      },
      {
        title: "PHP, Laravel & WordPress",
        subtitle:
          "Sistemas administrativos, portais institucionais, integrações com APIs REST e gateways de pagamento, banco MySQL e manutenção evolutiva.",
        periodLabel: "2018 – Atual",
        duration: "8+ anos",
      },
    ],
  },
  {
    id: "exp-3",
    role: "Inove Jr - Empresa Júnior de Engenharia da Computação",
    company: "Inove Jr",
    period: ["2024", "2026"],
    periodLabel: "2024 — 2026",
    current: true,
    description:
      "Atuação em gestão e execução de projetos, com transição de trainee para assessor.",
    technologies: [
      "Gestão de Projetos",
      "Liderança",
      "Organização",
      "Engenharia",
    ],
    positions: [
      {
        title: "Diretor de Gestão Organizacional",
        periodLabel: "fevereiro de 2025 - maio de 2026",
        duration: "1 ano 3 meses",
      },
      {
        title: "Desenvolvedor",
        periodLabel: "maio de 2024 - fevereiro de 2025",
        duration: "9 meses",
      },
      {
        title: "Trainee",
        periodLabel: "março de 2024 - maio de 2024",
        duration: "3 meses",
      },
    ],
  },
  {
    id: "exp-4",
    role: "Graduação em Engenharia de Computação",
    company: "UNIVASF",
    period: ["dezembro de 2026 (previsto)"],
    periodLabel: "dezembro de 2026 (previsto)",
    current: false,
    description:
      "Conclusão prevista da graduação em Engenharia de Computação na UNIVASF em dezembro de 2026, com base em desenvolvimento de software, automação, IA e aplicações práticas em computação.",
    technologies: [
      "C",
      "Java",
      "Python",
      "Django",
      "IA",
      "Deep Learning",
      "Sistemas Embarcados",
      "Formação em Engenharia",
    ],
  },
];

export const experienceSection = {
  id: "experiencia",
  name: "Trajetória",
  color: "#8b5cf6",
  eyebrow: "Carreira",
  title: "Experiência",
  highlight: "& trajetória",
  description:
    "Minha jornada e as tecnologias que dominei ao longo do caminho.",
  items: experiences,
} satisfies ContentSectionConfig & { items: Experience[] };

export type ExperienceSectionData = typeof experienceSection;
