import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ExternalLink } from 'lucide-react';
import shadersData from '@/data/shaders.json';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

interface Props { params: Promise<{ slug: string }> }

const getShader = (slug: string) => shadersData.find((shader) => shader.slug === slug);

export function generateStaticParams() {
  return shadersData.map((shader) => ({ slug: shader.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shader = getShader((await params).slug);
  if (!shader) return {};
  const title = `${shader.name} + Distant Horizons Compatibility & Settings`;
  return {
    title,
    description: `${shader.name} compatibility with Distant Horizons: evidence scope, Minecraft versions, loaders, settings, and known limitations.`,
    alternates: { canonical: `${siteConfig.url}/shaders/${shader.slug}` },
    ...socialMetadata(title, `${shader.name} compatibility notes for Distant Horizons.`, `/shaders/${shader.slug}`, 'article'),
  };
}

export default async function ShaderDetailPage({ params }: Props) {
  const shader = getShader((await params).slug);
  if (!shader) notFound();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${shader.name} + Distant Horizons Compatibility`,
    author: { '@type': 'Organization', name: 'DistantHorizonsGuide Editorial Team' },
    mainEntityOfPage: `${siteConfig.url}/shaders/${shader.slug}`,
  };
  const statusClass = shader.status === 'compatible' ? 'badge-compatible' : shader.status === 'partial' ? 'badge-partial' : 'badge-incompatible';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="pt-20">
        <section className="py-20 sm:py-28 border-b border-border/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 mb-5">
              <span className={`badge ${statusClass}`}>{shader.status}</span>
              <span className="text-sm text-text-dim">Evidence date {shader.lastTested}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-5">{shader.name} with Distant Horizons</h1>
            <p className="text-lg text-text-muted leading-relaxed">This page records the compatibility evidence currently available for {shader.name}, including its version scope, recommended setup, and known limitations. It does not claim that every current build has been retested.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href={shader.link} target="_blank" rel="noopener noreferrer" className="btn-primary">Official shader page <ExternalLink className="w-4 h-4" /></a>
              <Link href="/shaders" className="btn-secondary">Back to database</Link>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Evidence scope</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-text-dim">Recorded DH version</dt><dd>{shader.dhVersion}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-text-dim">Minecraft versions</dt><dd className="text-right">{shader.mcVersions.join(', ')}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-text-dim">Loaders</dt><dd>{shader.loaders.join(', ')}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-text-dim">Performance category</dt><dd>{shader.performance}</dd></div>
              </dl>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-3">Recorded settings</h2>
              <p className="text-text-muted leading-relaxed">{shader.settings}</p>
              <h2 className="font-semibold mt-6 mb-3">Known limitations</h2>
              <p className="text-text-muted leading-relaxed">{shader.knownIssues}</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-warning/25 bg-warning/5 p-6">
              <h2 className="font-semibold mb-2">Verify before changing your main profile</h2>
              <p className="text-sm text-text-muted leading-relaxed">Test in a separate instance and record the exact Minecraft, DH, loader, renderer, shader build, GPU, and driver. A newer build may behave differently from this dated entry.</p>
              <Link href="/testing-methodology" className="inline-block text-sm text-primary mt-4 hover:underline">Read the testing methodology</Link>
            </section>
            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="font-semibold mb-2">Need a complete setup?</h2>
              <p className="text-sm text-text-muted mb-4">Install the matching DH file first, verify LODs without shaders, then add one shader build.</p>
              <div className="flex flex-wrap gap-3"><Link href="/install/1-21-11" className="btn-primary !py-2.5">Install DH <ArrowRight className="w-4 h-4" /></Link><Link href="/guides/distant-horizons-shader-not-working" className="btn-secondary !py-2.5">Troubleshoot</Link></div>
            </section>
          </div>
        </section>
      </article>
    </>
  );
}
