import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { getGuide, guides } from '@/data/guides';
import { siteConfig } from '@/data/site';
import BestSettingsGuide from '@/components/BestSettingsGuide';

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${siteConfig.url}/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, type: 'article', modifiedTime: guide.updated },
  };
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const relatedGuides = guide.related.map((slug) => getGuide(slug)).filter(Boolean);
  const isShaderGuide = guide.category === 'Shaders';
  const schema = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: guide.title,
    description: guide.description, dateModified: guide.updated,
    step: guide.steps.map((step) => ({ '@type': 'HowToStep', name: step.title, text: step.body })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="pt-20">
        <section className="py-20 sm:py-28 border-b border-border/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-primary mb-5"><span className="badge badge-compatible">{guide.category}</span><span>Last verified {guide.updated}</span></div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">{guide.title}</h1>
              <p className="text-lg text-text-muted leading-relaxed max-w-3xl">{guide.intro}</p>
              {guide.quickAnswer && <div className="mt-7 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-5"><h2 className="font-semibold mb-2">Quick answer</h2><p className="text-sm text-text-muted leading-relaxed">{guide.quickAnswer}</p></div>}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/calculator" className="btn-primary">Generate settings <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/install/1-21-1" className="btn-secondary">Open install guide</Link>
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="text-2xl font-bold mb-5">Common symptoms</h2>
              <ul className="grid gap-3 mb-12 sm:grid-cols-2">{guide.symptoms.map((symptom) => <li key={symptom} className="glass rounded-xl p-4 text-sm text-text-muted flex gap-2"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />{symptom}</li>)}</ul>
              <h2 className="text-2xl font-bold mb-6">Step-by-step fix</h2>
              <div className="space-y-6">{guide.steps.map((step, index) => <section key={step.title} className="glass rounded-2xl p-6"><div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold shrink-0">{index + 1}</div><div><h3 className="font-semibold text-lg mb-2">{step.title}</h3><p className="text-text-muted leading-relaxed">{step.body}</p></div></div></section>)}</div>
              {guide.slug === 'distant-horizons-best-settings' && <BestSettingsGuide />}
              <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6"><h2 className="font-semibold mb-2">Still stuck?</h2><p className="text-sm text-text-muted">Record your Minecraft version, DH version, loader, shader pack, GPU, and crash log before asking the community. That information makes compatibility problems much easier to diagnose.</p></div>
            </div>
            <aside className="space-y-5"><div className="glass rounded-2xl p-5"><h2 className="font-semibold mb-3">Useful tools</h2><div className="space-y-3 text-sm"><Link className="flex items-center justify-between text-primary" href="/shaders">Shader compatibility <ArrowRight className="w-4 h-4" /></Link><Link className="flex items-center justify-between text-primary" href="/calculator">Config generator <ArrowRight className="w-4 h-4" /></Link><a className="flex items-center justify-between text-primary" href={siteConfig.officialReleaseUrl} target="_blank" rel="noopener noreferrer">Official releases <ExternalLink className="w-4 h-4" /></a></div></div><div className="glass rounded-2xl p-5"><h2 className="font-semibold mb-3">Related guides</h2><div className="space-y-3">{relatedGuides.map((related) => related && <Link key={related.slug} className="block text-sm text-text-muted hover:text-primary" href={`/guides/${related.slug}`}>{related.title}</Link>)}</div></div>{isShaderGuide && <Link href="/shaders/complementary-reimagined" className="block glass rounded-2xl p-5 text-sm text-primary">Browse tested shader pages <ArrowRight className="inline w-4 h-4 ml-1" /></Link>}</aside>
          </div>
        </section>
      </article>
    </>
  );
}
