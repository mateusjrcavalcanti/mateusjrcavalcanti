---
slug: robotica-educativa-univasf
category: web
title: Robótica Educativa UNIVASF
description: Plataforma web oficial da UNIVASF para democratização do ensino de robótica e programação em escolas públicas do Vale do São Francisco.
image: /projetos/robotica-educativa-univasf.png
tags:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Vercel
  - UI/UX
  - Acessibilidade
  - Core Web Vitals
context: Acadêmico
status: Concluído
featured: true
liveUrl: https://robotica-educativa-univasf.vercel.app/
year: "2026"
---

# Robótica Educativa UNIVASF

> Plataforma web oficial do programa de extensão universitária da **Universidade Federal do Vale do São Francisco (UNIVASF)** para democratização do ensino de robótica pedagógica, programação e ciência em escolas públicas da região.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)](https://robotica-educativa-univasf.vercel.app/)

## 🎯 Objetivo e impacto

- 🚀 **Capacitação prática:** cursos e oficinas presenciais de robótica livre e lógica de programação para estudantes da rede pública.
- 📖 **Materiais didáticos abertos:** disponibilização de apostilas, roteiros de montagem e guias práticos para professores e alunos.
- 🏫 **Ponte universidade-escola:** canal institucional para agendamento de visitas escolares, oficinas e participação em mostras científicas.

## ✨ Principais funcionalidades

- 📱 **Portal institucional responsivo:** apresentação clara da metodologia pedagógica e do impacto social do programa.
- 🛠️ **Catálogo de oficinas e atividades:** estruturação visual das frentes de aprendizado, como Arduino, eletrônica básica e pensamento computacional.
- 📸 **Galeria e registro de eventos:** exposição fotográfica e documental das ações realizadas nas escolas.
- 📬 **Canal direto de contato:** formulário otimizado para integração rápida entre escolas e coordenadores do projeto.

## 👨‍💻 Minha atuação no projeto

- 🏗️ **Arquitetura frontend:** estruturação completa do projeto com Next.js App Router e TypeScript, com foco em modularidade e manutenção.
- 🎨 **Design system e UI/UX:** criação de uma interface moderna, limpa e responsiva com Tailwind CSS, priorizando estudantes e docentes.
- ⚡ **Otimização e desempenho:** implementação de carregamento sob demanda, otimização de imagens e redução do pacote inicial.
- 🚀 **Pipeline de CI/CD e deploy:** configuração do fluxo automatizado de integração e publicação na Vercel.

## 🛠️ Stack e decisões técnicas

- ⚡ **Next.js App Router:** renderização híbrida para oferecer resposta rápida e conteúdo indexável.
- 🔷 **TypeScript:** tipagem estrita de componentes e modelos para aumentar a confiabilidade do código.
- 🎨 **Tailwind CSS:** design tokens consistentes e CSS utilitário para acelerar a construção da interface.
- ☁️ **Vercel Edge Network:** distribuição global dos arquivos com compressão automática e baixa latência.

## 📐 Topologia de arquitetura

```mermaid
graph TD
    User("👨‍🎓 Usuário / Escola") -->|HTTPS / DNS| Edge("🌐 Vercel Edge Network")
    Edge -->|SSR / Cache ISR| Next("⚡ Next.js App Router")
    Next -->|Server Components| UI("🎨 Interface e Design System")
    Next -->|Lazy Loading| Assets("🖼️ Imagens otimizadas")
    Next -->|API Routes| Form("📬 Formulário institucional de contato")
```

## 🛡️ Desafios técnicos e soluções

- ♿ **Acessibilidade universal (WCAG):** necessidade de atender estudantes e educadores com diferentes dispositivos e níveis de letramento digital.
- **Solução:** semântica estruturada, contraste alinhado à WCAG 2.1 e navegação por teclado e leitores de tela.
