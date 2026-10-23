"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, FileText, FolderKanban, LayoutGrid } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { withBasePath } from "@/data";
import type { SearchEntry } from "@/lib/content/search";

const icons = {
  Páginas: LayoutGrid,
  Projetos: FolderKanban,
  Artigos: FileText,
  Certificações: Award,
};

export const searchOpenEvent = "site-search-open";

export function CommandPalette({ entries }: { entries: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const openSearch = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener(searchOpenEvent, openSearch);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(searchOpenEvent, openSearch);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(withBasePath(href as `/${string}`));
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Buscar no site"
      description="Pesquise páginas, projetos, artigos e certificações."
      className="sm:max-w-xl"
    >
      <CommandInput placeholder="Digite para buscar..." autoFocus />
      <CommandList className="max-h-[min(26rem,70vh)]">
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        {Object.keys(icons).map((group) => {
          const groupEntries = entries.filter((entry) => entry.group === group);
          if (groupEntries.length === 0) return null;
          const Icon = icons[group as keyof typeof icons];
          return (
            <CommandGroup key={group} heading={group}>
              {groupEntries.map((entry) => (
                <CommandItem
                  key={`${entry.group}-${entry.title}`}
                  value={`${entry.title} ${entry.description} ${entry.keywords.join(" ")}`}
                  onSelect={() => navigate(entry.href)}
                  className="items-start py-2.5"
                >
                  <Icon className="mt-0.5 size-4 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="block font-medium">{entry.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {entry.description}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
