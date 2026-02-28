import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Distant Horizons Guide — Minecraft LOD Mod Resource",
    template: "%s | Distant Horizons Guide",
  },
  description:
    "The ultimate Distant Horizons guide. Shader compatibility database, config generator, installation walkthrough for Fabric & NeoForge, and community FAQ.",
  authors: [{ name: "DistantHorizonsGuide.com" }],
  creator: "DistantHorizonsGuide.com",
  metadataBase: new URL("https://distanthorizonsguide.com"),
  alternates: {
    canonical: "https://distanthorizonsguide.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://distanthorizonsguide.com",
    siteName: "Distant Horizons Guide",
    title: "Distant Horizons Guide — Minecraft LOD Mod",
    description:
      "Shader compatibility database, config generator, install guides, and community FAQ for the Distant Horizons Minecraft mod.",
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
    title: "Distant Horizons Guide — Minecraft LOD Mod",
    description:
      "Shader compatibility, config generator, install guides & FAQ for the Distant Horizons mod.",
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
    "The ultimate resource for the Distant Horizons Minecraft mod — shader compatibility, config generator, installation guides, and FAQ.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://distanthorizonsguide.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
  softwareVersion: "2.3.0",
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-89V8QD3P9T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-89V8QD3P9T');
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
