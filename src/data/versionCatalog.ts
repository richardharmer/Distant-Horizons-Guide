import releaseEvidence from '@/data/releaseEvidence.json';

export function getLoaderLabel(mcVersion: string, loader: 'fabric' | 'neoforge') {
  if (loader === 'fabric') return 'Fabric';
  return ['1.20.4', '1.20.2', '1.20.1', '1.19.4', '1.19.2', '1.18.2', '1.17.1', '1.16.5'].includes(mcVersion) ? 'Forge' : 'NeoForge';
}

const versionCatalog = releaseEvidence.map((evidence) => {
  const buildLoader = (routeLoader: 'fabric' | 'neoforge') => {
    const loader = getLoaderLabel(evidence.mcVersion, routeLoader).toLowerCase();
    const available = evidence.loaders.includes(loader);
    const modernIris = loader === 'fabric' || (loader === 'neoforge' && (evidence.mcVersion.startsWith('26.') || evidence.mcVersion.startsWith('1.21')));
    const dependencies = available && modernIris ? [
      { name: 'Sodium', url: 'https://modrinth.com/mod/sodium', required: false, note: 'Optional renderer, not a declared dependency in this DH release record. Match the Minecraft version and loader.' },
      { name: 'Iris Shaders', url: 'https://modrinth.com/mod/iris', required: false, note: 'Optional shader loader. Match its own Sodium requirement and choose a shader that explicitly supports DH. This combination was not tested here.' },
    ] : [];
    return { dependencies, downloadUrl: available ? evidence.sourceUrl : '' };
  };
  return { ...evidence, verified: true, indexable: true, loaders: { fabric: buildLoader('fabric'), neoforge: buildLoader('neoforge') } };
});
export type VersionCatalogEntry = (typeof versionCatalog)[number];
export default versionCatalog;
