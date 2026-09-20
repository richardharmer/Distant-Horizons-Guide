import { ArrowRight, CheckCircle2, Layers, Calculator, Download, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

const features = [
    {
        icon: Layers,
        title: 'Shader Compatibility',
        description: 'Find which shaders work with Distant Horizons',
        href: '/shaders',
        color: 'from-blue-500 to-cyan-400',
    },
    {
        icon: Calculator,
        title: 'Config Generator',
        description: 'Get optimized settings for your hardware',
        href: '/calculator',
        color: 'from-green-500 to-emerald-400',
    },
    {
        icon: Download,
        title: 'Install Distant Horizons 3.3',
        description: 'Minecraft 1.21.11 setup for Fabric & NeoForge',
        href: '/install/1-21-11',
        color: 'from-purple-500 to-violet-400',
    },
    {
        icon: HelpCircle,
        title: 'FAQ & Troubleshoot',
        description: 'Fix common issues and learn more',
        href: '/faq',
        color: 'from-orange-500 to-amber-400',
    },
];

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                    <div className="text-center lg:text-left">
                        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            Independent guide · verified for {siteConfig.currentReleaseLabel}
                        </div>

                        <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6" style={{ animationDelay: '0.1s' }}>
                            <span className="gradient-text-animated">Distant Horizons Mod</span>{' '}for Minecraft
                            <br />
                            <span className="text-text-muted text-2xl sm:text-3xl font-medium">
                                Guide, Shaders, Settings &amp; Troubleshooting
                            </span>
                        </h1>

                        <p className="animate-fade-in-up text-text-muted text-lg max-w-2xl mx-auto lg:mx-0 mb-8" style={{ animationDelay: '0.2s' }}>
                            Install the right build, choose a stable starting profile, check shader compatibility,
                            and fix LOD problems with version-aware guidance.
                        </p>

                        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-3 justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
                            <Link href="/install/1-21-11" className="btn-primary text-base !py-3.5 !px-7">
                                <Download className="w-5 h-5" />
                                Install Distant Horizons 3.3
                            </Link>
                            <Link href="/guides/distant-horizons-best-settings" className="btn-secondary text-base !py-3.5 !px-7">
                                Choose Safe Settings
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="animate-fade-in-up flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-6 text-sm" style={{ animationDelay: '0.35s' }}>
                            <Link href="/shaders" className="text-text-muted hover:text-primary transition-colors">Shader compatibility</Link>
                            <Link href="/guides/distant-horizons-how-to-use" className="text-text-muted hover:text-primary transition-colors">First-time setup</Link>
                            <Link href="/guides" className="text-text-muted hover:text-primary transition-colors">Troubleshooting</Link>
                        </div>
                    </div>

                    <div className="animate-fade-in-up rounded-2xl border border-border bg-surface/80 p-5 sm:p-7" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-start justify-between gap-4 pb-5 border-b border-border/70">
                            <div>
                                <p className="text-xs uppercase tracking-[0.16em] text-text-dim mb-2">Verified setup snapshot</p>
                                <h2 className="text-xl font-bold">A safe Distant Horizons starting point</h2>
                            </div>
                            <span className="shrink-0 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                                DH {siteConfig.currentRelease}
                            </span>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 py-6">
                            <div>
                                <dt className="text-xs text-text-dim mb-1">Minecraft</dt>
                                <dd className="font-semibold">1.21.11</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-text-dim mb-1">Loaders</dt>
                                <dd className="font-semibold">Fabric / NeoForge</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-text-dim mb-1">Vanilla distance</dt>
                                <dd className="font-semibold">8–12 chunks</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-text-dim mb-1">LOD distance</dt>
                                <dd className="font-semibold">64–128 chunks</dd>
                            </div>
                        </dl>

                        <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                            <div className="flex items-center justify-between gap-4 mb-3">
                                <span className="text-sm font-semibold">Recommended setup order</span>
                                <span className="text-xs text-text-dim">Conservative profile</span>
                            </div>
                            <ol className="space-y-2.5 text-sm text-text-muted">
                                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />Install the matching DH file and loader.</li>
                                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />Test LOD generation without shaders first.</li>
                                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />Add a verified compatible shader last.</li>
                            </ol>
                        </div>

                        <p className="mt-4 text-xs leading-relaxed text-text-dim">
                            Starting values, not a performance guarantee. Results depend on hardware, modpack, world generation, and shader load.
                        </p>
                    </div>
                </div>

                {/* Feature cards */}
                <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
                    {features.map((feature) => (
                        <Link
                            key={feature.title}
                            href={feature.href}
                            className="group rounded-xl border border-border/70 bg-surface/45 p-5 text-left card-hover"
                        >
                            <feature.icon className="w-5 h-5 text-primary mb-4" />
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-sm text-text-muted">{feature.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
