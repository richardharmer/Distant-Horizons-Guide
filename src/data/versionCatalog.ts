import versionsData from '@/data/versions.json';

type BaseVersion = (typeof versionsData)[number];

const additionalVersions: BaseVersion[] = ['1.21.10', '1.21.9', '1.21.8', '1.21.6', '1.21.3'].map((mcVersion) => ({
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
}));

const versionCatalog = [...additionalVersions, ...versionsData];

export default versionCatalog;
