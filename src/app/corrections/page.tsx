import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Corrections',
  description: 'Report a factual error, outdated compatibility result, broken link, or unsafe instruction on DistantHorizonsGuide.com.',
  alternates: { canonical: `${siteConfig.url}/corrections` },
  ...socialMetadata(
    'Corrections',
    'Report a factual error, outdated compatibility result, broken link, or unsafe instruction on DistantHorizonsGuide.com.',
    '/corrections',
  ),
};

export default function CorrectionsPage() {
  return (
    <article className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-sm text-primary mb-4">Editorial accountability</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Report a correction</h1>
      <p className="text-lg text-text-muted leading-relaxed mb-10">Compatibility and installation details can change quickly. If a page is wrong or unsafe for a specific version, send enough information for the editorial team to reproduce or verify the issue.</p>

      <div className="rounded-2xl border border-border bg-surface/50 p-6 mb-10">
        <h2 className="text-xl font-bold mb-3">Email</h2>
        <a className="text-primary text-lg font-semibold hover:underline" href={`mailto:${siteConfig.contactEmail}?subject=Guide%20correction`}>{siteConfig.contactEmail}</a>
      </div>

      <div className="space-y-8 text-text-muted leading-relaxed">
        <section><h2 className="text-2xl font-bold text-foreground mb-3">What to include</h2><ul className="list-disc pl-5 space-y-2"><li>The page URL and exact statement that needs correction.</li><li>Minecraft, Distant Horizons, loader, renderer, and shader versions where relevant.</li><li>A link to an official release note, issue, log excerpt, or reproducible test.</li><li>Whether the issue is factual, outdated, unclear, or unsafe.</li></ul></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">How corrections are handled</h2><p>We review the supplied evidence, update the page when the correction is supported, and change the editorial review date for material revisions. Reports without enough evidence may be noted for investigation rather than published as confirmed facts.</p></section>
      </div>
    </article>
  );
}
