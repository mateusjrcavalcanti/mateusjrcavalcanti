import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { ContentTableOfContents } from "@/components/content-table-of-contents";
import { PageShell } from "@/components/layout";
import { getSiteAssetUrl, resolveContentImage, site } from "@/data";
import { getAdjacentBlogPosts, getAllBlogPosts, getBlogPostBySlug } from "@/lib/content/posts";
import { staticExportPlaceholder } from "@/lib/content/constants";
import { absoluteUrl, blogPostImagePath, blogPostPath, routes } from "@/lib/routes";
import { formatLongDate } from "@/lib/utils";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.length
    ? posts.map(({ metadata }) => ({ slug: metadata.slug }))
    : [{ slug: staticExportPlaceholder }];
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug)?.metadata;
  if (!post) return { title: "Artigo não encontrado" };

  const url = absoluteUrl(site.url, blogPostPath(post.slug));
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      images: [{
        url: getSiteAssetUrl(blogPostImagePath(post.slug)),
        width: 1200,
        height: 630,
        alt: post.title,
      }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [getSiteAssetUrl(blogPostImagePath(post.slug))],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const document = getBlogPostBySlug(slug);
  if (!document) notFound();
  const { metadata: post, content } = document;
  const adjacent = getAdjacentBlogPosts(post.slug);

  return (
    <PageShell>
      <article className="mx-auto max-w-6xl">
        <Link href={routes.blog} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar para o blog
        </Link>
        <header className="mb-10 space-y-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {formatLongDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1"><Clock className="size-3.5" /> {post.readTime}</span>
            <span>{post.author}</span>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-secondary">
            <Image src={resolveContentImage(post.image)} alt={post.title} fill priority className="object-cover" />
          </div>
        </header>
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <ContentTableOfContents />
          <MarkdownContent source={content} />
        </div>
        {(adjacent.newer || adjacent.older) && (
          <nav aria-label="Outros artigos" className="mt-12 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
            {adjacent.older ? (
              <Link href={blogPostPath(adjacent.older.slug)} className="rounded-xl border border-border/60 p-4 hover:border-primary/50">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="size-3" /> Artigo anterior</span>
                <strong className="mt-2 block">{adjacent.older.title}</strong>
              </Link>
            ) : <span />}
            {adjacent.newer && (
              <Link href={blogPostPath(adjacent.newer.slug)} className="rounded-xl border border-border/60 p-4 text-right hover:border-primary/50">
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Artigo seguinte <ArrowRight className="size-3" /></span>
                <strong className="mt-2 block">{adjacent.newer.title}</strong>
              </Link>
            )}
          </nav>
        )}
      </article>
    </PageShell>
  );
}
