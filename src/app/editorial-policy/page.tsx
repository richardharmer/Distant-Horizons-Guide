import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How the DistantHorizonsGuide Editorial Team researches, reviews, sources, updates, and corrects guides.',
  alternates: { canonical: `${siteConfig.url}/editorial-policy` },
  ...socialMetadata(
    'Editorial Policy',
    'How the DistantHorizonsGuide Editorial Team researches, reviews, sources, updates, and corrects guides.',
    '/editorial-policy',
  ),
};

export default function EditorialPolicyPage() {
  return (
    <article className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-sm text-primary mb-4">DistantHorizonsGuide Editorial Team</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Editorial policy</h1>
      <p className="text-lg text-text-muted leading-relaxed mb-10">We publish independent, unofficial guidance for Distant Horizons users. Our goal is to separate verified project information, reproducible troubleshooting steps, and community reports instead of presenting them as the same level of evidence.</p>

      <div className="space-y-9 text-text-muted leading-relaxed">
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Who publishes this site</h2><p>DistantHorizonsGuide.com is maintained by the DistantHorizonsGuide Editorial Team. It is not affiliated with the Distant Horizons project, Mojang, or Microsoft. Editorial questions and corrections are handled through <a className="text-primary hover:underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Source priority</h2><ol className="list-decimal pl-5 space-y-2"><li>Official Distant Horizons releases and project documentation.</li><li>Official distribution pages and dependency listings.</li><li>Reproducible tests that record exact versions and conditions.</li><li>Community reports, clearly described as reports rather than confirmed facts.</li></ol></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Review and updates</h2><p>Material changes should record an editorial review date. A review date means the article was checked against its cited sources; it does not automatically mean every hardware and mod combination was tested. Compatibility entries use their recorded test or source date rather than a dynamically generated “last updated” date.</p></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Advertising and independence</h2><p>The site may use display advertising. Advertising does not determine compatibility ratings, recommended settings, or editorial conclusions. Official project links are provided for safety and attribution; we do not host Distant Horizons downloads.</p></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Corrections</h2><p>We correct factual errors when reliable evidence is available and avoid silently changing the meaning of a recommendation. See the <Link className="text-primary hover:underline" href="/corrections">corrections page</Link> for what to include in a report.</p></section>
      </div>
    </article>
  );
}
