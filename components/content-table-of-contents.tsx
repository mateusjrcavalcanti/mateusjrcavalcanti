"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function ContentTableOfContents() {
  const [items, setItems] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(".markdown-content h2, .markdown-content h3"),
    ).map((heading) => ({
      id: heading.id,
      text: heading.textContent?.trim() ?? "",
      level: Number(heading.tagName.slice(1)) as 2 | 3,
    })).filter((item) => item.id && item.text);

    const frame = window.requestAnimationFrame(() => {
      setItems(headings);
      if (headings[0]) setActiveId(headings[0].id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70%", threshold: 0 },
    );
    headings.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <aside className="mb-8 rounded-xl border border-border/60 bg-card/60 p-4 lg:sticky lg:top-24 lg:mb-0">
      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <List className="size-3.5" /> Nesta página
      </p>
      <nav aria-label="Sumário do conteúdo" className="space-y-1 border-l border-border/70 pl-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1 text-sm leading-5 transition-colors ${item.level === 3 ? "ml-3" : ""} ${activeId === item.id ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
