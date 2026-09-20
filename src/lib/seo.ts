import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

const ogImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Distant Horizons Guide',
};

export function socialMetadata(
  title: string,
  description: string,
  path: string,
  type: 'website' | 'article' = 'website',
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;
  return {
    openGraph: {
      type,
      locale: 'en_US',
      url,
      siteName: 'Distant Horizons Guide',
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
