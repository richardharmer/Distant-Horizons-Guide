import Link from 'next/link';

const rows = [
  ['Main job', 'Simplified distant terrain (LODs)', 'Simplified distant terrain (LODs)', 'Keep previously received chunks visible'],
  ['Loader', 'Fabric, Forge or NeoForge; depends on game version', 'Fabric; check the exact release', 'Fabric; check the exact release'],
  ['Multiplayer data', 'Explore with a client-only setup, or use supported server delivery', 'Build LODs while exploring; existing-world import is available', 'Cache chunks delivered by the server; optional local fallback world'],
  ['Shaders', 'The shader must explicitly support DH', 'The shader must explicitly support Voxy; support added in Voxy 0.2.4', 'Check your renderer and shader combination separately'],
  ['Hardware check', 'Match the DH build, renderer and GPU requirements', 'Author requires OpenGL 4.6 support', 'Measure the cost of retaining more full-detail chunks'],
];

export default function RenderModComparison() {
  return <section className="mb-12" aria-labelledby="mod-comparison">
    <h2 id="mod-comparison" className="text-2xl font-bold mb-4">Distant Horizons vs Voxy vs Bobby at a glance</h2>
    <div className="overflow-x-auto rounded-xl border border-border" role="region" aria-label="Render mod comparison; scroll horizontally on small screens" tabIndex={0}>
      <table className="w-full min-w-[680px] text-left text-sm">
        <caption className="text-left p-4 text-text-muted">Author-documented features reviewed October 28, 2026. This is not an FPS ranking.</caption>
        <thead className="bg-surface"><tr>{['Compare', 'Distant Horizons', 'Voxy', 'Bobby'].map(label => <th key={label} scope="col" className="p-4 border-b border-border">{label}</th>)}</tr></thead>
        <tbody>{rows.map(([label, ...values]) => <tr key={label} className="border-b border-border last:border-0"><th scope="row" className="p-4 align-top font-semibold">{label}</th>{values.map((value, column) => <td key={column} className="p-4 align-top text-text-muted leading-relaxed">{value}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <h2 className="text-xl font-bold mt-8 mb-3">Is Voxy better than Distant Horizons for performance?</h2>
    <p className="text-text-muted leading-relaxed">There is no measured winner in this guide. Compare two separate profiles with the same world, route, resolution and shader state. Record frame time while exploring new terrain and again after generation finishes. Also compare memory use and distant detail: equal distance numbers do not guarantee equal rendering work.</p>
    <h2 className="text-xl font-bold mt-8 mb-3">Which should you try first?</h2>
    <ul className="list-disc pl-5 space-y-3 text-text-muted leading-relaxed">
      <li>Need a supported server-to-client LOD path or a non-Fabric loader? Check the matching DH release first.</li>
      <li>Already using Fabric with an OpenGL 4.6-capable GPU? Compare Voxy in a separate instance before moving your main setup.</li>
      <li>Want to keep the chunks a multiplayer server already sent you? Bobby addresses that caching task.</li>
      <li>Keeping a favorite shader? Its explicit DH or Voxy support should decide which combination to test.</li>
    </ul>
    <div className="flex flex-wrap gap-4 mt-6 text-sm"><Link href="/guides/distant-horizons-client-or-server-side" className="text-primary underline">Check client and server requirements</Link><Link href="/shaders" className="text-primary underline">Find shader compatibility evidence</Link></div>
  </section>;
}
