import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogPostGrid } from "@/components/blog-post-grid";
import { PageShell } from "@/components/layout";
import { site } from "@/data";
import { getBlogCategories, getPostsByCategory } from "@/lib/content/posts";
import { staticExportPlaceholder } from "@/lib/content/constants";
import { absoluteUrl, blogCategoryPath, routes } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const categories = getBlogCategories();
  return categories.length
    ? categories.map(({ slug }) => ({ slug }))
    : [{ slug: staticExportPlaceholder }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: `Categoria: ${category.name}`,
    alternates: { canonical: absoluteUrl(site.url, blogCategoryPath(slug)) },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <Link href={routes.blogCategories} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Todas as categorias
        </Link>
        <h1 className="mb-8 text-4xl font-bold">{category.name}</h1>
        <BlogPostGrid posts={getPostsByCategory(slug)} />
      </div>
    </PageShell>
  );
}
