'use client';

import { useState, useMemo } from 'react';
import {
    Sparkles,
    Cpu,
    Monitor,
    Target,
    Gauge,
    Zap,
    Eye,
} from 'lucide-react';
import { generateConfig, type HardwareProfile } from '@/lib/configEngine';
import { analyticsEvent } from '@/data/site';

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

export default function ConfigCalculator() {
    const [cpu, setCpu] = useState(8);
    const [gpu, setGpu] = useState('mid');
    const [targetVal, setTarget] = useState('balanced');
    const [ram, setRam] = useState(6);
    const [shaderSupport, setShaderSupport] = useState(false);
    const [generated, setGenerated] = useState(false);

    const result = useMemo(() => {
        if (!generated) return null;
        const profile: HardwareProfile = {
            cpuThreads: cpu as HardwareProfile['cpuThreads'],
            gpuLevel: gpu as HardwareProfile['gpuLevel'],
            target: targetVal as HardwareProfile['target'],
            ramAllocation: ram as HardwareProfile['ramAllocation'],
            shaderSupport,
        };
        return generateConfig(profile);
    }, [cpu, gpu, targetVal, ram, shaderSupport, generated]);

    // Visual preview data
    const previewData = useMemo(() => {
        if (targetVal === 'performance') {
            return { label: 'Performance-first profile', gradient: 'from-green-500/20 to-emerald-500/10', chunks: '64–128', detail: 'Low' };
        } else if (targetVal === 'visuals') {
            return { label: 'Visual quality profile', gradient: 'from-purple-500/20 to-pink-500/10', chunks: '128–256', detail: 'High' };
        }
        return { label: 'Balanced starting profile', gradient: 'from-blue-500/20 to-cyan-500/10', chunks: '96–192', detail: 'Medium' };
    }, [targetVal]);

    return (
        <section id="calculator" className="py-20 sm:py-28 border-t border-border/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="section-title">
                        Distant Horizons <span className="gradient-text">Starting Settings</span> Guide
                    </h2>
                    <p className="section-subtitle">
                        Select your hardware to get a conservative profile you can enter in the current DH settings screen.
                        This tool does not generate a version-independent config file or guarantee FPS.
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label htmlFor="ram-allocation" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">Minecraft RAM</label>
                                <select id="ram-allocation" value={ram} onChange={(event) => { setRam(Number(event.target.value)); setGenerated(false); }} className="w-full px-3 py-3 rounded-xl bg-surface border border-border text-text-muted focus:outline-none focus:border-primary">
                                    {[4, 6, 8, 12, 16].map((value) => <option key={value} value={value}>{value} GB allocated</option>)}
                                </select>
                            </div>
                            <label className="flex items-center gap-3 rounded-xl bg-surface border border-border px-4 py-3 cursor-pointer self-end">
                                <input type="checkbox" checked={shaderSupport} onChange={(event) => { setShaderSupport(event.target.checked); setGenerated(false); }} className="h-4 w-4 accent-sky-400" />
                                <span><span className="block text-sm font-semibold text-foreground">Use shaders</span><span className="block text-xs text-text-dim">Adds compatibility guidance</span></span>
                            </label>
                        </div>

                        {/* Visual Preview Card */}
                        <div className={`rounded-xl p-5 mb-6 bg-gradient-to-br ${previewData.gradient} border border-border/30`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-foreground">{previewData.label}</div>
                                    <div className="text-xs text-text-muted mt-1">
                                        ~{previewData.chunks} chunks • LOD Quality: {previewData.detail}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-text-muted">Starting LOD Distance</div>
                                    <div className="text-2xl font-black text-foreground">{previewData.chunks}</div>
                                    <div className="text-xs text-text-dim">chunks</div>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={() => { setGenerated(true); analyticsEvent('generate_config', { cpu_threads: cpu, gpu_level: gpu, target: targetVal, ram_gb: ram, shader_support: shaderSupport }); }}
                            className="btn-primary w-full !py-3.5 text-base"
                        >
                            <Sparkles className="w-5 h-5" />
                            Generate Starting Profile
                        </button>
                    </div>

                    {/* Right: Output */}
                    <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col">
                        {result ? (
                            <>
                                <div className="mb-4">
                                    <h3 className="font-semibold text-foreground">Conservative starting profile</h3>
                                    <p className="text-xs text-text-dim mt-1">Setting names can change by DH build. Match the value by meaning in your current settings screen.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        ['LOD distance', `${result.settings.lodDistance} chunks`],
                                        ['LOD quality', result.settings.lodQuality],
                                        ['Builder threads', `${result.settings.builderThreads}`],
                                        ['CPU load', result.settings.cpuLoad],
                                        ['Cave rendering', result.settings.caveRendering ? 'On' : 'Off'],
                                        ['Vanilla distance', `${result.settings.vanillaRenderDistance} chunks`],
                                        ['Minecraft RAM', result.settings.ramAllocation],
                                    ].map(([label, value]) => (
                                        <div key={label} className="rounded-xl border border-border bg-background/60 p-4">
                                            <p className="text-xs text-text-dim mb-1">{label}</p>
                                            <p className="font-semibold">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Suggestions */}
                                {result.suggestions.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                            How to validate the profile
                                        </h4>
                                        {result.suggestions.map((s, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-text-muted bg-surface/50 rounded-lg px-3 py-2">
                                                <span className="shrink-0 mt-0.5">•</span>
                                                {s}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p className="mt-4 text-xs text-text-dim">This is a starting profile, not a guaranteed FPS benchmark. Increase distance and quality gradually after generation stabilizes.</p>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-center">
                                <div>
                                    <Sparkles className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                                    <p className="text-text-muted font-medium">Configure your hardware</p>
                                    <p className="text-sm text-text-dim mt-1">
                                        Select your specs to get conservative settings and a validation checklist
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
