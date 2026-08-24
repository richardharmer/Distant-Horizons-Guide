import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import InstallHub from '@/components/InstallHub';
import versionsData, { getLoaderLabel } from '@/data/versionCatalog';
import { siteConfig } from '@/data/site';

interface Props { params: Promise<{ version: string; loader: string }> }
const loaders = ['fabric', 'neoforge'] as const;
const validVersions = versionsData.map((version) => version.mcVersion.replace(/\./g, '-'));

export function generateStaticParams() {
  return validVersions.flatMap((version) => loaders.map((loader) => ({ version, loader })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { version, loader } = await params;
  const mcVersion = version.replace(/-/g, '.');
  const data = versionsData.find((entry) => entry.mcVersion === mcVersion);
  if (!data || !loaders.includes(loader as typeof loaders[number])) return {};
  const loaderName = getLoaderLabel(mcVersion, loader as 'fabric' | 'neoforge');
  const title = `Install Distant Horizons ${mcVersion} on ${loaderName}`;
  return {
    title,
    description: `Step-by-step Distant Horizons installation for Minecraft ${mcVersion} with ${loaderName}: downloads, dependencies, settings, and compatibility checks.`,
    alternates: { canonical: `${siteConfig.url}/install/${version}/${loader}` },
    openGraph: { title, description: `Install DH for Minecraft ${mcVersion} using ${loaderName}.` },
  };
}

export default async function VersionLoaderPage({ params }: Props) {
  const { version, loader } = await params;
  const mcVersion = version.replace(/-/g, '.');
  if (!versionsData.some((entry) => entry.mcVersion === mcVersion) || !loaders.includes(loader as typeof loaders[number])) notFound();
  const loaderName = getLoaderLabel(mcVersion, loader as 'fabric' | 'neoforge');
  const schema = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: `How to install Distant Horizons on Minecraft ${mcVersion} with ${loaderName}`,
    description: `Version-specific Distant Horizons installation guide for Minecraft ${mcVersion} and ${loaderName}.`,
    step: ['Install the loader', 'Download Distant Horizons', 'Install dependencies', 'Launch Minecraft and verify DH'].map((name) => ({ '@type': 'HowToStep', name })),
  };
  const alternateLabel = getLoaderLabel(mcVersion, loader === 'fabric' ? 'neoforge' : 'fabric');
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="pt-20"><section className="pt-12 pb-2"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Install Distant Horizons {mcVersion} with {loaderName}</h1><p className="text-lg text-text-muted leading-relaxed max-w-3xl">This is the {loaderName} path for Minecraft {mcVersion}. Download files that match this exact version, launch the base loader once, then add Distant Horizons before adding performance mods or shaders.</p><p className="text-sm text-text-dim mt-4">If your modpack requires a different loader, return to the version overview rather than mixing rendering stacks.</p></div></section><InstallHub initialVersion={mcVersion} initialLoader={loader as 'fabric' | 'neoforge'} /><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"><div className="glass rounded-2xl p-6 text-center"><p className="text-sm text-text-muted mb-4">Need another setup?</p><div className="flex flex-wrap gap-3 justify-center"><Link href={`/install/${version}`} className="btn-secondary !py-2 !px-5 text-sm">Version overview</Link><Link href={`/install/${version}/fabric`} className="btn-secondary !py-2 !px-5 text-sm">Fabric guide</Link><Link href={`/install/${version}/neoforge`} className="btn-secondary !py-2 !px-5 text-sm">{alternateLabel} guide</Link><Link href="/guides" className="btn-secondary !py-2 !px-5 text-sm">Troubleshooting guides</Link></div></div></div></div></>;
}
