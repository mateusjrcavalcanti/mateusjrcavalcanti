import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { contact, getSiteAssetUrl, site } from "@/data";
import { getSearchEntries } from "@/lib/content/search";
import { absoluteUrl, routes } from "@/lib/routes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: site.titleTemplate,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: site.url,
    types: {
      "application/rss+xml": absoluteUrl(site.url, routes.feed),
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: getSiteAssetUrl(routes.siteImage),
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.twitterHandle,
    images: [getSiteAssetUrl(routes.siteImage)],
  },
  icons: {
    icon: [
      { url: getSiteAssetUrl("/favicon.ico") },
      { url: getSiteAssetUrl("/logo.svg"), type: "image/svg+xml" },
    ],
    shortcut: getSiteAssetUrl("/favicon.ico"),
    apple: getSiteAssetUrl("/short/logo.png"),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: site.alternateName,
      url: site.url,
      image: getSiteAssetUrl("/logo.png"),
      jobTitle: site.jobTitle,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: site.university,
      },
      sameAs: [contact.github, contact.linkedin],
      knowsAbout: site.keywords.slice(4),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: site.locale,
      publisher: {
        "@id": `${site.url}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchEntries = getSearchEntries();

  return (
    <html
      lang={site.locale}
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CommandPalette entries={searchEntries} />
        </ThemeProvider>
      </body>
    </html>
  );
}
