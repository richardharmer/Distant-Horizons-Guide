import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url).pathname;
const sitemap = readFileSync(join(root, 'out/sitemap.xml'), 'utf8');
const baseline = JSON.parse(readFileSync(join(root, 'scripts/seo-baseline.json'), 'utf8'));
const releaseRecords = JSON.parse(readFileSync(join(root, 'src/data/releaseEvidence.json'), 'utf8'));
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
const htmlPath = (url) => {
  const path = new URL(url).pathname.replace(/\/$/, '');
  return join(root, 'out', path ? `${path}.html` : 'index.html');
};
for (const url of urls) {
  const file = htmlPath(url);
  assert(existsSync(file), `Missing export for sitemap URL ${url}`);
  const html = readFileSync(file, 'utf8');
  assert(html.includes(`rel="canonical" href="${url}"`), `Sitemap/canonical conflict: ${url}`);
  assert(!/<meta[^>]*(?:name="(?:robots|googlebot)"[^>]*content="[^"]*noindex|content="[^"]*noindex[^>]*name="(?:robots|googlebot)")/i.test(html), `Noindex in sitemap: ${url}`);
}
for (const [path, expected] of Object.entries(baseline)) {
  const html = readFileSync(join(root, 'out', path), 'utf8');
  assert(html.includes(`rel="canonical" href="${expected.canonical}"`), `Canonical changed: ${path}`);
  assert.equal(html.match(/<title>(.*?)<\/title>/)?.[1], expected.title, `Search title changed: ${path}`);
  assert(!/<meta[^>]*content="[^"]*noindex/i.test(html), `Existing landing page unexpectedly noindexed: ${path}`);
  assert(urls.includes(expected.canonical), `Existing canonical missing from sitemap: ${path}`);
}
for (const record of releaseRecords) {
  const html = readFileSync(htmlPath(`https://distanthorizonsguide.com/install/${record.mcVersion.replaceAll('.', '-')}`), 'utf8');
  assert(html.includes(record.sourceUrl), `Release evidence missing: ${record.mcVersion}`);
  assert(html.includes(record.versionNumber), `Release build missing: ${record.mcVersion}`);
  assert.equal(record.dependencies.length, 0, 'Dependency renderer must be updated if official requirements change');
}
const shaderFiles = JSON.parse(readFileSync(join(root, 'src/data/shaders.json'), 'utf8'));
for (const shader of shaderFiles) {
  const html = readFileSync(htmlPath(`https://distanthorizonsguide.com/shaders/${shader.slug}`), 'utf8');
  assert(html.includes('In-game test: not performed'), `Missing test scope for ${shader.slug}`);
  assert(!html.includes('2025-12') && !html.includes('2.3+'), `Unsupported legacy compatibility evidence: ${shader.slug}`);
  if (shader.sourceUrl) assert(html.includes(shader.sourceUrl), `Missing author source: ${shader.slug}`);
}
for (const path of ['index.html', 'calculator.html', 'shaders.html', 'shaders/bsl-shaders.html', 'guides/distant-horizons-low-fps.html', 'install/26-3/fabric.html']) {
  const html = readFileSync(join(root, 'out', path), 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one main H1: ${path}`);
}
console.log(`SEO checks passed: ${urls.length} sitemap URLs; ${Object.keys(baseline).length} existing titles/canonicals preserved; ${releaseRecords.length} release records and ${shaderFiles.length} source-scoped shader pages.`);
const redirects = readFileSync(join(root, 'public/_redirects'), 'utf8').split('\n').filter((line) => line && !line.startsWith('#'));
const existingPaths = new Set(Object.values(baseline).map(({ canonical }) => new URL(canonical).pathname));
for (const line of redirects) {
  const [source, target, code] = line.split(/\s+/);
  assert(!existingPaths.has(source), `Redirect would remove an existing landing page: ${source}`);
  assert(existingPaths.has(target), `Redirect target is not an existing canonical: ${target}`);
  assert.equal(code, '301');
}
console.log(`${redirects.length} exact typo redirects checked; no existing landing page is redirected.`);
