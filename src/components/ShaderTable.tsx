'use client';

import { useState } from 'react';
import Link from 'next/link';
import shaders from '@/data/shaders.json';
import { analyticsEvent } from '@/lib/analytics';

export default function ShaderTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const visible = shaders.filter((shader) => shader.name.toLowerCase().includes(search.trim().toLowerCase()) && (status === 'all' || shader.status === status));
  const openDetails = (slug: string) => analyticsEvent('open_shader_details', { shader: slug, source: 'compatibility_database' });
  return <section id="shaders" className="py-12 sm:py-16 border-t border-border/30"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="section-title">Distant Horizons Shader Compatibility Database</h1>
    <p className="section-subtitle">Which shaders work with Distant Horizons? Start with a pack that explicitly supports DH, then match its requirements to your Minecraft, DH and Iris builds. Loading on Iris alone does not prove DH support.</p>
    <div className="my-6 border-l-2 border-primary pl-5 text-sm text-text-muted leading-relaxed">
      <p><strong className="text-foreground">A documented starting point:</strong> <Link href="/shaders/photon-shader" className="text-primary underline" onClick={() => openDetails('photon-shader')}>Photon</Link> lists DH in its mod compatibility notes. Its author excludes Apple GPUs (Metal). Check the selected archive before installing; this is not a tested build combination.</p>
      <p className="mt-2">Looking for <Link href="/shaders/complementary-reimagined" className="text-primary underline" onClick={() => openDetails('complementary-reimagined')}>Complementary</Link>, <Link href="/shaders/bliss-shaders" className="text-primary underline" onClick={() => openDetails('bliss-shaders')}>Bliss</Link> or <Link href="/shaders/kappa-shader" className="text-primary underline" onClick={() => openDetails('kappa-shader')}>Kappa</Link>? Open the pack’s evidence notes rather than assuming all releases have the same support.</p>
    </div>
    <details className="mt-6 mb-8 rounded-xl border border-border p-5 text-sm text-text-muted">
      <summary className="cursor-pointer font-semibold text-foreground">How to read compatibility evidence</summary>
      <div className="space-y-3 mt-4">
      <p><strong className="text-foreground">Author documents DH:</strong> the linked project description explicitly mentions DH support, but an exact working Minecraft / DH / Iris / shader combination is still unverified.</p>
      <p><strong className="text-foreground">Unknown:</strong> the reviewed source does not establish that combination. This is neither an incompatibility verdict nor a recommendation to install it.</p>
      <p>Iris requires the shader pack to explicitly implement DH support. A pack loading successfully on Iris does not establish that its distant terrain renders correctly. <a className="text-primary underline" href="https://www.irisshaders.dev/" target="_blank" rel="noopener noreferrer">Iris compatibility FAQ</a></p>
      <p>Pack reviews are dated individually. Photon and the Iris requirements were checked October 28, 2026; other pack reviews retain their stated dates. No in-game compatibility or FPS benchmark is claimed.</p>
      </div>
    </details>
    <div className="flex flex-wrap gap-4 mb-6">
      <label className="flex-1 min-w-48 text-sm">Search shaders<input className="block mt-2 w-full rounded-lg border border-border bg-surface p-3" placeholder="Search shaders..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      <label className="text-sm">Evidence<select className="block mt-2 rounded-lg border border-border bg-surface p-3" value={status} onChange={(event) => { setStatus(event.target.value); analyticsEvent('filter_shaders', { evidence: event.target.value }); }}><option value="all">All entries</option><option value="author-documented">Author documents DH</option><option value="unknown">Unknown combination</option></select></label>
      {(search || status !== 'all') && <button className="btn-secondary self-end !py-3" onClick={() => { setSearch(''); setStatus('all'); }}>Clear filters</button>}
    </div>
    <p className="text-sm text-text-dim mb-4" aria-live="polite">{visible.length} of {shaders.length} entries</p>
    <div className="divide-y divide-border border-y border-border">{visible.map((shader) => <article key={shader.slug} className="py-6 grid gap-3 md:grid-cols-[1fr_2fr]">
      <div><h2 className="font-semibold text-lg"><Link className="text-primary hover:underline" href={`/shaders/${shader.slug}`} onClick={() => openDetails(shader.slug)}>{shader.name}</Link></h2><p className="text-sm text-text-dim mt-2">{shader.status === 'author-documented' ? 'Author documents DH' : 'Exact combination unknown'}</p></div>
      <div><p className="text-sm text-text-muted leading-relaxed">{shader.sourceNote}</p><Link className="inline-block text-sm text-primary mt-3 hover:underline" href={`/shaders/${shader.slug}`} onClick={() => openDetails(shader.slug)}>Read sources and setup checks</Link></div>
    </article>)}</div>
    {visible.length === 0 && <p className="py-8 text-text-muted">No matching entries. Clear the search or choose All entries.</p>}
  </div></section>;
}
