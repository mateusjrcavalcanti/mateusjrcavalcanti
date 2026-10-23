import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Navigation } from "./navigation";
import {
  certificationsSection,
  contactSection,
  createBlogSection,
  createProjectsSection,
  experienceSection,
  getVisibleSections,
  hero,
  skillsSection,
  type SectionConfig,
} from "@/data";
import { getBlogPostMetadata } from "@/lib/content/posts";
import { getProjectMetadata } from "@/lib/content/projects";

export function PageShell({ children }: { children: ReactNode }) {
  const navigationSections = getVisibleSections<SectionConfig>([
    hero,
    createProjectsSection(getProjectMetadata()),
    experienceSection,
    certificationsSection,
    skillsSection,
    createBlogSection(getBlogPostMetadata()),
    contactSection,
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation data={navigationSections} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-20 pt-28 print:max-w-none print:p-0 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
