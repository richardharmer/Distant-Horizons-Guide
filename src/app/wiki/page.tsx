import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Download, Gauge, Server, Sparkles, Wrench } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Distant Horizons Wiki: Config Files, Settings & Troubleshooting',
  description: 'A practical Distant Horizons wiki for Minecraft Java Edition: configuration files, settings, installation, dependencies, shaders, multiplayer, commands, and fixes.',
  alternates: { canonical: `${siteConfig.url}/wiki` },
};

const sections = [
  { href: '/install/1-21-11', title: 'Installation and dependencies', text: 'Choose a Minecraft version and loader, then install the matching DH build.', icon: Download },
  { href: '/shaders', title: 'Shader compatibility', text: 'Check tested shader packs, loaders, performance impact, and known issues.', icon: Sparkles },
  { href: '/calculator', title: 'Best settings calculator', text: 'Generate a conservative starting profile for your CPU, GPU, RAM, and shaders.', icon: Gauge },
  { href: '/guides/distant-horizons-server-commands', title: 'Servers and commands', text: 'Understand client-only play, server generation, /dh commands, and pre-generation.', icon: Server },
  { href: '/guides', title: 'Troubleshooting', text: 'Fix crashes, empty LODs, flickering, memory issues, and renderer conflicts.', icon: Wrench },
  { href: '/about', title: 'What is Distant Horizons?', text: 'Learn how the Minecraft LOD system extends the visible horizon.', icon: BookOpen },
];

export default function WikiPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Distant Horizons Wiki', url: `${siteConfig.url}/wiki`, description: metadata.description };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="pt-20"><section className="py-20 sm:py-28"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl mb-12"><div className="inline-flex items-center gap-2 text-sm text-primary mb-4"><BookOpen className="w-4 h-4" /> Community wiki</div><h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Distant Horizons Wiki</h1><p className="text-lg text-text-muted leading-relaxed">A practical knowledge base for the Distant Horizons Minecraft Java Edition mod. Find the right installation, understand the LOD system, choose shader settings, and troubleshoot the problem you actually see.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{sections.map((section) => { const Icon = section.icon; return <Link key={section.href} href={section.href} className="glass rounded-2xl p-6 card-hover group"><Icon className="w-6 h-6 text-primary mb-5" /><h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{section.title}</h2><p className="text-sm text-text-muted leading-relaxed mb-4">{section.text}</p><span className="inline-flex items-center gap-2 text-sm text-primary">Open section <ArrowRight className="w-4 h-4" /></span></Link>; })}</div><section id="config-file" className="mt-10 glass rounded-2xl p-6"><h2 className="text-2xl font-bold mb-3">Distant Horizons config files and settings</h2><p className="text-text-muted leading-relaxed">For normal setup, open the Distant Horizons button in Minecraft&apos;s options or pause menu and change one setting at a time. Start with vanilla render distance, LOD distance, quality, and generation load; then wait for new terrain to finish generating before judging the result.</p><p className="text-text-muted leading-relaxed mt-3">If you are troubleshooting a configuration file, first record the exact Minecraft version, loader, Distant Horizons build, and whether the problem happens in a clean profile. File locations and setting names can change between releases, so use version-matched project guidance before editing files manually.</p><div className="flex flex-wrap gap-3 mt-5"><Link href="/guides/distant-horizons-best-settings" className="btn-primary !py-2.5">Choose best settings <ArrowRight className="w-4 h-4" /></Link><Link href="/calculator" className="btn-secondary !py-2.5">Generate a starting profile</Link></div></section><div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6"><h2 className="font-semibold mb-2">Unofficial community reference</h2><p className="text-sm text-text-muted leading-relaxed">This wiki summarizes public project documentation and community testing. Always match the exact Minecraft version, loader, Distant Horizons build, and shader version before installing.</p></div></div></section></div></>;
}
