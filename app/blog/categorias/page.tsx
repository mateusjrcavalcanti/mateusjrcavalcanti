import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout";
import { TaxonomyIndex } from "@/components/taxonomy-index";
import { site } from "@/data";
import { getBlogCategories, getPostsByCategory } from "@/lib/content/posts";
import { absoluteUrl, routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Categorias do blog",
  description: "Artigos organizados por categoria.",
  alternates: {
    canonical: absoluteUrl(site.url, routes.blogCategories),
  },
};

export default function BlogCategoriesPage() {
  const items = getBlogCategories().map((item) => ({
    ...item,
    count: getPostsByCategory(item.slug).length,
  }));

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <Link href={routes.blog} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar para o blog
        </Link>
        <TaxonomyIndex
          title="Categorias"
          description="Navegue pelos principais temas publicados no blog."
          basePath={routes.blogCategories}
          items={items}
        />
      </div>
    </PageShell>
  );
}
