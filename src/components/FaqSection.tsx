'use client';

import { useState } from 'react';
import { ChevronDown, Info, Download as DownloadIcon, Gauge, Palette, Wrench } from 'lucide-react';
import faqData from '@/data/faq.json';

interface FaqQuestion {
    q: string;
    a: string;
}

interface FaqCategory {
    category: string;
    icon: string;
    questions: FaqQuestion[];
}

const iconMap: Record<string, React.ElementType> = {
    info: Info,
    download: DownloadIcon,
    gauge: Gauge,
    palette: Palette,
    wrench: Wrench,
};

export default function FaqSection() {
    const categories = faqData as FaqCategory[];
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggle = (key: string) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    return (
        <section id="faq" className="py-20 sm:py-28 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[180px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="section-title">
                        <span className="gradient-text">Frequently Asked Questions</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Common questions about Distant Horizons answered.
                        Can&apos;t find what you&apos;re looking for? Check the community resources below.
                    </p>
                </div>

                <div className="space-y-8">
                    {categories.map((cat) => {
                        const Icon = iconMap[cat.icon] || Info;
                        return (
                            <div key={cat.category} className="glass rounded-2xl overflow-hidden">
                                {/* Category header */}
                                <div className="flex items-center gap-3 px-6 py-4 bg-surface/30 border-b border-border/50">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">{cat.category}</h3>
                                    <span className="text-xs text-text-dim ml-auto">{cat.questions.length} questions</span>
                                </div>

                                {/* Questions */}
                                <div className="divide-y divide-border/30">
                                    {cat.questions.map((faq, qi) => {
                                        const key = `${cat.category}-${qi}`;
                                        const isOpen = openItems.has(key);
                                        return (
                                            <div key={key}>
                                                <button
                                                    onClick={() => toggle(key)}
                                                    className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-surface/20 transition-colors"
                                                >
                                                    <span className="flex-1 text-sm font-medium text-foreground">
                                                        {faq.q}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-4 h-4 text-text-dim shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 pb-5 animate-fade-in">
                                                        <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line pl-0 border-l-2 border-primary/30 ml-0 p-4 rounded-r-lg bg-surface/30">
                                                            {faq.a}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Community links */}
                <div className="mt-12 glass rounded-2xl p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-3">Still need help?</h3>
                    <p className="text-sm text-text-muted mb-4">
                        Join the community for real-time support and the latest updates.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <a
                            href="https://discord.gg/distanthorizons"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary !py-2 !px-5 text-sm"
                        >
                            Discord Server
                        </a>
                        <a
                            href="https://www.reddit.com/r/DistantHorizons/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary !py-2 !px-5 text-sm"
                        >
                            r/DistantHorizons
                        </a>
                        <a
                            href="https://github.com/Jonodonozym/DistantHorizonsStub/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary !py-2 !px-5 text-sm"
                        >
                            GitHub Issues
                        </a>
                    </div>
                </div>

                {/* SEO text */}
                <div className="mt-12 max-w-3xl mx-auto text-center">
                    <p className="text-sm text-text-dim leading-relaxed">
                        Find answers to common Distant Horizons questions including how to install on Fabric and NeoForge,
                        fix performance issues, resolve shader compatibility problems, and compare with alternatives like Voxy.
                        Whether you&apos;re wondering if Distant Horizons is client-side only or how to fix chunk flickering,
                        our community-sourced FAQ has you covered.
                    </p>
                </div>
            </div>
        </section>
    );
}
