import type { ContentSectionConfig, SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description:
      "Interfaces modernas, responsivas e acessíveis com renderização de alto desempenho.",
    iconKey: "frontend",
    skills: [
      "React 19",
      "Next.js 16 (App Router)",
      "TypeScript",
      "Tailwind CSS 4",
      "Radix UI",
      "MDX",
    ],
  },
  {
    title: "Backend & APIs",
    description:
      "Serviços escaláveis, APIs RESTful, autenticação segura e processamento assíncrono.",
    iconKey: "backend",
    skills: [
      "Node.js",
      "Laravel (PHP)",
      "Python",
      "APIs RESTful",
      "Autenticação JWT / OAuth",
      "Filas & Jobs",
    ],
  },
  {
    title: "Banco de Dados & Cache",
    description:
      "Modelagem relacional eficiente, integridade de dados e estratégias de caching.",
    iconKey: "database",
    skills: [
      "PostgreSQL 17",
      "MySQL",
      "Redis (Cache)",
      "Prisma ORM",
      "Migrations Declarativas",
    ],
  },
  {
    title: "Infraestrutura & DevOps",
    description:
      "Containerização, automação de esteiras e deploy determinístico em nuvem e VPS.",
    iconKey: "devops",
    skills: [
      "Docker & Compose",
      "Linux (Ubuntu/Alpine)",
      "CI/CD Pipelines",
      "Coolify",
      "Reverse Proxy (Nginx/Traefik)",
    ],
  },
  {
    title: "Arquitetura de Software",
    description:
      "Padrões de projeto, desacoplamento de camadas e comunicação eficiente entre serviços.",
    iconKey: "architecture",
    skills: [
      "Backend for Frontend (BFF)",
      "APIs REST",
      "Estratégia de Cache",
      "Design Patterns",
      "Clean Code",
    ],
  },
  {
    title: "Sistemas Embarcados & IoT",
    description:
      "Integração de hardware e software, sensores, comunicação industrial e robótica.",
    iconKey: "embedded",
    skills: [
      "ESP32",
      "Raspberry Pi",
      "Sensores & Atuadores",
      "Protocolos I²C / SPI / CAN",
      "Telemetria & Robótica",
    ],
  },
];

export const skillsSection = {
  id: "competencias",
  name: "Competências",
  color: "#3b82f6",
  eyebrow: "Engenharia & Tecnologias",
  title: "Competências",
  highlight: "Técnicas",
  description:
    "Habilidades estruturadas por capacidades práticas de engenharia de software e hardware, comprovadas pelos projetos entregues e pela formação acadêmica.",
  enabled: skillCategories.length > 0,
  items: skillCategories,
} satisfies ContentSectionConfig & { items: SkillCategory[] };

export type SkillsSectionData = typeof skillsSection;
