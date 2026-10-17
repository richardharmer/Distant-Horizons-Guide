import { readFile, writeFile } from 'node:fs/promises';
const checkedAt = process.argv.find((arg) => arg.startsWith('--checked-at='))?.split('=')[1];
if (!checkedAt || !/^\d{4}-\d{2}-\d{2}$/.test(checkedAt)) throw new Error('Supply the source-review date: --checked-at=YYYY-MM-DD');
const file = new URL('../src/data/releaseEvidence.json', import.meta.url);
const previous = JSON.parse(await readFile(file, 'utf8'));
const response = await fetch('https://api.modrinth.com/v2/project/distanthorizons/version', { headers: { 'User-Agent': 'DistantHorizonsGuide-source-review/1.0 (https://distanthorizonsguide.com/contact)' } });
if (!response.ok) throw new Error(`Modrinth returned ${response.status}; existing evidence was not changed`);
const versions = await response.json();
if (!Array.isArray(versions)) throw new Error('Unexpected response; evidence was not changed');
const records = previous.map(({ mcVersion }) => {
  const release = versions.filter((entry) => entry.version_type === 'release' && entry.game_versions.includes(mcVersion)).sort((a, b) => b.date_published.localeCompare(a.date_published))[0];
  if (!release) throw new Error(`No stable release for ${mcVersion}; evidence was not changed`);
  if (release.dependencies.length) throw new Error(`Dependencies changed for ${mcVersion}; review the prerequisite UI before updating evidence`);
  return { mcVersion, dhVersion: release.version_number.split(`-${mcVersion}`)[0], versionNumber: release.version_number, releaseDate: release.date_published.slice(0, 10), stability: release.version_type, loaders: release.loaders, dependencies: release.dependencies, sourceUrl: `https://modrinth.com/mod/distanthorizons/version/${release.id}`, sourceApi: `https://api.modrinth.com/v2/version/${release.id}`, checkedAt };
});
await writeFile(file, `${JSON.stringify(records, null, 2)}\n`);
console.log(`Updated ${records.length} release records. Review the diff and homepage example before publishing; this is not an in-game test.`);
