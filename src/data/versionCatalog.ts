import versionsData from '@/data/versions.json';
import { INDEXABLE_INSTALL_VERSIONS } from '@/data/indexing';

type BaseVersion = (typeof versionsData)[number];
export type VersionCatalogEntry = BaseVersion & {
  verified: boolean;
  indexable: boolean;
};

const makeCurrentVersion = (mcVersion: string, dhVersion: string, releaseDate: string): BaseVersion => ({
  mcVersion,
  dhVersion,
  releaseDate,
  stability: 'stable',
  loaders: {
    fabric: {
      dependencies: [],
      downloadUrl: `https://modrinth.com/mod/distanthorizons/versions?g=${mcVersion}&l=fabric`,
    },
    neoforge: {
      dependencies: [],
      downloadUrl: `https://modrinth.com/mod/distanthorizons/versions?g=${mcVersion}&l=neoforge`,
    },
  },
});

const additionalVersions: BaseVersion[] = [
  ...['26.3', '26.2', '26.1.2'].map((version) => makeCurrentVersion(version, '3.3.0', '2026-09-17')),
  ...['1.21.10', '1.21.9', '1.21.8', '1.21.6', '1.21.3'].map((version) => makeCurrentVersion(version, '3.3.1', '2026-09-18')),
];

const versionCatalog: VersionCatalogEntry[] = [...additionalVersions, ...versionsData].map((sourceVersion) => {
  const version = sourceVersion.mcVersion === '1.20.6'
    ? { ...sourceVersion, loaders: { ...sourceVersion.loaders, neoforge: { ...sourceVersion.loaders.neoforge, downloadUrl: 'https://modrinth.com/mod/distanthorizons/versions?g=1.20.6&l=neoforge' } } }
    : sourceVersion;
  const indexable = INDEXABLE_INSTALL_VERSIONS.has(version.mcVersion);
  return { ...version, verified: indexable, indexable };
});

export default versionCatalog;

export function getLoaderLabel(mcVersion: string, loader: 'fabric' | 'neoforge') {
  if (loader === 'fabric') return 'Fabric';
  return ['1.20.4', '1.20.2', '1.20.1', '1.19.4', '1.19.2', '1.18.2', '1.17.1', '1.16.5'].includes(mcVersion) ? 'Forge' : 'NeoForge';
}
