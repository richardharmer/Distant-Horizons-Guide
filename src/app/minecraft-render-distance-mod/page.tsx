import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Eye, Gauge, Layers, X } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Minecraft Render Distance Mod: Distant Horizons Explained',
  description: 'Looking for a Minecraft render distance mod? Compare Distant Horizons with Voxy, Bobby, and vanilla settings, then choose the right setup for your world.',
  alternates: { canonical: `${siteConfig.url}/minecraft-render-distance-mod` },
  openGraph: { title: 'Minecraft Render Distance Mod: Distant Horizons Explained', description: 'Compare Minecraft render distance mods and learn which Distant Horizons setup fits your world.' },
};

const comparisons = [
  { name: 'Distant Horizons', best: 'Very distant simplified terrain', detail: 'Builds and renders Level of Detail terrain beyond normal full-detail chunks.', strengths: ['Large visual horizon', 'Dedicated shader integration path', 'Useful for explored and generated worlds'] },
  { name: 'Bobby', best: 'Previously loaded chunks', detail: 'Keeps and renders chunks that the client has already received, rather than generating a new LOD world.', strengths: ['Simple cache-focused approach', 'Useful for revisiting loaded areas', 'Different goal from a full LOD generator'] },
  { name: 'Voxy', best: 'An alternative distant-terrain system', detail: 'Uses its own distant-terrain approach and should be tested against the exact Minecraft version and modpack.', strengths: ['Alternative rendering model', 'Worth comparing for specific modpacks', 'Check current loader support first'] },
];

export default function MinecraftRenderDistanceModPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Minecraft Render Distance Mod: Distant Horizons Explained', description: metadata.description, author: { '@type': 'Organization', name: siteConfig.name }, mainEntityOfPage: `${siteConfig.url}/minecraft-render-distance-mod` };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="pt-20"><section className="py-20 sm:py-28 border-b border-border/30"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="inline-flex items-center gap-2 text-sm text-primary mb-5"><Eye className="w-4 h-4" /> Minecraft render distance guide</div>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Minecraft render distance mods: is Distant Horizons right for you?</h1>
      <p className="text-lg text-text-muted leading-relaxed max-w-3xl">If you want to see farther in Minecraft, a render distance mod can be more practical than pushing vanilla view distance to an extreme value. Distant Horizons uses simplified Level of Detail terrain so the far horizon does not need every distant chunk rendered at full detail.</p>
      <div className="flex flex-wrap gap-3 mt-8"><Link href="/install/1-21-11" className="btn-primary">Install Distant Horizons <ArrowRight className="w-4 h-4" /></Link><Link href="/hardware" className="btn-secondary">Choose hardware settings</Link></div>
    </div></section>
    <section className="py-14"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-3 mb-14">{comparisons.map((item) => <div key={item.name} className="glass rounded-2xl p-6"><Layers className="w-6 h-6 text-primary mb-5" /><h2 className="text-xl font-bold mb-2">{item.name}</h2><p className="text-sm text-primary mb-3">Best for: {item.best}</p><p className="text-sm text-text-muted leading-relaxed mb-5">{item.detail}</p><ul className="space-y-2">{item.strengths.map((strength) => <li key={strength} className="flex gap-2 text-sm text-text-muted"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />{strength}</li>)}</ul></div>)}</div>
      <div className="max-w-4xl mx-auto"><h2 className="text-3xl font-bold mb-5">How to get more render distance in Minecraft</h2><div className="space-y-4 text-text-muted leading-relaxed"><p>Start by lowering vanilla render distance to around 8–12 chunks, then let Distant Horizons handle the far terrain. This keeps nearby blocks at full detail while using LODs for the horizon.</p><p>For a new setup, choose the Minecraft version and loader first. Fabric commonly uses Sodium and Iris; NeoForge profiles use their matching performance and shader stack. Always match every dependency to the exact Minecraft version.</p><p>More distance is not free. LOD generation uses CPU time, memory, storage, and sometimes GPU resources. Increase the distance gradually and wait for the generator to catch up before judging performance.</p></div><div className="grid gap-4 sm:grid-cols-2 mt-8"><Link href="/calculator" className="glass rounded-xl p-5 card-hover"><Gauge className="w-5 h-5 text-primary mb-3" /><h3 className="font-semibold mb-2">Generate best settings</h3><p className="text-sm text-text-muted">Create a conservative profile for your CPU, GPU, RAM, and shader choice.</p></Link><Link href="/guides/distant-horizons-low-fps" className="glass rounded-xl p-5 card-hover"><X className="w-5 h-5 text-primary mb-3" /><h3 className="font-semibold mb-2">Fix low FPS and stutter</h3><p className="text-sm text-text-muted">Tune generation load and render distance when the horizon causes stutter.</p></Link></div></div>
    </div></section></article>
  </>;
}
