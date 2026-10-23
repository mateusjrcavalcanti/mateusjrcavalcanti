import Link from "next/link";

export function TaxonomyIndex({
  title,
  description,
  basePath,
  items,
}: {
  title: string;
  description: string;
  basePath: string;
  items: { name: string; slug: string; count: number }[];
}) {
  return (
    <section>
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </header>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <Link key={item.slug} href={`${basePath}/${item.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary">
              {item.name} <span className="ml-1 text-muted-foreground">({item.count})</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Esta coleção será preenchida automaticamente quando os primeiros artigos forem publicados.
        </div>
      )}
    </section>
  );
}
