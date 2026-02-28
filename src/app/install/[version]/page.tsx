import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InstallHub from '@/components/InstallHub';
import versionsData from '@/data/versions.json';
import Link from 'next/link';

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
        title: `Install DH for MC ${mcVersion}`,
        description: `Step-by-step guide to install Distant Horizons ${vData.dhVersion} on Minecraft ${mcVersion}. Download links, dependencies, and setup for Fabric and NeoForge.`,
        alternates: {
            canonical: `https://distanthorizonsguide.com/install/${version}`,
        },
        openGraph: {
            title: `Install Distant Horizons for Minecraft ${mcVersion}`,
            description: `Download and install DH ${vData.dhVersion} on MC ${mcVersion} with Fabric or NeoForge.`,
        },
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
                <InstallHub initialVersion={mcVersion} />

                {/* Other versions + internal links */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="glass rounded-2xl p-6">
                        <h3 className="font-semibold text-foreground mb-3 text-center">Other Minecraft Versions</h3>
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {versionsData.map((v) => (
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
                    </div>
                </div>
            </div>
        </>
    );
}
