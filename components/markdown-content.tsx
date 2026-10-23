/* eslint-disable @next/next/no-img-element */
import { isValidElement, type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { withBasePath } from "@/data";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { CodeBlock } from "@/components/code-block";

function markdownElementProps<T extends object>(props: T) {
  const elementProps = { ...props } as T & { node?: unknown };
  delete elementProps.node;
  return elementProps;
}

function MarkdownLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http://") || href.startsWith("https://");
  const resolvedHref = href.startsWith("/")
    ? withBasePath(href as `/${string}`)
    : href;
  return (
    <a
      href={resolvedHref}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
      {...markdownElementProps(props)}
    />
  );
}

function MarkdownImage({ src = "", alt = "" }: ComponentPropsWithoutRef<"img">) {
  const isBadge =
    typeof src === "string" && src.startsWith("https://img.shields.io/");
  const resolvedSource =
    typeof src === "string" && src.startsWith("/")
      ? withBasePath(src as `/${string}`)
      : src;

  return (
    <img
      src={resolvedSource}
      alt={alt}
      loading="lazy"
      data-badge={isBadge || undefined}
      className={
        isBadge
          ? "inline-block h-7 w-auto align-middle"
          : "block max-w-full rounded-lg"
      }
    />
  );
}

function MarkdownCode({ className, children, ...props }: ComponentPropsWithoutRef<"code">) {
  if (className === "language-mermaid") {
    return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
  }

  return <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground" {...markdownElementProps(props)}>{children}</code>;
}

function MarkdownPre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const isMermaid = isValidElement<{ className?: string }>(children)
    && children.props.className === "language-mermaid";

  return isMermaid
    ? children
    : <CodeBlock code={extractText(children)}><span {...markdownElementProps(props)}>{children}</span></CodeBlock>;
}

function extractText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(extractText).join("");
  if (isValidElement<{ children?: unknown }>(value)) return extractText(value.props.children);
  return "";
}

export function MarkdownContent({ source }: { source: string }) {
  return (
    <div className="markdown-content space-y-5 text-sm leading-7 text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          h1: () => null,
          h2: (props) => <h2 className="pt-3 text-2xl font-bold text-foreground" {...markdownElementProps(props)} />,
          h3: (props) => <h3 className="text-lg font-bold text-foreground" {...markdownElementProps(props)} />,
          p: (props) => <p {...markdownElementProps(props)} />,
          a: MarkdownLink,
          img: MarkdownImage,
          blockquote: (props) => <blockquote className="border-l-4 border-primary pl-5 text-base italic" {...markdownElementProps(props)} />,
          ul: (props) => <ul className="list-disc space-y-2 pl-6" {...markdownElementProps(props)} />,
          ol: (props) => <ol className="list-decimal space-y-2 pl-6" {...markdownElementProps(props)} />,
          li: (props) => <li className="pl-1" {...markdownElementProps(props)} />,
          table: (props) => <div className="overflow-x-auto"><table className="w-full border-collapse text-left" {...markdownElementProps(props)} /></div>,
          th: (props) => <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground" {...markdownElementProps(props)} />,
          td: (props) => <td className="border border-border px-3 py-2" {...markdownElementProps(props)} />,
          code: MarkdownCode,
          pre: MarkdownPre,
          hr: () => <hr className="border-border/60" />,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
