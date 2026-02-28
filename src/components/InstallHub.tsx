'use client';

import { useState, useMemo } from 'react';
import { Download, ExternalLink, Check, AlertCircle, ChevronRight, Server, Box } from 'lucide-react';
import versionsData from '@/data/versions.json';

interface Dependency {
    name: string;
    url: string;
    required: boolean;
    note?: string;
}

interface LoaderInfo {
    dependencies: Dependency[];
    downloadUrl: string;
}

interface VersionEntry {
    mcVersion: string;
    dhVersion: string;
    releaseDate: string;
    stability: string;
    loaders: {
        fabric: LoaderInfo;
        neoforge: LoaderInfo;
    };
}

interface InstallHubProps {
    initialVersion?: string;
}

export default function InstallHub({ initialVersion }: InstallHubProps) {
    const versions = versionsData as VersionEntry[];
    const defaultVersion = initialVersion
        ? (versions.find(v => v.mcVersion === initialVersion)?.mcVersion || versions[0].mcVersion)
        : versions[0].mcVersion;
    const [selectedVersion, setSelectedVersion] = useState(defaultVersion);
    const [selectedLoader, setSelectedLoader] = useState<'fabric' | 'neoforge'>('fabric');

    const version = useMemo(
        () => versions.find((v) => v.mcVersion === selectedVersion) || versions[0],
        [versions, selectedVersion]
    );

    const loaderInfo = version.loaders[selectedLoader];
    const hasLoader = loaderInfo.downloadUrl !== '';

    return (
        <section id="install" className="py-20 sm:py-28 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="section-title">
                        <span className="gradient-text">Install Distant Horizons</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Download and set up Distant Horizons for your Minecraft version.
                        Select your version and mod loader to get started.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Version + Loader selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Version */}
                        <div className="glass rounded-xl p-5">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-muted mb-3">
                                <Box className="w-4 h-4 text-primary" /> Minecraft Version
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {versions.map((v) => (
                                    <button
                                        key={v.mcVersion}
                                        onClick={() => setSelectedVersion(v.mcVersion)}
                                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedVersion === v.mcVersion
                                            ? 'bg-primary/15 text-primary border border-primary/30'
                                            : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                            }`}
                                    >
                                        {v.mcVersion}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Loader */}
                        <div className="glass rounded-xl p-5">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-muted mb-3">
                                <Server className="w-4 h-4 text-primary" /> Mod Loader
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setSelectedLoader('fabric')}
                                    className={`px-4 py-4 rounded-xl text-center transition-all ${selectedLoader === 'fabric'
                                        ? 'bg-primary/15 text-primary border border-primary/30'
                                        : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                        }`}
                                >
                                    <div className="text-lg font-bold mb-0.5">Fabric</div>
                                    <div className="text-xs opacity-60">Recommended</div>
                                </button>
                                <button
                                    onClick={() => setSelectedLoader('neoforge')}
                                    className={`px-4 py-4 rounded-xl text-center transition-all ${selectedLoader === 'neoforge'
                                        ? 'bg-primary/15 text-primary border border-primary/30'
                                        : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                        }`}
                                >
                                    <div className="text-lg font-bold mb-0.5">NeoForge</div>
                                    <div className="text-xs opacity-60">Alternative</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="glass rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Download className="w-5 h-5 text-background" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Distant Horizons {version.dhVersion}
                                </h3>
                                <p className="text-sm text-text-muted">
                                    For Minecraft {version.mcVersion} • {selectedLoader === 'fabric' ? 'Fabric' : 'NeoForge'} • {version.stability}
                                </p>
                            </div>
                            {hasLoader && (
                                <a
                                    href={loaderInfo.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto btn-primary !py-2.5 !px-5 text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </a>
                            )}
                        </div>

                        {!hasLoader && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20 text-sm text-danger">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                NeoForge is not available for Minecraft {version.mcVersion}. Please use Fabric.
                            </div>
                        )}
                    </div>

                    {/* Dependencies */}
                    {hasLoader && (
                        <div className="glass rounded-xl p-6">
                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Check className="w-5 h-5 text-accent" />
                                Required & Recommended Dependencies
                            </h3>
                            <div className="space-y-3">
                                {loaderInfo.dependencies.map((dep) => (
                                    <div
                                        key={dep.name}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border/50 hover:border-border-light transition-colors"
                                    >
                                        <div className={`w-2 h-2 rounded-full ${dep.required ? 'bg-danger' : 'bg-accent'}`} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm text-foreground">{dep.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded ${dep.required ? 'bg-danger/15 text-danger' : 'bg-accent/15 text-accent'}`}>
                                                    {dep.required ? 'Required' : 'Recommended'}
                                                </span>
                                            </div>
                                            {dep.note && <p className="text-xs text-text-dim mt-0.5">{dep.note}</p>}
                                        </div>
                                        <a
                                            href={dep.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                                        >
                                            Download <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Installation steps */}
                    <div className="mt-8 glass rounded-xl p-6">
                        <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-primary" />
                            Quick Installation Steps
                        </h3>
                        <div className="space-y-4">
                            {[
                                `Install ${selectedLoader === 'fabric' ? 'Fabric Loader' : 'NeoForge'} for Minecraft ${version.mcVersion}`,
                                selectedLoader === 'fabric' ? 'Download and place Fabric API in your mods folder' : 'NeoForge includes its API — no extra download needed',
                                `Download Distant Horizons ${version.dhVersion} from the link above`,
                                'Place the DH .jar file in your .minecraft/mods folder',
                                'Install recommended dependencies (Sodium/Iris for Fabric, Embeddium/Oculus for NeoForge)',
                                `Launch Minecraft with the ${selectedLoader === 'fabric' ? 'Fabric' : 'NeoForge'} profile — enjoy infinite horizons!`,
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-text-muted pt-1.5">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SEO text */}
                <div className="mt-12 max-w-3xl mx-auto text-center">
                    <p className="text-sm text-text-dim leading-relaxed">
                        Download Distant Horizons for Minecraft {version.mcVersion} on {selectedLoader === 'fabric' ? 'Fabric' : 'NeoForge'}.
                        This guide covers the complete installation process including all required dependencies like
                        {selectedLoader === 'fabric' ? ' Fabric API, Sodium, Iris, and Indium' : ' Embeddium and Oculus'}.
                        Distant Horizons is a free, open-source Minecraft LOD mod that extends your view distance up to 512+ chunks.
                    </p>
                </div>
            </div>
        </section>
    );
}
