import { readFileSync } from 'node:fs';

const sitemap = readFileSync(new URL('../out/sitemap.xml', import.meta.url), 'utf8');

const requiredSitemapFragments = [
  '<loc>https://distanthorizonsguide.com</loc>',
  '/install/1-21-11</loc>',
  '/install/1-21-11/fabric</loc>',
  '/install/1-21-1/neoforge</loc>',
  '/shaders/complementary-reimagined</loc>',
  '/shaders/solas-shader</loc>',
  '/guides/distant-horizons-low-fps</loc>',
  '/guides/distant-horizons-lod-not-generating</loc>',
  '/guides/distant-horizons-high-cpu-usage</loc>',
  '/guides/distant-horizons-out-of-memory</loc>',
  '/editorial-policy</loc>',
  '/testing-methodology</loc>',
  '/corrections</loc>',
];

for (const fragment of requiredSitemapFragments) {
  if (!sitemap.includes(fragment)) throw new Error(`Sitemap missing indexable URL: ${fragment}`);
}

console.log('Restored sitemap checks passed.');
