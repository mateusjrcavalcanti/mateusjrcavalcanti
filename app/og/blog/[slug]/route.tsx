import { ImageResponse } from "next/og";
import { SocialCard, socialCardSize } from "@/components/social-card";
import { getBlogPostBySlug, getBlogPostMetadata } from "@/lib/content/posts";
import { staticExportPlaceholder } from "@/lib/content/constants";

export const dynamic = "force-static";

export function generateStaticParams() {
  const posts = getBlogPostMetadata();
  return posts.length
    ? posts.map(({ slug }) => ({ slug }))
    : [{ slug: staticExportPlaceholder }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug)?.metadata;
  if (!post) return new Response(null, { status: 404 });
  return new ImageResponse(
    <SocialCard eyebrow={post.category} title={post.title} description={post.excerpt} accent="#10b981" />,
    socialCardSize,
  );
}
