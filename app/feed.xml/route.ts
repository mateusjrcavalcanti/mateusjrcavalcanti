import { site } from "@/data";
import { getBlogPostMetadata } from "@/lib/content/posts";
import { absoluteUrl, blogPostPath, routes } from "@/lib/routes";

export const dynamic = "force-static";

function xml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;",
  })[character] ?? character);
}

export function GET() {
  const posts = getBlogPostMetadata();
  const items = posts.map((post) => `
    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(absoluteUrl(site.url, blogPostPath(post.slug)))}</link>
      <guid isPermaLink="true">${xml(absoluteUrl(site.url, blogPostPath(post.slug)))}</guid>
      <description>${xml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${xml(tag)}</category>`).join("")}
    </item>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.title)}</title>
    <link>${xml(site.url)}</link>
    <description>${xml(site.description)}</description>
    <language>${site.locale}</language>
    <atom:link href="${xml(absoluteUrl(site.url, routes.feed))}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
