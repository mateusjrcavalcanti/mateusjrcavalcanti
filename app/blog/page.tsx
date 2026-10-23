import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Tags } from "lucide-react";
import { PageShell } from "@/components/layout";
import { BlogPostGrid } from "@/components/blog-post-grid";
import { createBlogSection, site, withBasePath } from "@/data";
import { getBlogPostMetadata } from "@/lib/content/posts";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Blog e artigos",
  description:
    "Artigos e aprendizados sobre engenharia de computação, desenvolvimento de software e infraestrutura.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogPage() {
  const blogPosts = getBlogPostMetadata();
  const blogSection = createBlogSection(blogPosts);

  return (
    <PageShell>
      <Link href="/#blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Voltar para o início
      </Link>
      <header className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold" style={{ color: blogSection.color, borderColor: `${blogSection.color}40`, backgroundColor: `${blogSection.color}15` }}>
          <BookOpen className="size-3.5" /> Conteúdo técnico
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Blog <span style={{ color: blogSection.color }}>&amp; artigos</span>
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{blogSection.description}</p>
      </header>

      <nav aria-label="Explorar artigos" className="mb-8 flex flex-wrap gap-3">
        <Link href={routes.blogCategories} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary"><BookOpen className="size-4" /> Categorias</Link>
        <Link href={routes.blogTags} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary"><Tags className="size-4" /> Tags</Link>
        <a href={withBasePath(routes.feed)} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary">RSS</a>
      </nav>

      {blogPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
          <BookOpen className="mx-auto mb-4 size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">Artigos em preparação</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            As primeiras publicações serão disponibilizadas aqui em breve.
          </p>
        </div>
      ) : (
        <BlogPostGrid posts={blogPosts} />
      )}
    </PageShell>
  );
}
