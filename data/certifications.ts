import type { Certification, ContentSectionConfig } from "./types";

export const certifications: Certification[] = [
  {
    id: "cert-devops-ninja-k8s-rancher",
    title: "DevOps Ninja: Docker, Kubernetes e Rancher",
    issuer: "Udemy",
    issuerUrl: "https://www.udemy.com",
    issueDate: "jun de 2023",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-9c2da0e4-91cf-4f87-a853-0e7ca0e34604/",
    credentialId: "UC-9c2da0e4-91cf-4f87-a853-0e7ca0e34604",
    skills: ["Docker", "Kubernetes", "Rancher", "DevOps", "CI/CD"],
  },
  {
    id: "cert-devops-multicloud-traefik",
    title: "DevOps Ninja: Multicloud + Multicluster K8S + Rancher + Traefik",
    issuer: "Udemy",
    issuerUrl: "https://www.udemy.com",
    issueDate: "ago de 2022",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-e897aac9-3144-423a-8b52-f9c1c8276e23/",
    credentialId: "UC-e897aac9-3144-423a-8b52-f9c1c8276e23",
    skills: [
      "Kubernetes",
      "Multicloud",
      "Rancher",
      "Traefik",
      "Infraestrutura",
    ],
  },
  {
    id: "cert-avaliador-scientex-univasf",
    title: "Certificado de Avaliador — XIV SCIENTEX UNIVASF",
    issuer: "Even3 · UNIVASF",
    issuerUrl: "https://www.even3.com.br",
    issueDate: "fev de 2022",
    credentialUrl:
      "https://www.even3.com.br/documentos/imprimir?i=8866990.5077086.7.0.522883937735273&cc=C11FBA62-77C1-425B-B129-12472E7D1806",
    credentialId: "8866990.5077086.7.0.522883937735273",
    skills: ["UNIVASF", "Avaliação Científica", "Pesquisa & Extensão"],
  },
  {
    id: "cert-infraestrutura-samba4-pfsense",
    title: "Infraestrutura de TI com Samba4 + AD + pfSense + File Server",
    issuer: "Udemy",
    issuerUrl: "https://www.udemy.com",
    issueDate: "jul de 2020",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-de4f3d14-0acd-476a-bf2d-1071237dd925/",
    credentialId: "UC-de4f3d14-0acd-476a-bf2d-1071237dd925",
    skills: ["Samba4", "Active Directory", "pfSense", "File Server", "Linux"],
  },
];

export const certificationsSection = {
  id: "certificacoes",
  name: "Cursos & Certificados",
  color: "#ec4899",
  eyebrow: "Cursos & Certificações",
  title: "Aprendizado contínuo",
  highlight: "& credenciais",
  description:
    "Especializações práticas, licenças e cursos técnicos focados no domínio de ferramentas modernas, boas práticas de engenharia de software e infraestrutura.",
  ctaLabel: "Ver todos os certificados",
  items: certifications,
} satisfies ContentSectionConfig & { ctaLabel: string; items: Certification[] };

export type CertificationsSectionData = typeof certificationsSection;
