import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
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
  metadataBase: new URL("https://distanthorizonsguide.com"),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://distanthorizonsguide.com",
    siteName: "Distant Horizons Guide",
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
        {/* Google AdSense — enables Auto ads across the entire site */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6600426197600184"
          crossOrigin="anonymous"
        />

        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vozzwftmwa");
            `,
          }}
        />

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
      <body className="antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
