import Link from 'next/link';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import { Calculator, Download, HelpCircle, ArrowRight, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import shadersData from '@/data/shaders.json';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
};

// Show top 6 shaders on the homepage as a preview
const topShaders = shadersData.slice(0, 6);

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; className: string }> = {
  compatible: { label: 'Compatible', icon: CheckCircle, className: 'badge-compatible' },
  partial: { label: 'Partial', icon: AlertTriangle, className: 'badge-partial' },
  'author-documented': { label: 'Author documents DH', icon: AlertTriangle, className: 'badge-partial' },
  unknown: { label: 'Unverified', icon: AlertTriangle, className: 'badge-partial' },
  incompatible: { label: 'Incompatible', icon: XCircle, className: 'badge-incompatible' },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Current release update */}
      <section className="py-10 border-y border-border/30 bg-surface/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-2">Official file listing checked October 18, 2026</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Distant Horizons 3.3.3 for Minecraft 1.21.11</h2>
              <p className="text-text-muted leading-relaxed">
                The official file listing includes Distant Horizons 3.3.3 for Minecraft 1.21.11 on Fabric and NeoForge. This is a source check, not an in-game test.
                Match the download to your exact Minecraft version and loader, then start with conservative settings
                before enabling shaders.
              </p>
            </div>
            <a
              href="https://modrinth.com/mod/distanthorizons/version/3.3.3-1.21.11"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary whitespace-nowrap"
            >
              Check official files <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/install/1-21-11" className="btn-primary !py-2.5">Install for Minecraft 1.21.11</Link>
            <Link href="/guides/distant-horizons-best-settings" className="btn-secondary !py-2.5">Choose safe settings</Link>
            <Link href="/guides/distant-horizons-how-to-use" className="btn-secondary !py-2.5">How to use Distant Horizons</Link>
          </div>
        </div>
      </section>

      {/* Popular Shaders Preview */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">
                Popular <span className="gradient-text">Shader Compatibility</span>
              </h2>
              <p className="section-subtitle">
                Read author statements and exact-version limitations before choosing a shader.
              </p>
            </div>
            <Link
              href="/shaders"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              View all {shadersData.length} shaders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topShaders.map((shader) => {
              const st = statusConfig[shader.status] || statusConfig.unknown;
              const StIcon = st.icon;
              return (
                <Link
                  key={shader.slug}
                  href={`/shaders/${shader.slug}`}
                  className="glass rounded-xl p-5 card-hover group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {shader.name}
                    </h3>
                    <span className={`badge ${st.className}`}>
                      <StIcon className="w-3 h-3" />
                      {st.label}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted line-clamp-2 mb-3">{shader.sourceNote}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {shader.loaders.map((l) => (
                      <span key={l} className="text-xs px-2 py-0.5 rounded bg-surface-light/50 text-text-dim">
                        {l}
                      </span>
                    ))}
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      Exact combination unverified
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/shaders" className="btn-secondary text-sm">
              View all {shadersData.length} shaders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick tools row */}
      <section className="py-16 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            Everything You Need for <span className="gradient-text">Distant Horizons</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/calculator" className="glass rounded-2xl p-8 card-hover group text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Starting Settings Tool</h3>
              <p className="text-sm text-text-muted mb-4">Choose a rule-based starting profile and see how each recommendation is calculated. No FPS or hardware benchmark is claimed.</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 justify-center">
                Choose starting settings <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link href="/install/1-21-11" className="glass rounded-2xl p-8 card-hover group text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Installation Guide</h3>
              <p className="text-sm text-text-muted mb-4">Step-by-step setup for Fabric & NeoForge. Check required dependencies on the exact file page before adding optional Sodium or Iris.</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 justify-center">
                Install Now <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link href="/faq" className="glass rounded-2xl p-8 card-hover group text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">FAQ & Troubleshooting</h3>
              <p className="text-sm text-text-muted mb-4">Source-linked troubleshooting steps for crashes, flickering, memory issues, and shader conflicts.</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 justify-center">
                Get Help <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO content block */}
      <section className="py-16 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            What is Distant Horizons? Minecraft LOD Mod Guide
          </h2>
          <div className="prose prose-invert max-w-none text-text-muted text-sm leading-relaxed space-y-4">
            <p>
              <strong>Version note:</strong> this site currently tracks the {siteConfig.currentReleaseLabel} release line.
              Distant Horizons 3.3.3 is listed for Minecraft 1.21.11, but files differ by game version and loader.
              Always verify the exact build before installing. <a href={siteConfig.officialReleaseUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View official releases</a>.
            </p>
            <p>
              <strong>Distant Horizons</strong> is a free, open-source Minecraft mod that extends
              how far terrain remains visible. Using a Level of Detail (LOD) system, it renders simplified
              terrain beyond your normal render distance — allowing views up to <strong>512+ chunks</strong> away
              with a performance cost that depends on generation, quality, hardware and shaders.
            </p>
            <p>
              Whether you&apos;re playing on <strong>Fabric</strong> or <strong>NeoForge</strong>, Distant Horizons
              works as a client-side mod, with exploration-based terrain collection on multiplayer servers. See the <Link href="/guides/distant-horizons-client-or-server-side" className="text-primary underline">client and server installation guide</Link> for server-provided LOD requirements. Shader support requires a pack that explicitly implements DH integration; the exact Minecraft, DH, renderer and shader builds must be checked together.
            </p>
            <p>
              This guide provides everything you need: a comprehensive{' '}
              <Link href="/shaders" className="text-primary hover:underline">shader compatibility database</Link>,
              a rule-based{' '}
              <Link href="/calculator" className="text-primary hover:underline">starting settings tool</Link> with published rules, and source-linked{' '}
              <Link href="/faq" className="text-primary hover:underline">troubleshooting guides</Link> for common
              issues like chunk flickering, memory overflow, and shader conflicts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
