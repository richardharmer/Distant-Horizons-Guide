import { readFileSync } from 'node:fs';

const sitemap = readFileSync(new URL('../out/sitemap.xml', import.meta.url), 'utf8');
const redirects = readFileSync(new URL('../out/_redirects', import.meta.url), 'utf8');

const forbiddenSitemapFragments = [
  '/install/1-21-11/fabric',
  '/install/1-21-11/neoforge',
  '/guides/distant-horizons-lod-not-generating',
  '/guides/distant-horizons-high-cpu-usage',
  '/guides/distant-horizons-out-of-memory',
  '/guides/distant-horizons-garbage-collector',
  '/guides/distant-horizons-wrong-dimension',
  '/guides/distant-horizons-dependencies',
  '/shaders/flavor',
];

for (const fragment of forbiddenSitemapFragments) {
  if (sitemap.includes(fragment)) throw new Error(`Sitemap still contains consolidated or noindex URL: ${fragment}`);
}

const requiredSitemapFragments = [
  '<loc>https://distanthorizonsguide.com</loc>',
  '/install/1-21-11</loc>',
  '/shaders/complementary-reimagined</loc>',
  '/guides/distant-horizons-low-fps</loc>',
  '/editorial-policy</loc>',
  '/testing-methodology</loc>',
  '/corrections</loc>',
];

for (const fragment of requiredSitemapFragments) {
  if (!sitemap.includes(fragment)) throw new Error(`Sitemap missing retained URL: ${fragment}`);
}

if (!redirects.includes('/install/:version/fabric /install/:version 301')) {
  throw new Error('Cloudflare install redirect rule is missing');
}
console.log('Sitemap and Cloudflare redirect checks passed.');
