import { site } from "@/data";

export const socialCardSize = { width: 1200, height: 630 };

export function SocialCard({
  eyebrow,
  title,
  description,
  accent = "#f97316",
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#171310", color: "#faf7f2", padding: "72px", fontFamily: "sans-serif", border: `12px solid ${accent}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3 }}>
        <span>{"<"}</span><span>{eyebrow}</span><span>{"/>"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ fontSize: title.length > 55 ? 56 : 68, lineHeight: 1.05, fontWeight: 800, letterSpacing: -2 }}>{title}</div>
        <div style={{ maxWidth: 960, fontSize: 28, lineHeight: 1.35, color: "#c9c0b7" }}>{description}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#a89e95" }}>
        <span>{site.name}</span><span>{new URL(site.url).host}</span>
      </div>
    </div>
  );
}
