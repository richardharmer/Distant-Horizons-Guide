'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import {
    Sparkles,
    Copy,
    Check,
    ChevronDown,
    Cpu,
    Monitor,
    Target,
    Download,
    Gauge,
    Zap,
    Eye,
} from 'lucide-react';
import { generateConfig, type HardwareProfile } from '@/lib/configEngine';

const cpuOptions = [
    { value: 4, label: '4 Threads', desc: 'Budget' },
    { value: 8, label: '8 Threads', desc: 'Mid-range' },
    { value: 12, label: '12 Threads', desc: 'High-end' },
    { value: 16, label: '16+ Threads', desc: 'Enthusiast' },
];

const gpuOptions = [
    { value: 'entry', label: 'Entry', desc: 'GTX 1050 / RX 570 tier' },
    { value: 'mid', label: 'Mid-Range', desc: 'RTX 3060 / RX 6600 tier' },
    { value: 'high', label: 'High-End', desc: 'RTX 4070 / RX 7800 tier' },
    { value: 'ultra', label: 'Ultra', desc: 'RTX 4090 / RX 7900 XTX tier' },
];

const targetOptions = [
    { value: 'performance', label: 'Max FPS', desc: 'Prioritize frame rate', icon: Zap },
    { value: 'balanced', label: 'Balanced', desc: 'Best of both worlds', icon: Gauge },
    { value: 'visuals', label: 'Ultra Visuals', desc: 'Maximum eye candy', icon: Eye },
];

function highlightToml(toml: string): React.ReactNode[] {
    return toml.split('\n').map((line, i) => {
        if (line.trim().startsWith('#')) {
            return <div key={i} className="text-text-dim/50">{line}</div>;
        }
        if (line.includes('=')) {
            const [key, ...rest] = line.split('=');
            const val = rest.join('=');
            return (
                <div key={i}>
                    <span className="text-primary/80">{key}</span>
                    <span className="text-text-dim">=</span>
                    <span className="text-accent">{val}</span>
                </div>
            );
        }
        if (line.startsWith('[')) {
            return <div key={i} className="text-warning font-semibold mt-1">{line}</div>;
        }
        return <div key={i}>{line}</div>;
    });
}

export default function ConfigCalculator() {
    const [cpu, setCpu] = useState(8);
    const [gpu, setGpu] = useState('mid');
    const [targetVal, setTarget] = useState('balanced');
    const [copied, setCopied] = useState(false);
    const [generated, setGenerated] = useState(false);

    const result = useMemo(() => {
        if (!generated) return null;
        const profile: HardwareProfile = {
            cpuThreads: cpu as HardwareProfile['cpuThreads'],
            gpuLevel: gpu as HardwareProfile['gpuLevel'],
            target: targetVal as HardwareProfile['target'],
        };
        return generateConfig(profile);
    }, [cpu, gpu, targetVal, generated]);

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.toml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadToml = () => {
        if (!result) return;
        const blob = new Blob([result.toml], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'distant_horizons.toml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Visual preview data
    const previewData = useMemo(() => {
        if (targetVal === 'performance') {
            return { label: 'FPS +50%', gradient: 'from-green-500/20 to-emerald-500/10', icon: '⚡', chunks: '128', detail: 'Low' };
        } else if (targetVal === 'visuals') {
            return { label: 'Max Beauty', gradient: 'from-purple-500/20 to-pink-500/10', icon: '✨', chunks: '512+', detail: 'Ultra' };
        }
        return { label: 'Best Balance', gradient: 'from-blue-500/20 to-cyan-500/10', icon: '⚖️', chunks: '256', detail: 'Medium' };
    }, [targetVal]);

    return (
        <section id="calculator" className="py-20 sm:py-28 border-t border-border/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="section-title">
                        Distant Horizons <span className="gradient-text">Best Settings</span> Generator
                    </h2>
                    <p className="section-subtitle">
                        Select your hardware and get an optimized distant_horizons.toml configuration.
                        Our generator accounts for CPU thread allocation, GPU capabilities, and your priority.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Controls */}
                    <div className="glass rounded-2xl p-6 sm:p-8">
                        {/* CPU Selector */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Cpu className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-foreground text-sm">CPU Threads</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {cpuOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setCpu(opt.value); setGenerated(false); }}
                                        className={`px-4 py-3 rounded-xl text-left transition-all duration-200 ${cpu === opt.value
                                            ? 'bg-primary/15 border-primary/40 text-primary border-2'
                                            : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                            }`}
                                    >
                                        <div className="font-medium text-sm">{opt.label}</div>
                                        <div className="text-xs opacity-60">{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* GPU Selector */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Monitor className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-foreground text-sm">GPU Level</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {gpuOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setGpu(opt.value); setGenerated(false); }}
                                        className={`px-4 py-3 rounded-xl text-left transition-all duration-200 ${gpu === opt.value
                                            ? 'bg-primary/15 border-primary/40 text-primary border-2'
                                            : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                            }`}
                                    >
                                        <div className="font-medium text-sm">{opt.label}</div>
                                        <div className="text-xs opacity-60">{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Target Selector */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Target className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-foreground text-sm">Optimization Target</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {targetOptions.map((opt) => {
                                    const Icon = opt.icon;
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setTarget(opt.value); setGenerated(false); }}
                                            className={`px-3 py-3 rounded-xl text-center transition-all duration-200 ${targetVal === opt.value
                                                ? 'bg-primary/15 border-primary/40 text-primary border-2'
                                                : 'bg-surface border border-border text-text-muted hover:border-border-light'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 mx-auto mb-1" />
                                            <div className="font-medium text-sm">{opt.label}</div>
                                            <div className="text-xs opacity-60">{opt.desc}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Visual Preview Card */}
                        <div className={`rounded-xl p-5 mb-6 bg-gradient-to-br ${previewData.gradient} border border-border/30`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl mb-1">{previewData.icon}</div>
                                    <div className="font-bold text-foreground">{previewData.label}</div>
                                    <div className="text-xs text-text-muted mt-1">
                                        ~{previewData.chunks} chunks • LOD Quality: {previewData.detail}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-text-muted">Estimated View</div>
                                    <div className="text-2xl font-black text-foreground">{previewData.chunks}</div>
                                    <div className="text-xs text-text-dim">chunks</div>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={() => setGenerated(true)}
                            className="btn-primary w-full !py-3.5 text-base"
                        >
                            <Sparkles className="w-5 h-5" />
                            Generate Configuration
                        </button>
                    </div>

                    {/* Right: Output */}
                    <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col">
                        {result ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-foreground text-sm">Generated Config</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={downloadToml}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/15 text-accent text-xs font-medium hover:bg-accent/25 transition-colors"
                                        >
                                            <Download className="w-3 h-3" />
                                            Download .toml
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface text-text-muted text-xs font-medium hover:bg-surface-light transition-colors"
                                        >
                                            {copied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                                            {copied ? 'Copied!' : 'Copy Config'}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 bg-background rounded-xl p-4 font-mono text-xs leading-relaxed overflow-y-auto max-h-[500px] custom-scrollbar">
                                    {highlightToml(result.toml)}
                                </div>

                                {/* Suggestions */}
                                {result.suggestions.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                            💡 Suggestions
                                        </h4>
                                        {result.suggestions.map((s, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-text-muted bg-surface/50 rounded-lg px-3 py-2">
                                                <span className="shrink-0 mt-0.5">•</span>
                                                {s}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Ad slot */}
                                <div className="mt-4 border-2 border-dashed border-border/40 rounded-xl p-4 text-center">
                                    <p className="text-xs text-text-dim uppercase tracking-wider">Advertisement</p>
                                    <p className="text-xs text-text-dim mt-1">Recommended Server Hosting</p>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-center">
                                <div>
                                    <Sparkles className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                                    <p className="text-text-muted font-medium">Configure your hardware</p>
                                    <p className="text-sm text-text-dim mt-1">
                                        Select your specs and click &ldquo;Generate Configuration&rdquo; to get an optimized .toml file
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
