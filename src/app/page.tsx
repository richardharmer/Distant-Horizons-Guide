import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import { Layers, Calculator, Download, HelpCircle, ArrowRight, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import shadersData from '@/data/shaders.json';

// Show top 6 shaders on the homepage as a preview
const topShaders = shadersData.slice(0, 6);

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; className: string }> = {
  compatible: { label: 'Compatible', icon: CheckCircle, className: 'badge-compatible' },
  partial: { label: 'Partial', icon: AlertTriangle, className: 'badge-partial' },
  incompatible: { label: 'Incompatible', icon: XCircle, className: 'badge-incompatible' },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Popular Shaders Preview */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">
                Popular <span className="gradient-text">Shader Compatibility</span>
              </h2>
              <p className="section-subtitle">
                Quick check — do your favorite shaders work with Distant Horizons?
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
              const st = statusConfig[shader.status] || statusConfig.compatible;
              const StIcon = st.icon;
              return (
                <Link
                  key={shader.slug}
                  href="/shaders"
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
                  <p className="text-sm text-text-muted line-clamp-2 mb-3">{shader.settings}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {shader.loaders.map((l) => (
                      <span key={l} className="text-xs px-2 py-0.5 rounded bg-surface-light/50 text-text-dim">
                        {l}
                      </span>
                    ))}
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      DH {shader.dhVersion}
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
              <h3 className="text-lg font-bold text-foreground mb-2">Config Generator</h3>
              <p className="text-sm text-text-muted mb-4">Get optimized settings tuned to your exact hardware. Supports 4-core to 16+ core CPUs and entry to ultra GPUs.</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 justify-center">
                Generate Config <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link href="/install/1-21-1" className="glass rounded-2xl p-8 card-hover group text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Installation Guide</h3>
              <p className="text-sm text-text-muted mb-4">Step-by-step setup for Fabric & NeoForge. Includes all dependencies — Sodium, Iris, Indium, and more.</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 justify-center">
                Install Now <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link href="/faq" className="glass rounded-2xl p-8 card-hover group text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">FAQ & Troubleshooting</h3>
              <p className="text-sm text-text-muted mb-4">Community-sourced fixes for crashes, flickering, memory issues, and shader conflicts.</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 justify-center">
                Get Help <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Advertisement Slot */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center">
            <p className="text-xs text-text-dim uppercase tracking-wider mb-1">Advertisement</p>
            <p className="text-sm text-text-dim">Recommended Server Hosting</p>
          </div>
        </div>
      </section>

      {/* SEO content block */}
      <section className="py-16 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            What is Distant Horizons? The Ultimate Minecraft LOD Mod Guide
          </h2>
          <div className="prose prose-invert max-w-none text-text-muted text-sm leading-relaxed space-y-4">
            <p>
              <strong>Distant Horizons</strong> is a free, open-source Minecraft mod that revolutionizes
              how far you can see in the game. Using a Level of Detail (LOD) system, it renders simplified
              terrain beyond your normal render distance — allowing views up to <strong>512+ chunks</strong> away
              without tanking your framerate.
            </p>
            <p>
              Whether you&apos;re playing on <strong>Fabric</strong> or <strong>NeoForge</strong>, Distant Horizons
              works as a client-side mod, meaning you can install it and join any server. It&apos;s compatible
              with popular performance mods like <strong>Sodium</strong> and shader packs like
              <strong> Complementary Reimagined</strong>, <strong>BSL</strong>, and <strong>Bliss Shaders</strong>.
            </p>
            <p>
              This guide provides everything you need: a comprehensive{' '}
              <Link href="/shaders" className="text-primary hover:underline">shader compatibility database</Link>,
              a smart{' '}
              <Link href="/calculator" className="text-primary hover:underline">configuration generator</Link> tailored
              to your hardware, and community-sourced{' '}
              <Link href="/faq" className="text-primary hover:underline">troubleshooting guides</Link> for common
              issues like chunk flickering, memory overflow, and shader conflicts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
