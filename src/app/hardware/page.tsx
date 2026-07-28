import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Laptop, MemoryStick, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Distant Horizons Hardware Settings',
  description: 'Practical Distant Horizons settings for low-end PCs, laptops, integrated graphics, and common gaming GPUs.',
  alternates: { canonical: `${siteConfig.url}/hardware` },
};

const profiles = [
  { slug: 'distant-horizons-best-settings-laptop', title: 'Laptops and integrated graphics', icon: Laptop, distance: '64–128 chunks', quality: 'Low to medium', note: 'Prioritize stable frame pacing and temperatures.' },
  { title: 'Mainstream gaming PC', icon: Cpu, distance: '128–256 chunks', quality: 'Medium', note: 'A practical starting point for most dedicated GPUs.' },
  { title: 'High-end gaming PC', icon: Sparkles, distance: '256–512 chunks', quality: 'Medium to high', note: 'Increase distance only after LOD generation catches up.' },
  { title: 'Large modpack or shaders', icon: MemoryStick, distance: '64–256 chunks', quality: 'Low to medium', note: 'Reserve memory and GPU headroom for the rest of the instance.' },
];

export default function HardwarePage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Distant Horizons Hardware Settings', url: `${siteConfig.url}/hardware` };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="pt-20"><section className="py-20 sm:py-28"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12"><div className="inline-flex items-center gap-2 text-sm text-primary mb-4"><Cpu className="w-4 h-4" /> Hardware profiles</div><h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Distant Horizons settings for your PC</h1><p className="text-lg text-text-muted leading-relaxed">Start with a profile that leaves headroom for Minecraft, shaders, modpacks, and the operating system. These are starting points, not guaranteed FPS promises: generation speed depends on your CPU, GPU, memory, storage, and world.</p></div>
      <div className="grid gap-5 sm:grid-cols-2">{profiles.map((profile) => { const Icon = profile.icon; return <div key={profile.title} className="glass rounded-2xl p-6"><Icon className="w-6 h-6 text-primary mb-5" /><h2 className="text-xl font-bold mb-3">{profile.title}</h2><div className="grid grid-cols-2 gap-3 text-sm mb-4"><div className="rounded-xl bg-surface/60 p-3"><span className="block text-xs text-text-dim mb-1">Start distance</span><span className="font-semibold">{profile.distance}</span></div><div className="rounded-xl bg-surface/60 p-3"><span className="block text-xs text-text-dim mb-1">LOD quality</span><span className="font-semibold">{profile.quality}</span></div></div><p className="text-sm text-text-muted leading-relaxed">{profile.note}</p>{profile.slug && <Link href={`/guides/${profile.slug}`} className="inline-flex items-center gap-2 text-sm text-primary mt-5">Read the laptop guide <ArrowRight className="w-4 h-4" /></Link>}</div>; })}</div>
      <div className="mt-10 glass rounded-2xl p-6"><h2 className="text-2xl font-bold mb-3">Tune in this order</h2><p className="text-text-muted leading-relaxed">Set vanilla render distance first, then DH LOD distance, LOD quality, CPU load, and shaders. Change one setting at a time and wait for generation to stabilize. More RAM cannot fix a GPU bottleneck or make a server send chunks faster.</p><div className="flex flex-wrap gap-3 mt-6"><Link href="/calculator" className="btn-primary">Generate a starting profile <ArrowRight className="w-4 h-4" /></Link><Link href="/guides/distant-horizons-low-fps" className="btn-secondary">Fix low FPS</Link></div></div>
    </div></section></div>
  </>;
}
