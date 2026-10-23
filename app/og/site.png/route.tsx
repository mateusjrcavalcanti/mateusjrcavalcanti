import { ImageResponse } from "next/og";
import { SocialCard, socialCardSize } from "@/components/social-card";
import { site } from "@/data";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<SocialCard eyebrow="Portfólio" title={site.title} description={site.description} />, socialCardSize);
}
