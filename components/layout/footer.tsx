import { Coffee, Contact as Linkedin } from "lucide-react";
import Link from "next/link";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { contact, site } from "@/data";

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`border-t border-border/30 bg-background py-16 print:hidden ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          <Link href="/#hero" className="text-2xl font-bold tracking-tight">
            <span className="text-primary">&lt;</span>
            {site.brand}
            <span className="text-primary">/&gt;</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-secondary/50 p-3 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-secondary/50 p-3 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {site.footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.featured ? "hover:text-primary" : "hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              {site.footerBuiltWithPrefix}{" "}
              <Coffee className="size-4 text-primary" /> {site.footerBuiltWith}
            </p>
            <span>
              {site.copyrightYear} {site.name}. {site.copyrightLabel}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
