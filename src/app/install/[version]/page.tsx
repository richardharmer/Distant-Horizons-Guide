import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InstallHub from '@/components/InstallHub';
import versionsData, { getLoaderLabel } from '@/data/versionCatalog';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

const validVersions = versionsData.map((v) => v.mcVersion.replace(/\./g, '-'));

interface Props {
    params: Promise<{ version: string }>;
}

export async function generateStaticParams() {
    return validVersions.map((v) => ({ version: v }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { version } = await params;
    const mcVersion = version.replace(/-/g, '.');
    const vData = versionsData.find((v) => v.mcVersion === mcVersion);
    if (!vData) return {};

    return {
        title: `Distant Horizons ${mcVersion} Install Guide | Fabric & NeoForge`,
        description: `Step-by-step guide to install Distant Horizons ${vData.dhVersion} on Minecraft ${mcVersion}. Download links, dependencies, and setup for Fabric and NeoForge.`,
        robots: vData.indexable ? undefined : { index: false, follow: true },
        alternates: {
            canonical: `https://distanthorizonsguide.com/install/${version}`,
        },
        ...socialMetadata(
            `Install Distant Horizons for Minecraft ${mcVersion}`,
            `Download and install DH ${vData.dhVersion} on MC ${mcVersion} with Fabric or NeoForge.`,
            `/install/${version}`,
        ),
    };
}

function HowToSchema({ mcVersion, dhVersion }: { mcVersion: string; dhVersion: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to Install Distant Horizons ${dhVersion} for Minecraft ${mcVersion}`,
        description: `Step-by-step guide to install the Distant Horizons LOD mod on Minecraft ${mcVersion}.`,
        step: [
            { '@type': 'HowToStep', name: 'Install Mod Loader', text: 'Install Fabric Loader or NeoForge for your Minecraft version.' },
            { '@type': 'HowToStep', name: 'Download Dependencies', text: 'Download Fabric API (for Fabric) and place it in your mods folder.' },
            { '@type': 'HowToStep', name: 'Download Distant Horizons', text: `Download Distant Horizons ${dhVersion} from Modrinth.` },
            { '@type': 'HowToStep', name: 'Install the Mod', text: 'Place the DH .jar file in your .minecraft/mods folder.' },
            { '@type': 'HowToStep', name: 'Install Performance Mods', text: 'Install Sodium and Iris (Fabric) or Embeddium and Oculus (NeoForge).' },
            { '@type': 'HowToStep', name: 'Launch and Enjoy', text: 'Launch Minecraft with your mod loader profile and enjoy infinite horizons!' },
        ],
    };
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}

export default async function InstallVersionPage({ params }: Props) {
    const { version } = await params;
    const mcVersion = version.replace(/-/g, '.');
    const vData = versionsData.find((v) => v.mcVersion === mcVersion);

    if (!vData) notFound();

    return (
        <>
            <HowToSchema mcVersion={mcVersion} dhVersion={vData.dhVersion} />
            <div className="pt-20">
                <section className="pt-12 pb-2">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Install Distant Horizons for Minecraft {mcVersion}</h1>
                        <p className="text-lg text-text-muted leading-relaxed max-w-3xl">Choose Fabric or {getLoaderLabel(mcVersion, 'neoforge')} below, then use the official version filter to confirm the exact Distant Horizons file before downloading.</p>
                        {!vData.verified && <p className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">This legacy version page is kept for existing visitors, but its dependency list has not been re-verified for the current DH release. Confirm every file on the official project page.</p>}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <a href="#install" className="btn-primary !py-2.5">Choose loader and dependencies</a>
                            <a href={siteConfig.officialModrinthUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2.5">Open official files</a>
                        </div>
                    </div>
                </section>
                <InstallHub initialVersion={mcVersion} />

                {/* Other versions + internal links */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="glass rounded-2xl p-6">
                        <h3 className="font-semibold text-foreground mb-3 text-center">Other Minecraft Versions</h3>
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {versionsData.filter((v) => v.indexable).map((v) => (
                                <Link
                                    key={v.mcVersion}
                                    href={`/install/${v.mcVersion.replace(/\./g, '-')}`}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${v.mcVersion === mcVersion
                                        ? 'bg-primary/15 text-primary border border-primary/30'
                                        : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                        }`}
                                >
                                    {v.mcVersion}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/shaders" className="btn-secondary !py-2 !px-5 text-sm">
                                Find Compatible Shaders →
                            </Link>
                            <Link href="/calculator" className="btn-secondary !py-2 !px-5 text-sm">
                                Optimize Settings →
                            </Link>
                        </div>
                        <p className="mt-5 text-center text-sm text-text-dim">Loader choices are consolidated on this page so version, dependency, and safety notes stay in one place.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
