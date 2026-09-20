import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../out/index.html', import.meta.url), 'utf8');

const expectations = [
  ['title', '<title>Distant Horizons Mod for Minecraft — Guide, Shaders &amp; Settings</title>'],
  ['description', 'content="Complete Distant Horizons mod guide for Minecraft: install Fabric or NeoForge, find compatible shaders, generate best settings, and fix LOD problems."'],
  ['canonical', 'rel="canonical" href="https://distanthorizonsguide.com"'],
  ['Open Graph title', 'property="og:title" content="Distant Horizons Mod for Minecraft — Guide, Shaders &amp; Settings"'],
  ['Open Graph description', 'property="og:description" content="Install the Distant Horizons Minecraft mod, check Fabric and NeoForge compatibility, find shaders, generate settings, and fix common LOD problems."'],
  ['Twitter title', 'name="twitter:title" content="Distant Horizons Mod for Minecraft — Guide, Shaders &amp; Settings"'],
  ['Twitter description', 'name="twitter:description" content="Distant Horizons mod installation, shaders, best settings, and troubleshooting for Minecraft."'],
  ['robots', 'name="robots" content="index, follow'],
];

for (const [label, value] of expectations) {
  if (!html.includes(value)) throw new Error(`Homepage SEO regression: missing ${label}`);
}

const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

const expectedH1 = 'Distant Horizons Mod for Minecraft Guide, Shaders, Settings & Troubleshooting';
if (h1 !== expectedH1) {
  throw new Error(`Homepage H1 regression: expected "${expectedH1}", received "${h1}"`);
}

console.log('Homepage SEO regression check passed.');
