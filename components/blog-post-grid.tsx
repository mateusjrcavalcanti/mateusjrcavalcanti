import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { resolveContentImage, type BlogPost } from "@/data";
import { blogPostPath } from "@/lib/routes";
import { formatLongDate } from "@/lib/utils";

export function BlogPostGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center text-sm text-muted-foreground">
        Nenhum artigo publicado nesta coleção ainda.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} href={blogPostPath(post.slug)} className="group overflow-hidden rounded-2xl border border-border/60 bg-card">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <Image src={resolveContentImage(post.image)} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <span className="text-xs font-semibold text-primary">{post.category}</span>
            <h2 className="mt-2 text-lg font-bold">{post.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="size-3" /> {formatLongDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readTime}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
