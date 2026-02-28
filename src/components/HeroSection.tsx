'use client';

import { ChevronDown, Layers, Calculator, Download, HelpCircle } from 'lucide-react';
import ImageSlider from '@/components/ImageSlider';

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
        title: 'Installation Guide',
        description: 'Step-by-step setup for Fabric & NeoForge',
        href: '/install/1-21-1',
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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[200px]" />
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    The Ultimate Minecraft LOD Mod Resource
                </div>

                {/* Title */}
                <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6" style={{ animationDelay: '0.1s' }}>
                    Unlock{' '}
                    <span className="gradient-text-animated">Infinite Horizons</span>
                    <br />
                    <span className="text-text-muted text-2xl sm:text-3xl md:text-4xl font-medium">
                        Distant Horizons Guide &amp; Configuration Hub
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="animate-fade-in-up text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ animationDelay: '0.2s' }}>
                    Your complete resource for the Distant Horizons mod — shader compatibility database,
                    smart config generator, installation guides, and community-driven troubleshooting.
                </p>

                {/* CTA buttons */}
                <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationDelay: '0.3s' }}>
                    <a href="#shaders" className="btn-primary text-base !py-3.5 !px-8">
                        <Layers className="w-5 h-5" />
                        Check Shader Compatibility
                    </a>
                    <a href="#calculator" className="btn-secondary text-base !py-3.5 !px-8">
                        <Calculator className="w-5 h-5" />
                        Generate Optimal Config
                    </a>
                </div>

                {/* Before / After comparison slider */}
                <div className="animate-fade-in-up max-w-4xl mx-auto mb-16" style={{ animationDelay: '0.4s' }}>
                    <ImageSlider
                        beforeSrc="/before.png"
                        afterSrc="/after.png"
                        beforeLabel="Vanilla — 16 Chunks"
                        afterLabel="DH — 512 Chunks"
                    />
                </div>

                {/* Feature cards */}
                <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {features.map((feature) => (
                        <a
                            key={feature.title}
                            href={feature.href}
                            className="group glass rounded-xl p-5 text-left card-hover"
                        >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                                <feature.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                            <p className="text-sm text-text-muted">{feature.description}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
                <a href="#shaders" className="flex flex-col items-center gap-2 text-text-dim hover:text-primary transition-colors">
                    <span className="text-xs font-medium">Scroll to explore</span>
                    <ChevronDown className="w-5 h-5" />
                </a>
            </div>
        </section>
    );
}
