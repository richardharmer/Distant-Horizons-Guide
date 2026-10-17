import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import shaders from '@/data/shaders.json';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

interface Props { params: Promise<{ slug: string }> }
const getShader = (slug: string) => shaders.find((shader) => shader.slug === slug);
export function generateStaticParams() { return shaders.map((shader) => ({ slug: shader.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shader = getShader((await params).slug);
  if (!shader) return {};
  const title = `${shader.name} + Distant Horizons Compatibility & Settings`;
  const description = `${shader.name} with Distant Horizons: author-source review, compatibility limits, setup checks and how to record an exact working combination.`;
  return { title, description, alternates: { canonical: `${siteConfig.url}/shaders/${shader.slug}` }, ...socialMetadata(title, description, `/shaders/${shader.slug}`, 'article') };
}
export default async function ShaderDetailPage({ params }: Props) {
  const shader = getShader((await params).slug);
  if (!shader) notFound();
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: `${shader.name} + Distant Horizons Compatibility`, dateModified: shader.reviewedAt, author: { '@type': 'Organization', name: 'DistantHorizonsGuide.com' }, mainEntityOfPage: `${siteConfig.url}/shaders/${shader.slug}` };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><article className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link className="text-primary text-sm hover:underline" href="/shaders">Shader database</Link>
    <h1 className="text-4xl sm:text-5xl font-black mt-5 mb-6">{shader.name} with Distant Horizons</h1>
    <p className="text-lg text-text-muted leading-relaxed">{shader.status === 'author-documented' ? `The author lists Distant Horizons support for ${shader.name}. An exact version combination has not been independently tested here.` : `A working ${shader.name} + Distant Horizons version combination has not been established by this review. Do not treat general Iris support as proof of DH compatibility.`}</p>
    <p className="mt-4 text-sm text-text-dim">Source review: {shader.reviewedAt} · In-game test: not performed · Performance: not benchmarked</p>
    <section className="mt-10 space-y-4 text-text-muted leading-relaxed"><h2 className="text-2xl font-bold text-foreground">What the source establishes</h2><p>{shader.sourceNote}</p>{shader.sourceUrl && <a className="text-primary underline" href={shader.sourceUrl} target="_blank" rel="noopener noreferrer">{shader.sourceTitle}</a>}<p>Neither a general project description nor a source-review date establishes a minimum DH version. The previous broad version and performance labels have been withdrawn because they did not identify reproducible test conditions.</p></section>
    <section className="mt-10 space-y-4 text-text-muted leading-relaxed"><h2 className="text-2xl font-bold text-foreground">Before testing {shader.name}</h2><p>{shader.focus}</p><p>In a duplicate launcher instance, launch DH without shaders and visit a recognizable landmark. Wait for its LOD to appear beyond vanilla render distance. Save a screenshot and the mod list as your baseline; these are instructions for your own comparison, not results of a test performed by this site.</p><p>Add a matching shader loader and the chosen {shader.name} archive. Keep the world, viewpoint, render distances, time of day and resource pack unchanged. Compare near terrain and the LOD boundary. Stop and retain the log if the game crashes; do not keep adding rendering mods to the failing instance.</p></section>
    <section className="mt-10"><h2 className="text-2xl font-bold mb-4">How to interpret the result</h2><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead><tr className="border-b border-border"><th className="p-3">Observation</th><th className="p-3">Next check</th></tr></thead><tbody className="text-text-muted">
      <tr className="border-b border-border"><td className="p-3">No distant terrain even without shaders</td><td className="p-3">Resolve the DH generation or server-data problem before evaluating the shader.</td></tr>
      <tr className="border-b border-border"><td className="p-3">Near terrain works; LODs disappear only with the shader</td><td className="p-3">Check that this archive implements DH integration and that its release notes match the installed renderer.</td></tr>
      <tr className="border-b border-border"><td className="p-3">The shader fails before entering a world</td><td className="p-3">Keep the compilation/crash log and check loader, GPU and shader requirements first.</td></tr>
      <tr><td className="p-3">Both terrains render, but lighting differs</td><td className="p-3">Record the boundary, time, dimension and resource pack. A successful launch alone is not a complete compatibility test.</td></tr>
    </tbody></table></div></section>
    <section className="mt-10 space-y-4 text-text-muted leading-relaxed"><h2 className="text-2xl font-bold text-foreground">Record a useful version combination</h2><p>Include Minecraft and Java version; loader name and build; DH, Iris and Sodium builds; the full {shader.name} archive name or commit; GPU and driver; dimension; resource pack; vanilla and LOD distances; and whether LOD generation had finished. Separate a crash, missing terrain, a visual seam and slow generation in your report.</p><p>No test record for this exact combination is currently published here. A community report should remain attributed and unconfirmed until it can be reproduced.</p><div className="flex flex-wrap gap-4 text-sm"><a className="text-primary underline" href="https://www.irisshaders.dev/" target="_blank" rel="noopener noreferrer">Iris: loader and DH requirements</a><Link className="text-primary underline" href="/guides/distant-horizons-shader-not-working">Troubleshoot shaders</Link><Link className="text-primary underline" href="/testing-methodology">Evidence standards</Link><Link className="text-primary underline" href="/corrections">Submit a correction</Link></div></section>
  </article></>;
}
