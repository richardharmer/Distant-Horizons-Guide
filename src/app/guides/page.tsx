import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Wrench, Gauge, Sparkles, Cpu, Users, GitCompare } from 'lucide-react';
import { guides } from '@/data/guides';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Distant Horizons Troubleshooting Guides',
  description: 'Practical, version-aware guides for Distant Horizons performance, shaders, RAM, LOD generation, crashes, and installation problems.',
  alternates: { canonical: `${siteConfig.url}/guides` },
};

const icons = { Performance: Gauge, Shaders: Sparkles, Troubleshooting: Wrench, Multiplayer: Users, Compatibility: Wrench, Hardware: Cpu, Comparisons: GitCompare };

export default function GuidesPage() {
  return <div className="pt-20"><section className="py-20 sm:py-28"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl mb-12"><div className="inline-flex items-center gap-2 text-primary text-sm mb-4"><BookOpen className="w-4 h-4" /> Version-aware help center</div><h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Distant Horizons troubleshooting guides</h1><p className="text-lg text-text-muted leading-relaxed">Start with the symptom you see in game. Every guide gives you a conservative fix first, the settings to change, and the information to include when you ask the community for help.</p></div><div className="grid gap-5 sm:grid-cols-2">{guides.map((guide) => { const Icon = icons[guide.category as keyof typeof icons] || Wrench; return <Link key={guide.slug} href={`/guides/${guide.slug}`} className="glass rounded-2xl p-6 card-hover group"><div className="flex items-center justify-between mb-4"><span className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary"><Icon className="w-4 h-4" />{guide.category}</span><ArrowRight className="w-4 h-4 text-text-dim group-hover:text-primary transition-colors" /></div><h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{guide.title}</h2><p className="text-sm text-text-muted leading-relaxed">{guide.description}</p><p className="text-xs text-text-dim mt-5">Last verified {guide.updated}</p></Link>; })}</div></div></section></div>;
}
