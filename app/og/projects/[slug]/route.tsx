import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { SocialCard, socialCardSize } from "@/components/social-card";
import { getProjectBySlug, getProjectMetadata } from "@/lib/content/projects";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getProjectMetadata().map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug)?.metadata;
  if (!project) notFound();
  return new ImageResponse(<SocialCard eyebrow="Projeto" title={project.title} description={project.description} accent="#3b82f6" />, socialCardSize);
}
