import type { ContentSectionConfig } from "./types";

export const contact = {
  email: "contato@mateusjunior.dev",
  github: "https://github.com/mateusjrcavalcanti",
  linkedin: "https://linkedin.com/in/mateusjrcavalcanti",
};

export const contactSection = {
  id: "contato",
  name: "Contato",
  color: "#f43f5e",
  eyebrow: "Contato",
  title: "Entre em",
  highlight: "contato",
  description:
    "Tem um projeto em mente, um tema para discutir ou quer trocar uma ideia sobre tecnologia? Entre em contato por qualquer um dos canais abaixo.",
  ...contact,
} satisfies ContentSectionConfig & typeof contact;

export type ContactSectionData = typeof contactSection;
