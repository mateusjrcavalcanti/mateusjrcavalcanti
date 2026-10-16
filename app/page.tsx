import { Footer, Navigation, SectionNav } from "@/components/layout";
import {
  BlogSection,
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  Hero,
  ProjectsSection,
  SkillsMatrixSection,
} from "@/components/sections";
import {
  blogPosts,
  blogSection,
  certificationsSection,
  contactSection,
  experienceSection,
  hero,
  projectsSection,
  skillsSection,
} from "@/data";
import type { SectionConfig } from "@/data";

const navSections: SectionConfig[] = [
  hero,
  projectsSection,
  experienceSection,
  certificationsSection,
  skillsSection,
  blogSection,
  contactSection,
];

export default function Home() {
  return (
    <main className="relative">
      <Navigation data={navSections} />
      <SectionNav data={navSections} />
      <Hero data={hero} />
      <ProjectsSection data={projectsSection} />
      <ExperienceSection data={experienceSection} />
      <CertificationsSection data={certificationsSection} />
      <SkillsMatrixSection data={skillsSection} />
      <BlogSection posts={blogPosts} section={blogSection} />
      <ContactSection data={contactSection} />
      <Footer className="snap-section" />
    </main>
  );
}
