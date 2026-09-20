import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ConsentScripts from "@/components/ConsentScripts";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: "Distant Horizons Mod for Minecraft — Guide, Shaders & Settings",
    template: "%s | Distant Horizons Guide",
  },
  description:
    "Complete Distant Horizons mod guide for Minecraft: install Fabric or NeoForge, find compatible shaders, generate best settings, and fix LOD problems.",
  authors: [{ name: "DistantHorizonsGuide.com" }],
  creator: "DistantHorizonsGuide.com",
  other: {
    "google-adsense-account": "ca-pub-6600426197600184",
  },
  metadataBase: new URL("https://distanthorizonsguide.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Distant Horizons Guide",
    url: siteConfig.url,
    title: "Distant Horizons Mod for Minecraft — Guide, Shaders & Settings",
    description:
      "Install the Distant Horizons Minecraft mod, check Fabric and NeoForge compatibility, find shaders, generate settings, and fix common LOD problems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Distant Horizons Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distant Horizons Mod for Minecraft — Guide, Shaders & Settings",
    description:
      "Distant Horizons mod installation, shaders, best settings, and troubleshooting for Minecraft.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Distant Horizons Guide",
  url: "https://distanthorizonsguide.com",
  description:
    "Independent Distant Horizons installation, settings, shader compatibility, and troubleshooting guidance.",
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Distant Horizons",
  operatingSystem: "Windows, macOS, Linux",
  applicationCategory: "GameApplication",
  applicationSubCategory: "Minecraft Mod",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  downloadUrl: "https://modrinth.com/mod/distanthorizons",
  softwareVersion: siteConfig.currentRelease,
  description:
    "A Minecraft mod that adds a Level of Detail (LOD) system, rendering simplified terrain beyond the normal render distance for up to 512+ chunks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Consent defaults run before any optional analytics script. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
        <ConsentScripts />
      </body>
    </html>
  );
}
