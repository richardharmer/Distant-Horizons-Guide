import versionsData from '@/data/versions.json';

type BaseVersion = (typeof versionsData)[number];

const makeCurrentVersion = (mcVersion: string): BaseVersion => ({
  mcVersion,
  dhVersion: '3.2.0-b',
  releaseDate: '2026-07',
  stability: 'beta',
  loaders: {
    fabric: {
      ...versionsData[0].loaders.fabric,
      downloadUrl: `https://modrinth.com/mod/distanthorizons/versions?g=${mcVersion}&l=fabric`,
    },
    neoforge: {
      ...versionsData[0].loaders.neoforge,
      downloadUrl: `https://modrinth.com/mod/distanthorizons/versions?g=${mcVersion}&l=neoforge`,
    },
  },
});

const additionalVersions: BaseVersion[] = ['26.2', '26.1.2', '1.21.10', '1.21.9', '1.21.8', '1.21.6', '1.21.3'].map(makeCurrentVersion);

const versionCatalog = [...additionalVersions, ...versionsData].map((version) => {
  if (version.mcVersion !== '1.20.6') return version;
  return { ...version, loaders: { ...version.loaders, neoforge: { ...version.loaders.neoforge, downloadUrl: 'https://modrinth.com/mod/distanthorizons/versions?g=1.20.6&l=neoforge' } } };
});

export default versionCatalog;

export function getLoaderLabel(mcVersion: string, loader: 'fabric' | 'neoforge') {
  if (loader === 'fabric') return 'Fabric';
  return ['1.20.4', '1.20.2', '1.20.1', '1.19.4', '1.19.2', '1.18.2', '1.17.1', '1.16.5'].includes(mcVersion) ? 'Forge' : 'NeoForge';
}
