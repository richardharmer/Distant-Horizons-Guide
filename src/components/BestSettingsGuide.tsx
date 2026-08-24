import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const profiles = [
  {
    name: 'Smooth performance',
    forWho: 'Entry GPUs, large modpacks, or stutter while exploring',
    values: ['Vanilla distance: 8–10 chunks', 'LOD distance: 64–96 chunks', 'LOD quality: Low', 'Shaders: Off while testing'],
  },
  {
    name: 'Balanced starting point',
    forWho: 'Most desktop PCs after a clean install',
    values: ['Vanilla distance: 8–12 chunks', 'LOD distance: 96–128 chunks', 'LOD quality: Medium', 'Shaders: Add only after the base profile is smooth'],
  },
  {
    name: 'Quality-first',
    forWho: 'A proven stable setup with headroom to spare',
    values: ['Keep vanilla distance modest', 'Raise LOD distance gradually', 'Increase quality one step at a time', 'Re-test after new terrain finishes generating'],
  },
];

export default function BestSettingsGuide() {
  return (
    <section className="mt-12 border-t border-border/30 pt-12" aria-labelledby="settings-profiles">
      <h2 id="settings-profiles" className="text-2xl font-bold mb-3">Choose a Distant Horizons settings profile</h2>
      <p className="text-text-muted leading-relaxed mb-7">
        These are safe starting profiles rather than universal maximum settings. The useful test is whether Minecraft stays responsive while Distant Horizons is creating new LOD terrain—not whether a benchmark remains smooth in an already-generated area.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {profiles.map((profile) => (
          <section key={profile.name} className="glass rounded-2xl p-5">
            <h3 className="font-semibold text-lg mb-2">{profile.name}</h3>
            <p className="text-sm text-text-muted mb-4">{profile.forWho}</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {profile.values.map((value) => (
                <li key={value} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />{value}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="grid gap-6 mt-10 sm:grid-cols-2">
        <section>
          <h2 className="text-xl font-bold mb-3">Tune settings in this order</h2>
          <ol className="space-y-3 text-text-muted leading-relaxed list-decimal list-inside">
            <li>Set vanilla render distance first, then select a modest LOD distance.</li>
            <li>Reduce builder load if exploration stutters; extra RAM cannot fix a CPU or GPU bottleneck.</li>
            <li>Wait for LOD generation to settle before increasing distance or quality.</li>
            <li>Add a compatible shader last, then retest the same route and world.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-3">Use the guide that matches your problem</h2>
          <div className="space-y-3 text-sm">
            <Link className="flex items-center justify-between text-primary" href="/calculator">Generate a hardware-aware starting profile <ArrowRight className="w-4 h-4" /></Link>
            <Link className="flex items-center justify-between text-primary" href="/guides/distant-horizons-best-settings-laptop">Settings for laptops and integrated graphics <ArrowRight className="w-4 h-4" /></Link>
            <Link className="flex items-center justify-between text-primary" href="/guides/distant-horizons-low-fps">Fix low FPS and generation stutter <ArrowRight className="w-4 h-4" /></Link>
            <Link className="flex items-center justify-between text-primary" href="/shaders">Check shader compatibility before enabling one <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      </div>
    </section>
  );
}
