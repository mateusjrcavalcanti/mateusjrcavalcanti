"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function renderDiagram() {
      try {
        await document.fonts.ready;
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
          themeCSS: ".labelBkg { padding: 0 6px !important; }",
        });
        const result = await mermaid.render(`mermaid-${id}`, chart);

        if (active) {
          setSvg(result.svg);
          setError(false);
        }
      } catch {
        if (active) {
          setError(true);
        }
      }
    }

    renderDiagram();

    return () => {
      active = false;
    };
  }, [chart, id, resolvedTheme]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-xl border border-border bg-secondary/60 p-4">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return <div className="h-48 animate-pulse rounded-xl bg-secondary/60" aria-label="Carregando diagrama" />;
  }

  return (
    <div
      className="mermaid-diagram flex w-full justify-center overflow-x-auto rounded-xl bg-background p-4 [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
