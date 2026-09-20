import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Testing Methodology',
  description: 'How DistantHorizonsGuide evaluates version, shader, settings, installation, and troubleshooting information.',
  alternates: { canonical: `${siteConfig.url}/testing-methodology` },
  ...socialMetadata(
    'Testing Methodology',
    'How DistantHorizonsGuide evaluates version, shader, settings, installation, and troubleshooting information.',
    '/testing-methodology',
  ),
};

const evidenceLevels = [
  ['Official source', 'A release, compatibility statement, file listing, or instruction published by the project or dependency author.'],
  ['Reproduced test', 'A result with Minecraft, DH, loader, dependency, shader, hardware, and test conditions recorded.'],
  ['Community report', 'A useful report from an issue tracker or community discussion that has not been independently reproduced.'],
];

export default function TestingMethodologyPage() {
  return (
    <article className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-sm text-primary mb-4">Evidence and review standards</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Testing methodology</h1>
      <p className="text-lg text-text-muted leading-relaxed mb-10">Distant Horizons behavior depends on exact versions, world state, generation load, hardware, and other rendering mods. We therefore avoid treating a single setup as universal.</p>

      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        {evidenceLevels.map(([title, body]) => <section key={title} className="rounded-xl border border-border bg-surface/50 p-5"><h2 className="font-bold mb-2">{title}</h2><p className="text-sm text-text-muted leading-relaxed">{body}</p></section>)}
      </div>

      <div className="space-y-9 text-text-muted leading-relaxed">
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Compatibility test record</h2><p>A complete record should include Minecraft version, Distant Horizons build, Fabric/Forge/NeoForge version, Iris/Oculus or equivalent renderer, shader name and build, GPU and driver, world type, whether LODs had finished generating, and the result observed.</p></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Performance guidance</h2><p>Settings are published as conservative starting points, not FPS guarantees. Performance guidance should describe the workload and bottleneck being changed, then tell the reader how to verify whether the change helped.</p></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Installation data</h2><p>Version and dependency information is checked per Minecraft version. We do not copy one version&apos;s dependency list onto another version without an official source. Unverified legacy pages are excluded from search indexing until reviewed.</p></section>
        <section><h2 className="text-2xl font-bold text-foreground mb-3">Compatibility limitations</h2><p>A result may become stale after a DH, loader, shader, or driver update. Each compatibility page shows the date and scope of the available evidence. Missing evidence is reported as unknown rather than assumed compatible.</p></section>
      </div>
    </article>
  );
}
