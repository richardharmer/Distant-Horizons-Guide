'use client';

import { useState, useMemo } from 'react';
import { Download, ExternalLink, Check, AlertCircle, ChevronRight, Server, Box } from 'lucide-react';
import versionsData, { getLoaderLabel } from '@/data/versionCatalog';
import { analyticsEvent } from '@/data/site';

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
    verified: boolean;
    indexable: boolean;
    loaders: {
        fabric: LoaderInfo;
        neoforge: LoaderInfo;
    };
}

interface InstallHubProps {
    initialVersion?: string;
    initialLoader?: 'fabric' | 'neoforge';
}

export default function InstallHub({ initialVersion, initialLoader = 'fabric' }: InstallHubProps) {
    const versions = versionsData as VersionEntry[];
    const defaultVersion = initialVersion
        ? (versions.find(v => v.mcVersion === initialVersion)?.mcVersion || versions[0].mcVersion)
        : versions[0].mcVersion;
    const [selectedVersion, setSelectedVersion] = useState(defaultVersion);
    const [selectedLoader, setSelectedLoader] = useState<'fabric' | 'neoforge'>(initialLoader);

    const version = useMemo(
        () => versions.find((v) => v.mcVersion === selectedVersion) || versions[0],
        [versions, selectedVersion]
    );

    const alternativeLoaderLabel = getLoaderLabel(version.mcVersion, 'neoforge');
    const selectedLoaderLabel = getLoaderLabel(version.mcVersion, selectedLoader);
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
                                        aria-pressed={selectedVersion === v.mcVersion}
                                        onClick={() => { setSelectedVersion(v.mcVersion); analyticsEvent('select_minecraft_version', { version: v.mcVersion }); }}
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
                                    aria-pressed={selectedLoader === 'fabric'}
                                    onClick={() => { setSelectedLoader('fabric'); analyticsEvent('select_loader', { loader: 'fabric' }); }}
                                    className={`px-4 py-4 rounded-xl text-center transition-all ${selectedLoader === 'fabric'
                                        ? 'bg-primary/15 text-primary border border-primary/30'
                                        : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                        }`}
                                >
                                    <div className="text-lg font-bold mb-0.5">Fabric</div>
                                    <div className="text-xs opacity-60">Recommended</div>
                                </button>
                                <button
                                    aria-pressed={selectedLoader === 'neoforge'}
                                    onClick={() => { setSelectedLoader('neoforge'); analyticsEvent('select_loader', { loader: 'neoforge' }); }}
                                    className={`px-4 py-4 rounded-xl text-center transition-all ${selectedLoader === 'neoforge'
                                        ? 'bg-primary/15 text-primary border border-primary/30'
                                        : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                        }`}
                                >
                                    <div className="text-lg font-bold mb-0.5">{alternativeLoaderLabel}</div>
                                    <div className="text-xs opacity-60">Alternative</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="glass rounded-xl p-6 mb-6">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Download className="w-5 h-5 text-background" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Distant Horizons {version.dhVersion}
                                </h3>
                                <p className="text-sm text-text-muted">
                                    For Minecraft {version.mcVersion} • {selectedLoaderLabel} • {version.stability}
                                </p>
                            </div>
                            {hasLoader && (
                                <a
                                    href={loaderInfo.downloadUrl}
                                    onClick={() => analyticsEvent('click_download_dh', { version: version.mcVersion, loader: selectedLoader })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto sm:ml-auto btn-primary !py-2.5 !px-5 text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </a>
                            )}
                        </div>

                        {!hasLoader && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20 text-sm text-danger">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                No {selectedLoaderLabel} download is listed here for Minecraft {version.mcVersion}. Select Fabric or check the official release files.
                            </div>
                        )}
                    </div>

                    {/* Dependencies */}
                    {hasLoader && loaderInfo.dependencies.length > 0 && (
                        <div className="glass rounded-xl p-6">
                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Check className="w-5 h-5 text-accent" />
                                Dependencies & Optional Rendering Mods
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
                                                    {dep.required ? 'Required' : 'Optional'}
                                                </span>
                                            </div>
                                            {dep.note && <p className="text-xs text-text-dim mt-0.5">{dep.note}</p>}
                                        </div>
                                        <a
                                            href={dep.url}
                                            onClick={() => analyticsEvent('click_dependency', { dependency: dep.name, version: version.mcVersion, loader: selectedLoader })}
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

                    {hasLoader && loaderInfo.dependencies.length === 0 && (
                        <div className="rounded-xl border border-warning/30 bg-warning/10 p-5 text-sm text-text-muted">
                            <p className="font-semibold text-warning mb-2">Dependency list not independently verified</p>
                            <p>Use the official file page for Minecraft {version.mcVersion} and {selectedLoaderLabel}. This guide does not copy dependency requirements from another Minecraft version.</p>
                        </div>
                    )}

                    <aside className="mt-6 rounded-xl border border-border bg-surface/50 p-5 text-sm text-text-muted">
                        <h3 className="font-semibold text-foreground mb-2">Before adding shaders</h3>
                        <p>Forge and NeoForge are different loaders. Sodium and Iris publish Fabric and NeoForge files; an older Forge profile needs its own compatible rendering stack. Indium is only for older Sodium setups.</p>
                        <p className="mt-3 text-xs text-text-dim">Rendering guidance checked October 11, 2026 against the official <a className="text-primary underline" href="https://modrinth.com/mod/sodium" target="_blank" rel="noopener noreferrer">Sodium</a>, <a className="text-primary underline" href="https://modrinth.com/mod/iris" target="_blank" rel="noopener noreferrer">Iris</a> and <a className="text-primary underline" href="https://modrinth.com/mod/indium" target="_blank" rel="noopener noreferrer">Indium</a> pages. This is not a test of every mod combination.</p>
                    </aside>

                    {/* Installation steps */}
                    {hasLoader && <div className="mt-8 glass rounded-xl p-6">
                        <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-primary" />
                            Quick Installation Steps
                        </h3>
                        <div className="space-y-4">
                            {[
                                'Back up your world and duplicate your launcher profile before changing an existing modpack.',
                                `Install ${selectedLoaderLabel} for Minecraft ${version.mcVersion} and launch the empty profile once.`,
                                `Open the official file list above. Choose Minecraft ${version.mcVersion} and ${selectedLoaderLabel}, then check the file’s dependency requirements.`,
                                'Place the DH .jar and its required dependencies in this profile’s mods folder. Do not mix Forge and NeoForge files.',
                                'Launch without shaders first. Visit terrain and allow LOD generation to finish before testing distant views.',
                                selectedLoaderLabel === 'Forge'
                                    ? 'For optional shaders, check the exact Embeddium/Oculus and DH combination. Legacy Forge shader support varies by file.'
                                    : 'For optional shaders, add matching Sodium and Iris files for your loader, then choose a DH-compatible shader. Do not add Indium to Sodium 0.6+.',

                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-text-muted pt-1.5">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>

                {/* SEO text */}
                <div className="mt-12 max-w-3xl mx-auto text-center">
                    <p className="text-sm text-text-dim leading-relaxed">
                        Download Distant Horizons for Minecraft {version.mcVersion} on {selectedLoaderLabel}.
                        Required dependencies come from the selected official file. Performance mods and shader loaders are optional;
                        confirm their exact Minecraft version and loader before installing.
                        Distant Horizons is a free, open-source Minecraft LOD mod that extends your view distance up to 512+ chunks.
                    </p>
                </div>
            </div>
        </section>
    );
}
