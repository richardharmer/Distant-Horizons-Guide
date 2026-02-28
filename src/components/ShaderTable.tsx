'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Filter,
    ChevronDown,
    ChevronUp,
    Zap,
    ExternalLink,
    X,
} from 'lucide-react';
import shadersData from '@/data/shaders.json';

type ShaderStatus = 'compatible' | 'partial' | 'incompatible';

const statusConfig: Record<ShaderStatus, { label: string; icon: typeof CheckCircle; className: string }> = {
    compatible: { label: 'Compatible', icon: CheckCircle, className: 'badge-compatible' },
    partial: { label: 'Partial', icon: AlertTriangle, className: 'badge-partial' },
    incompatible: { label: 'Incompatible', icon: XCircle, className: 'badge-incompatible' },
};

const performanceLevels = ['low', 'medium', 'high', 'ultra'];
const allVersions = Array.from(new Set(shadersData.flatMap(s => s.mcVersions)));

export default function ShaderTable() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [versionFilter, setVersionFilter] = useState<string>('all');
    const [perfFilter, setPerfFilter] = useState<string>('all');
    const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
    const [modalShader, setModalShader] = useState<typeof shadersData[0] | null>(null);

    const filtered = useMemo(() => {
        return shadersData.filter((s) => {
            if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
            if (statusFilter !== 'all' && s.status !== statusFilter) return false;
            if (versionFilter !== 'all' && !s.mcVersions.includes(versionFilter)) return false;
            if (perfFilter !== 'all' && s.performance !== perfFilter) return false;
            return true;
        });
    }, [search, statusFilter, versionFilter, perfFilter]);

    const counts = useMemo(() => {
        const c: Record<string, number> = { all: shadersData.length };
        for (const s of shadersData) {
            c[s.status] = (c[s.status] || 0) + 1;
        }
        return c;
    }, []);

    return (
        <section id="shaders" className="py-20 sm:py-28 border-t border-border/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                        <span className="gradient-text">Shader Compatibility</span> Database
                    </h1>
                    <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
                        Find out which shaders work with Distant Horizons. Our database covers 20+
                        popular shaders with detailed compatibility notes and recommended settings.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="glass rounded-2xl p-5 mb-8">
                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                        <input
                            type="text"
                            placeholder="Search shaders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-text-dim text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Filter row */}
                    <div className="flex flex-wrap gap-3">
                        {/* Status filter */}
                        <div className="flex flex-wrap gap-1.5">
                            {['all', 'compatible', 'partial', 'incompatible'].map((st) => {
                                const label = st === 'all' ? 'All' : statusConfig[st as ShaderStatus]?.label || st;
                                const Icon = st !== 'all' ? statusConfig[st as ShaderStatus]?.icon : Filter;
                                return (
                                    <button
                                        key={st}
                                        onClick={() => setStatusFilter(st)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === st
                                            ? 'bg-primary/15 text-primary border border-primary/30'
                                            : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                            }`}
                                    >
                                        {Icon && <Icon className="w-3 h-3" />}
                                        {label} ({counts[st] || 0})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Version filter */}
                        <select
                            value={versionFilter}
                            onChange={(e) => setVersionFilter(e.target.value)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted focus:outline-none focus:border-primary cursor-pointer"
                        >
                            <option value="all">All Versions</option>
                            {allVersions.sort().reverse().map((v) => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>

                        {/* Performance filter */}
                        <select
                            value={perfFilter}
                            onChange={(e) => setPerfFilter(e.target.value)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-muted focus:outline-none focus:border-primary cursor-pointer"
                        >
                            <option value="all">All Performance</option>
                            {performanceLevels.map((p) => (
                                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)} Impact</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="text-sm text-text-dim mb-4">
                    Showing {filtered.length} of {shadersData.length} shaders
                </div>

                {/* Table — responsive: horizontal scroll on mobile */}
                <div className="overflow-x-auto custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="glass rounded-2xl overflow-hidden min-w-[640px]">
                        {/* Table header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/50 text-xs font-semibold text-text-dim uppercase tracking-wider">
                            <div className="col-span-4">Shader</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">DH Version</div>
                            <div className="col-span-2">Performance</div>
                            <div className="col-span-2">Loaders</div>
                        </div>

                        {/* Table rows */}
                        {filtered.map((shader) => {
                            const st = statusConfig[shader.status as ShaderStatus];
                            const StIcon = st?.icon || CheckCircle;
                            const isExpanded = expandedSlug === shader.slug;

                            return (
                                <div key={shader.slug} className="border-b border-border/30 last:border-0">
                                    <div
                                        onClick={() => setExpandedSlug(isExpanded ? null : shader.slug)}
                                        className="grid grid-cols-12 gap-4 px-6 py-4 cursor-pointer hover:bg-primary-glow transition-colors items-center"
                                    >
                                        <div className="col-span-4 font-medium text-foreground text-sm flex items-center gap-2">
                                            {isExpanded ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-text-dim shrink-0" />}
                                            {shader.name}
                                        </div>
                                        <div className="col-span-2">
                                            <span className={`badge ${st?.className}`}>
                                                <StIcon className="w-3 h-3" />
                                                {st?.label}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-sm text-text-muted">{shader.dhVersion}</div>
                                        <div className="col-span-2">
                                            <span className="flex items-center gap-1 text-sm text-text-muted">
                                                <Zap className="w-3 h-3" />
                                                {shader.performance}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex gap-1 flex-wrap">
                                            {shader.loaders.map((l) => (
                                                <span key={l} className="text-xs px-2 py-0.5 rounded bg-surface-light/50 text-text-dim">
                                                    {l}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expanded details */}
                                    {isExpanded && (
                                        <div className="px-6 pb-5 pt-1 border-t border-border/20 bg-surface/20 animate-fade-in">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold text-text-dim uppercase mb-2">Recommended Settings</h4>
                                                    <p className="text-sm text-text-muted">{shader.settings}</p>
                                                    <h4 className="text-xs font-semibold text-text-dim uppercase mt-4 mb-2">MC Versions</h4>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {shader.mcVersions.map((v) => (
                                                            <span key={v} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{v}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    {shader.knownIssues && shader.knownIssues !== 'None reported.' && (
                                                        <>
                                                            <h4 className="text-xs font-semibold text-text-dim uppercase mb-2">Known Issues</h4>
                                                            <ul className="space-y-1">
                                                                <li className="text-sm text-text-muted flex items-start gap-1.5">
                                                                    <AlertTriangle className="w-3 h-3 text-warning shrink-0 mt-0.5" />
                                                                    {shader.knownIssues}
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )}
                                                    <div className="flex gap-2 mt-4">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setModalShader(shader); }}
                                                            className="btn-secondary !py-1.5 !px-3 text-xs"
                                                        >
                                                            Full Details
                                                        </button>
                                                        <a
                                                            href={shader.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-medium hover:bg-accent/25 transition-colors"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div className="py-12 text-center text-text-dim">
                                No shaders match your filters. Try adjusting your search.
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO text */}
                <div className="mt-10 text-center">
                    <p className="text-sm text-text-dim max-w-3xl mx-auto">
                        This shader compatibility database is maintained by the community. Data is sourced from
                        GitHub Issues, Reddit r/DistantHorizons, and the Iris Discord #dh-shader-testing channel.
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                    </p>
                </div>
            </div>

            {/* Modal */}
            {modalShader && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setModalShader(null)}
                >
                    <div
                        className="glass rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto custom-scrollbar animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-foreground">{modalShader.name}</h3>
                            <button
                                onClick={() => setModalShader(null)}
                                className="p-1.5 rounded-lg hover:bg-surface transition-colors"
                            >
                                <X className="w-5 h-5 text-text-muted" />
                            </button>
                        </div>

                        {/* Status */}
                        {(() => {
                            const st = statusConfig[modalShader.status as ShaderStatus];
                            const StIcon = st?.icon || CheckCircle;
                            return (
                                <div className="mb-4">
                                    <span className={`badge ${st?.className} text-sm`}>
                                        <StIcon className="w-4 h-4" />
                                        {st?.label}
                                    </span>
                                </div>
                            );
                        })()}

                        {/* Screenshot placeholder */}
                        <div className="border-2 border-dashed border-border/40 rounded-xl p-8 mb-6 text-center bg-surface/30">
                            <p className="text-sm text-text-dim">📸 Settings screenshot placeholder</p>
                            <p className="text-xs text-text-dim mt-1">Coming soon: community-submitted screenshots</p>
                        </div>

                        {/* Details grid */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold text-text-dim uppercase mb-1">Required DH Version</h4>
                                <p className="text-sm text-foreground">{modalShader.dhVersion}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-text-dim uppercase mb-1">Performance Impact</h4>
                                <p className="text-sm text-foreground flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> {modalShader.performance}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-text-dim uppercase mb-1">Recommended Settings</h4>
                                <p className="text-sm text-text-muted">{modalShader.settings}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-text-dim uppercase mb-1">Supported MC Versions</h4>
                                <div className="flex gap-1 flex-wrap">
                                    {modalShader.mcVersions.map((v) => (
                                        <span key={v} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{v}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-text-dim uppercase mb-1">Mod Loaders</h4>
                                <div className="flex gap-1 flex-wrap">
                                    {modalShader.loaders.map((l) => (
                                        <span key={l} className="text-xs px-2 py-0.5 rounded bg-surface-light/50 text-text-muted">{l}</span>
                                    ))}
                                </div>
                            </div>
                            {modalShader.knownIssues && modalShader.knownIssues !== 'None reported.' && (
                                <div>
                                    <h4 className="text-xs font-semibold text-text-dim uppercase mb-2">⚠️ Known Issues & Conflicts</h4>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-text-muted flex items-start gap-2 bg-warning/5 border border-warning/10 rounded-lg px-3 py-2">
                                            <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
                                            {modalShader.knownIssues}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex gap-3">
                            <a
                                href={modalShader.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary !py-2 text-sm flex-1"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Download Shader
                            </a>
                            <button onClick={() => setModalShader(null)} className="btn-secondary !py-2 text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
