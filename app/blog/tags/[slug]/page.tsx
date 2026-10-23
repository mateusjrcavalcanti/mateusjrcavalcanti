import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogPostGrid } from "@/components/blog-post-grid";
import { PageShell } from "@/components/layout";
import { site } from "@/data";
import { getBlogTags, getPostsByTag } from "@/lib/content/posts";
import { staticExportPlaceholder } from "@/lib/content/constants";
import { absoluteUrl, blogTagPath, routes } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const tags = getBlogTags();
  return tags.length
    ? tags.map(({ slug }) => ({ slug }))
    : [{ slug: staticExportPlaceholder }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = getBlogTags().find((item) => item.slug === slug);
  if (!tag) return { title: "Tag não encontrada" };

  return {
    title: `Tag: ${tag.name}`,
    alternates: { canonical: absoluteUrl(site.url, blogTagPath(slug)) },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = getBlogTags().find((item) => item.slug === slug);
  if (!tag) notFound();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <Link href={routes.blogTags} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Todas as tags
        </Link>
        <h1 className="mb-8 text-4xl font-bold">{tag.name}</h1>
        <BlogPostGrid posts={getPostsByTag(slug)} />
      </div>
    </PageShell>
  );
}
