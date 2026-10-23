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
  certificationsSection,
  contactSection,
  createBlogSection,
  createProjectsSection,
  experienceSection,
  getVisibleSections,
  hero,
  skillsSection,
} from "@/data";
import type { SectionConfig } from "@/data";
import { getBlogPostMetadata } from "@/lib/content/posts";
import { getProjectMetadata } from "@/lib/content/projects";

export default function Home() {
  const blogPosts = getBlogPostMetadata();
  const projectsSection = createProjectsSection(getProjectMetadata());
  const blogSection = createBlogSection(blogPosts);
  const navSections = getVisibleSections<SectionConfig>([
    hero,
    projectsSection,
    experienceSection,
    certificationsSection,
    skillsSection,
    blogSection,
    contactSection,
  ]);

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
