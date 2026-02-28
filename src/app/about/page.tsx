import type { Metadata } from 'next';
import Link from 'next/link';
import { Mountain, Download, Eye, Layers, Cpu, Zap, HelpCircle, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'What Is Distant Horizons Mod?',
    description:
        'Distant Horizons is a free Minecraft LOD mod that extends view distance to 512+ chunks. Learn how it works, performance impact, shader support, and how to install.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/about',
    },
    openGraph: {
        title: 'What Is the Distant Horizons Mod for Minecraft?',
        description:
            'Everything you need to know about the Distant Horizons LOD mod — how it works, performance, shaders, and installation.',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is Distant Horizons? The Ultimate Minecraft LOD Mod Explained',
    description:
        'A comprehensive guide to the Distant Horizons mod for Minecraft. Learn about LOD rendering, supported versions, shader compatibility, and optimization.',
    author: { '@type': 'Organization', name: 'DistantHorizonsGuide.com' },
    publisher: { '@type': 'Organization', name: 'DistantHorizonsGuide.com' },
    datePublished: '2025-12-01',
    dateModified: '2026-02-28',
};

const features = [
    {
        icon: Eye,
        title: '512+ Chunk View Distance',
        description:
            'See terrain far beyond the vanilla 32-chunk limit. Mountains, oceans, and forests stretch to the real horizon.',
    },
    {
        icon: Layers,
        title: 'Level of Detail (LOD) System',
        description:
            'Distant terrain renders as simplified LOD chunks, using a fraction of the resources that full-detail chunks would require.',
    },
    {
        icon: Cpu,
        title: 'Background Thread Processing',
        description:
            'LOD chunks are built on separate CPU threads so your main game thread stays fast. Configurable thread count from 1 to 16+.',
    },
    {
        icon: Zap,
        title: 'Minimal FPS Impact',
        description:
            'With proper settings, most mid-range PCs maintain 60+ FPS even at 256-chunk LOD distance. GPU upload is throttled to prevent stuttering.',
    },
];

const comparisons = [
    {
        feature: 'Max View Distance',
        dh: '512+ chunks',
        vanilla: '32 chunks',
        voxy: '256 chunks',
    },
    {
        feature: 'Render Method',
        dh: 'LOD (simplified terrain)',
        vanilla: 'Full detail',
        voxy: 'Voxel-based',
    },
    {
        feature: 'Shader Support',
        dh: '20+ compatible shaders',
        vanilla: 'N/A',
        voxy: 'Limited',
    },
    {
        feature: 'Mod Loaders',
        dh: 'Fabric + NeoForge',
        vanilla: 'N/A',
        voxy: 'Fabric only',
    },
    {
        feature: 'Performance Impact',
        dh: 'Low — Medium',
        vanilla: 'N/A',
        voxy: 'Medium — High',
    },
    {
        feature: 'Server Support',
        dh: 'Client-side (server plugin optional)',
        vanilla: 'N/A',
        voxy: 'Client-side only',
    },
];

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="pt-20">
                {/* Hero */}
                <section className="py-20 sm:py-28 relative">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[200px]" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
                                <Mountain className="w-4 h-4" />
                                The #1 LOD Mod for Minecraft
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
                                What Is the{' '}
                                <span className="gradient-text">Distant Horizons Mod</span>?
                            </h1>
                            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                                Distant Horizons is a free, open-source Minecraft mod that adds a <strong>Level of Detail (LOD)</strong> system,
                                rendering simplified terrain far beyond the normal render distance. See up to <strong>512+ chunks</strong> without
                                destroying your frame rate.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/install/1-21-1" className="btn-primary !py-3 !px-6">
                                <Download className="w-4 h-4" />
                                Install Distant Horizons
                            </Link>
                            <a
                                href="https://modrinth.com/mod/distanthorizons"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary !py-3 !px-6"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View on Modrinth
                            </a>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="py-16 border-t border-border/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                            How Does the <span className="gradient-text">Distant Horizons Mod</span> Work?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <div key={f.title} className="glass rounded-2xl p-6">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                                            <Icon className="w-5 h-5 text-background" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                                        <p className="text-sm text-text-muted leading-relaxed">{f.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Detailed explanation */}
                <section className="py-16 border-t border-border/30">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                            Distant Horizons Explained: The <span className="gradient-text">Complete Guide</span>
                        </h2>

                        <div className="prose-custom space-y-6 text-text-muted leading-relaxed">
                            <p>
                                In vanilla Minecraft, the maximum render distance caps at 32 chunks (about 512 blocks). Beyond that, the world
                                simply fades to void. The <strong>Distant Horizons mod</strong> changes this by adding a Level of Detail (LOD)
                                system that renders simplified versions of terrain far beyond the normal limit.
                            </p>
                            <p>
                                When you explore new areas, DH records the terrain data and generates LOD chunks — low-detail representations
                                that use a fraction of the GPU and CPU resources required for full-detail rendering. These LOD chunks are rendered
                                on background threads, so your main Minecraft performance stays smooth.
                            </p>

                            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Is Distant Horizons Client-Side?</h3>
                            <p>
                                <strong>Yes.</strong> Distant Horizons is primarily a <strong>client-side mod</strong>. You can install it on your
                                local machine and join any vanilla or modded server — no server-side installation required. However, there is an
                                optional server-side plugin that can pre-generate LOD data for all players, speeding up initial LOD loading.
                            </p>

                            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Distant Horizons vs Voxy: Key Differences</h3>
                            <p>
                                Both DH and <strong>Voxy</strong> aim to extend Minecraft&apos;s view distance, but they use fundamentally different
                                approaches. DH uses a traditional LOD system with configurable quality levels, while Voxy uses voxel-based
                                representation. DH supports more Minecraft versions, has broader shader compatibility (20+ tested packs),
                                and works with both Fabric and NeoForge. Voxy is currently Fabric-only with limited shader support.
                            </p>

                            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Which Minecraft Versions Are Supported?</h3>
                            <p>
                                Distant Horizons supports a wide range of Minecraft versions. The latest builds support MC <strong>1.21.11</strong>,{' '}
                                <strong>1.21.5</strong>, <strong>1.21.4</strong>, <strong>1.21.1</strong>, <strong>1.20.1</strong>,{' '}
                                <strong>1.20.4</strong>, <strong>1.20.6</strong>, and <strong>1.18.2</strong>.
                                Both <strong>Fabric</strong> and <strong>NeoForge</strong> mod loaders are supported on most versions.
                            </p>

                            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Does Distant Horizons Work with Shaders?</h3>
                            <p>
                                Yes! Many popular shader packs have added native Distant Horizons support. Packs like <strong>BSL Shaders</strong>,{' '}
                                <strong>Complementary Reimagined</strong>, <strong>Complementary Unbound</strong>, and <strong>Bliss Shaders</strong>{' '}
                                are fully compatible. Some packs like <strong>SEUS Renewed</strong> have partial support. Check our{' '}
                                <Link href="/shaders" className="text-primary hover:underline">
                                    Shader Compatibility Database
                                </Link>{' '}
                                for the full list of 20+ tested packs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="py-16 border-t border-border/30">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                            <span className="gradient-text">Distant Horizons</span> vs Vanilla vs Voxy
                        </h2>
                        <div className="glass rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full min-w-[500px]">
                                    <thead>
                                        <tr className="border-b border-border/50">
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-dim uppercase">Feature</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase">DH Mod</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-dim uppercase">Vanilla</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-dim uppercase">Voxy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisons.map((row, i) => (
                                            <tr key={i} className="border-b border-border/20 last:border-0">
                                                <td className="px-6 py-3 text-sm font-medium text-foreground">{row.feature}</td>
                                                <td className="px-6 py-3 text-sm text-primary font-medium">{row.dh}</td>
                                                <td className="px-6 py-3 text-sm text-text-dim">{row.vanilla}</td>
                                                <td className="px-6 py-3 text-sm text-text-muted">{row.voxy}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Facts */}
                <section className="py-16 border-t border-border/30">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                            Quick Facts About <span className="gradient-text">Distant Horizons</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ['Free & Open Source', 'Available on Modrinth and CurseForge at no cost.'],
                                ['Client-Side Only', 'No server installation needed. Works on any server.'],
                                ['Active Development', 'Regular updates with new features and bug fixes.'],
                                ['Community-Driven', 'Large Discord community with 100K+ members.'],
                                ['Performance Optimized', 'Configurable CPU/GPU usage to match your hardware.'],
                                ['Shader Compatible', '20+ shader packs tested and documented.'],
                            ].map(([title, desc]) => (
                                <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-surface/30 border border-border/30">
                                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-foreground text-sm">{title}</div>
                                        <div className="text-xs text-text-muted mt-0.5">{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 border-t border-border/30">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="glass rounded-2xl p-8 text-center">
                            <h2 className="text-2xl font-bold mb-3">
                                Ready to Try <span className="gradient-text">Distant Horizons</span>?
                            </h2>
                            <p className="text-text-muted mb-6 max-w-xl mx-auto">
                                Get started in minutes. Install the mod, generate optimized settings, and explore Minecraft like never before.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <Link href="/install/1-21-1" className="btn-primary !py-2.5 !px-5 text-sm">
                                    <Download className="w-4 h-4" /> Install Guide
                                </Link>
                                <Link href="/calculator" className="btn-secondary !py-2.5 !px-5 text-sm">
                                    <Cpu className="w-4 h-4" /> Config Generator
                                </Link>
                                <Link href="/shaders" className="btn-secondary !py-2.5 !px-5 text-sm">
                                    <Layers className="w-4 h-4" /> Shader Database
                                </Link>
                                <Link href="/faq" className="btn-secondary !py-2.5 !px-5 text-sm">
                                    <HelpCircle className="w-4 h-4" /> FAQ
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
