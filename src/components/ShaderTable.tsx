'use client';

import { useState } from 'react';
import Link from 'next/link';
import shaders from '@/data/shaders.json';

export default function ShaderTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const visible = shaders.filter((shader) => shader.name.toLowerCase().includes(search.toLowerCase()) && (status === 'all' || shader.status === status));
  return <section id="shaders" className="py-20 sm:py-28 border-t border-border/30"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="section-title">Distant Horizons Shader Compatibility Database</h1>
    <p className="section-subtitle">Check what the author actually documents before choosing a shader. Source review: October 18, 2026. No in-game compatibility tests or FPS benchmarks were performed for this review.</p>
    <div className="mt-6 mb-8 rounded-xl border border-border p-5 text-sm text-text-muted space-y-3">
      <p><strong className="text-foreground">Author documents DH:</strong> the linked project description explicitly mentions DH support, but an exact working Minecraft / DH / Iris / shader combination is still unverified.</p>
      <p><strong className="text-foreground">Unknown:</strong> the reviewed source does not establish that combination. This is neither an incompatibility verdict nor a recommendation to install it.</p>
      <p>Iris requires the shader pack to explicitly implement DH support. A pack loading successfully on Iris does not establish that its distant terrain renders correctly. <a className="text-primary underline" href="https://www.irisshaders.dev/" target="_blank" rel="noopener noreferrer">Iris compatibility FAQ</a></p>
    </div>
    <div className="flex flex-wrap gap-4 mb-6">
      <label className="flex-1 min-w-48 text-sm">Search shaders<input className="block mt-2 w-full rounded-lg border border-border bg-surface p-3" placeholder="Search shaders..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      <label className="text-sm">Evidence<select className="block mt-2 rounded-lg border border-border bg-surface p-3" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All entries</option><option value="author-documented">Author documents DH</option><option value="unknown">Unknown combination</option></select></label>
    </div>
    <p className="text-sm text-text-dim mb-4" aria-live="polite">{visible.length} of {shaders.length} entries</p>
    <div className="divide-y divide-border border-y border-border">{visible.map((shader) => <article key={shader.slug} className="py-6 grid gap-3 md:grid-cols-[1fr_2fr]">
      <div><h2 className="font-semibold text-lg"><Link className="text-primary hover:underline" href={`/shaders/${shader.slug}`}>{shader.name}</Link></h2><p className="text-sm text-text-dim mt-2">{shader.status === 'author-documented' ? 'Author documents DH' : 'Exact combination unknown'}</p></div>
      <div><p className="text-sm text-text-muted leading-relaxed">{shader.sourceNote}</p><Link className="inline-block text-sm text-primary mt-3 hover:underline" href={`/shaders/${shader.slug}`}>Read sources and setup checks</Link></div>
    </article>)}</div>
    {visible.length === 0 && <p className="py-8 text-text-muted">No matching entries. Clear the search or choose All entries.</p>}
  </div></section>;
}
