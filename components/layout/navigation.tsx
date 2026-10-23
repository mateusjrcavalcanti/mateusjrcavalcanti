"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { searchOpenEvent } from "@/components/command-palette";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { contact, site, type SectionConfig } from "@/data";
import { useActiveSection } from "./use-active-section";

const subscribeToHydration = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
}

function sectionColor(sections: SectionConfig[], id: string) {
  return sections.find((section) => section.id === id)?.color ?? "#f97316";
}

export function Navigation({ data }: { data: SectionConfig[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(data);
  const [projectsColor, setProjectsColor] = useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const items = site.navigation.filter((item) =>
    data.some((section) => section.id === item.sectionId),
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onColor = (event: Event) =>
      setProjectsColor((event as CustomEvent<{ color: string }>).detail.color);
    window.addEventListener("active-section-color-change", onColor);
    return () =>
      window.removeEventListener("active-section-color-change", onColor);
  }, []);

  const colorFor = (id: string) =>
    id === "projetos" && projectsColor ? projectsColor : sectionColor(data, id);
  const activeColor = colorFor(activeSection);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 print:hidden ${isScrolled ? "border-b border-border/50 bg-background/60 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/#hero" className="text-xl font-bold tracking-tight">
            <span style={{ color: activeColor }}>&lt;</span>
            {site.brand}
            <span style={{ color: activeColor }}>/&gt;</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <Link
                key={item.sectionId}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color:
                    activeSection === item.sectionId
                      ? colorFor(item.sectionId)
                      : undefined,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span
              className="px-2 text-xs font-medium text-muted-foreground"
              aria-label={`Idioma do site: ${site.locale}`}
            >
              {site.languageLabel}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-full border-border/60 bg-background/50 px-2.5 text-xs font-normal text-muted-foreground"
              onClick={() => window.dispatchEvent(new Event(searchOpenEvent))}
              aria-label="Buscar no site"
            >
              <Search className="size-3.5" />
              <span className="hidden lg:inline">{site.searchLabel}</span>
              <kbd className="hidden h-5 items-center rounded border border-border/60 bg-muted px-1.5 font-mono text-[10px] lg:inline-flex">
                ⌘K
              </kbd>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="h-9 w-9 rounded-full"
              style={{ color: activeColor }}
              aria-label={site.themeToggleLabel}
            >
              {hydrated && resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <Button
              render={
                <a href={contact.github} target="_blank" rel="noreferrer" />
              }
              nativeButton={false}
              size="sm"
              className="font-semibold text-white"
              style={{ backgroundColor: activeColor }}
            >
              {site.sourceLabel}
            </Button>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.dispatchEvent(new Event(searchOpenEvent))}
              className="h-9 w-9 rounded-full"
              aria-label="Buscar no site"
            >
              <Search className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="h-9 w-9 rounded-full"
              aria-label={site.themeToggleLabel}
            >
              {hydrated && resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <button
              className="p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={site.menuToggleLabel}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="rounded-b-2xl border-t border-border/50 bg-background/95 py-4 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/#hero"
                className="rounded-xl px-4 py-3 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {site.homeLabel}
              </Link>
              {items.map((item) => (
                <Link
                  key={item.sectionId}
                  href={item.href}
                  className="rounded-xl px-4 py-3 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="mx-4 mt-2 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white"
                style={{ backgroundColor: activeColor }}
              >
                <Github className="size-4" />
                {site.sourceLabel}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
