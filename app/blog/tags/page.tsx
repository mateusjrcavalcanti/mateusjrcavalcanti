import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout";
import { TaxonomyIndex } from "@/components/taxonomy-index";
import { site } from "@/data";
import { getBlogTags, getPostsByTag } from "@/lib/content/posts";
import { absoluteUrl, routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Tags do blog",
  description: "Artigos organizados por tecnologia e assunto.",
  alternates: { canonical: absoluteUrl(site.url, routes.blogTags) },
};

export default function BlogTagsPage() {
  const items = getBlogTags().map((item) => ({
    ...item,
    count: getPostsByTag(item.slug).length,
  }));

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <Link href={routes.blog} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar para o blog
        </Link>
        <TaxonomyIndex
          title="Tags"
          description="Encontre artigos por tecnologia, ferramenta ou assunto."
          basePath={routes.blogTags}
          items={items}
        />
      </div>
    </PageShell>
  );
}
