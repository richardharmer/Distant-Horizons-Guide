export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
  intro: string;
  symptoms: string[];
  steps: { title: string; body: string }[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: 'distant-horizons-low-fps',
    title: 'Distant Horizons Low FPS Fix: Best Settings for Performance',
    description: 'Fix low FPS and stutter in Distant Horizons. Start with vanilla render distance, CPU load, LOD distance, RAM, and shader settings.',
    category: 'Performance',
    updated: '2026-07-29',
    intro: 'Distant Horizons can extend the visible world without rendering every distant chunk at full detail, but LOD generation and shader rendering still use CPU, GPU, memory, and disk bandwidth. The fastest fix is to lower vanilla render distance first, then tune DH generation load.',
    symptoms: ['FPS drops while flying or exploring', 'CPU stays near 100%', 'stutter continues after installing DH', 'shaders make the problem much worse'],
    steps: [
      { title: 'Lower vanilla render distance', body: 'Start at 8–12 chunks. Let DH render the far terrain instead of asking Minecraft to render full-detail chunks at the same distance.' },
      { title: 'Reduce DH building threads', body: 'Use roughly half your logical CPU threads for LOD building. Leave headroom for Minecraft, the operating system, and other mods.' },
      { title: 'Use a conservative LOD profile', body: 'Start with 128–256 chunks, medium or low quality, and cave rendering disabled. Increase one setting at a time after generation stabilizes.' },
      { title: 'Test without shaders', body: 'Disable shaders temporarily. If performance returns, use a shader with documented DH support and enable its DH integration option.' },
      { title: 'Wait for initial generation', body: 'CPU usage and stutter are usually highest while new LODs are generated. Re-test after the area around your base has finished generating.' },
    ],
    related: ['distant-horizons-ram-settings', 'distant-horizons-shader-not-working'],
  },
  {
    slug: 'distant-horizons-shader-not-working',
    title: 'Distant Horizons Shaders Not Working: Compatibility Fixes',
    description: 'Learn why Distant Horizons shaders fail, disappear, or show mismatched lighting, and how to troubleshoot Iris, shader packs, and DH settings.',
    category: 'Shaders',
    updated: '2026-07-29',
    intro: 'Distant Horizons shader support depends on the shader pack implementing the DH rendering programs, not only on whether Iris or another shader loader is installed. A shader can load successfully while distant terrain still renders incorrectly.',
    symptoms: ['LOD terrain disappears when shaders are enabled', 'distant terrain is too bright or too dark', 'a hard seam appears at the LOD boundary', 'Minecraft crashes while compiling shaders'],
    steps: [
      { title: 'Confirm the loader combination', body: 'On Fabric, test with a current Iris and Sodium combination. On NeoForge, verify the exact Oculus/Embeddium and DH versions before changing settings.' },
      { title: 'Use a known compatible pack', body: 'Start with Complementary Reimagined, BSL, or another pack in the compatibility database. Test one shader at a time.' },
      { title: 'Enable DH support in the shader pack', body: 'Look for Distant Horizons Support, DH Integration, or a compatibility option in the shader settings. The label varies by pack.' },
      { title: 'Reload resources', body: 'Press F3+T after changing shader or DH settings. If the problem remains, test in a new world with other rendering mods removed.' },
      { title: 'Record exact versions', body: 'When reporting a bug, include Minecraft, DH, Iris/Oculus, Sodium/Embeddium, shader pack, GPU, and a crash log or screenshot.' },
    ],
    related: ['complementary-reimagined', 'bsl-shaders'],
  },
  {
    slug: 'distant-horizons-lod-not-generating',
    title: 'Distant Horizons LODs Not Generating: Checklist and Fixes',
    description: 'Fix missing or empty distant terrain in Distant Horizons by checking generation settings, memory, server speed, and data conflicts.',
    category: 'Troubleshooting',
    updated: '2026-07-29',
    intro: 'LOD generation is progressive. If the distant terrain is empty, first determine whether generation is paused, overloaded, still catching up, or blocked by a version or mod conflict.',
    symptoms: ['the horizon is empty', 'LOD chunks only appear after flying around', 'generation stops near a server spawn', 'holes appear in otherwise generated terrain'],
    steps: [
      { title: 'Check that DH rendering and generation are enabled', body: 'Open the DH settings and confirm the LOD render distance is above zero and generation is not paused or set to an extremely low CPU load.' },
      { title: 'Explore at a steady speed', body: 'Walk or fly through the area and allow the generator time to catch up. Extremely fast travel can create a visible backlog.' },
      { title: 'Check memory pressure', body: 'If Minecraft is close to its memory limit, lower LOD distance and quality before increasing RAM allocation.' },
      { title: 'Separate server and client causes', body: 'On multiplayer servers, the server controls how quickly new chunks can be delivered. Compare the same settings in a local single-player world.' },
      { title: 'Check for generation conflicts', body: 'Use the official release notes and current compatibility guidance before combining DH with other world-generation or pre-generation mods.' },
    ],
    related: ['distant-horizons-low-fps', 'distant-horizons-ram-settings'],
  },
  {
    slug: 'distant-horizons-ram-settings',
    title: 'How Much RAM Does Distant Horizons Need?',
    description: 'Choose a sensible Minecraft RAM allocation for Distant Horizons without starving the operating system or creating unnecessary garbage collection.',
    category: 'Performance',
    updated: '2026-07-29',
    intro: 'RAM needs depend on Minecraft, the modpack, LOD distance, quality, and whether the world is generating new terrain. More RAM is not automatically faster: leave enough memory for the operating system and avoid using an unnecessarily large heap.',
    symptoms: ['out-of-memory crashes', 'long freezes during LOD generation', 'garbage collection stutter', 'LOD generation stops under load'],
    steps: [
      { title: 'Start with a moderate allocation', body: 'For a lightweight setup, begin around 4–6 GB. Larger modpacks and high LOD distances may need more, but measure before increasing it.' },
      { title: 'Lower LOD settings before over-allocating', body: 'Reduce distance and quality if memory pressure appears. This changes the workload directly and is often more effective than adding RAM.' },
      { title: 'Account for the rest of the modpack', body: 'RAM is shared with Minecraft, resource packs, shaders, and other mods. A large modpack needs more headroom than a clean instance.' },
      { title: 'Use 64-bit Java', body: 'Modern Minecraft installations should use a 64-bit Java runtime appropriate for the Minecraft version. Check the launcher profile rather than guessing from the OS.' },
    ],
    related: ['distant-horizons-low-fps', 'distant-horizons-lod-not-generating'],
  },
  {
    slug: 'distant-horizons-crash-on-startup',
    title: 'Distant Horizons Crashes on Startup: Version and Mod Checklist',
    description: 'Fix Distant Horizons startup crashes by checking Minecraft, loader, Java, Iris, Sodium, Oculus, and rendering-mod compatibility.',
    category: 'Troubleshooting',
    updated: '2026-07-29',
    intro: 'Startup crashes are usually caused by a version mismatch or a rendering-mod conflict. Isolate the setup with a clean profile first, then add performance and shader mods back one at a time.',
    symptoms: ['Minecraft closes during loading', 'a crash report mentions DH, Iris, or Sodium', 'the title screen never appears', 'the crash started after updating one mod'],
    steps: [
      { title: 'Match every version', body: 'Confirm Minecraft, the loader, Distant Horizons, and every rendering dependency target the same game version. Do not assume a nearby patch version is compatible.' },
      { title: 'Test a clean profile', body: 'Create a temporary instance with only the loader, its required API, and Distant Horizons. If it launches, add Sodium/Embeddium and shaders back one at a time.' },
      { title: 'Remove OptiFine from the test', body: 'Do not combine OptiFine with a modern Iris/Sodium DH troubleshooting profile. Use one rendering stack at a time so the crash cause is identifiable.' },
      { title: 'Check Java and the crash report', body: 'Use the Java runtime required by your Minecraft version. The first DH, loader, or mixin error in the crash report is more useful than the final generic exit message.' },
      { title: 'Record the working combination', body: 'Write down the exact versions that launch successfully before adding resource packs, shader packs, or the rest of a modpack.' },
    ],
    related: ['distant-horizons-shader-not-working', 'distant-horizons-lod-not-generating'],
  },
  {
    slug: 'distant-horizons-fabric-vs-neoforge',
    title: 'Distant Horizons Fabric vs NeoForge: Which Loader Should You Use?',
    description: 'Compare Fabric and NeoForge for Distant Horizons installation, shader support, performance troubleshooting, and modpack compatibility.',
    category: 'Installation',
    updated: '2026-07-29',
    intro: 'Neither loader is universally best. Choose the loader that matches the mods you already use, then keep the rendering stack consistent. For a new lightweight DH profile, Fabric is often the simpler starting point; a NeoForge modpack should stay on NeoForge.',
    symptoms: ['you are choosing a loader for a new instance', 'a modpack only supports one loader', 'shader dependencies differ between profiles', 'you want to migrate an existing world'],
    steps: [
      { title: 'Start with the modpack requirement', body: 'If your pack or server requires NeoForge, use NeoForge. Switching loaders is not a performance tweak if it makes your other mods unavailable.' },
      { title: 'Use the matching rendering stack', body: 'Fabric profiles commonly use Sodium and Iris. NeoForge profiles commonly use Embeddium and Oculus. Verify exact compatibility for your Minecraft version.' },
      { title: 'Compare a clean profile', body: 'If you are choosing freely, test the same world and DH distance in a small Fabric profile and a small NeoForge profile before adding a large modpack.' },
      { title: 'Keep the world data backed up', body: 'Loader changes can change the rest of the mod environment. Back up the world and do not mix mod folders between profiles.' },
    ],
    related: ['distant-horizons-crash-on-startup', 'distant-horizons-shader-not-working'],
  },
  {
    slug: 'distant-horizons-optifine-alternative',
    title: 'Distant Horizons OptiFine Alternative: Iris and Sodium Setup',
    description: 'Set up Distant Horizons without OptiFine using a modern Fabric or NeoForge rendering stack and compatible shader settings.',
    category: 'Installation',
    updated: '2026-07-29',
    intro: 'For a modern DH setup, use a loader and rendering stack that supports the DH integration path required by your shader. Avoid troubleshooting multiple rendering pipelines at the same time.',
    symptoms: ['OptiFine causes a DH conflict', 'shaders load but distant terrain is missing', 'you need an alternative to OptiFine', 'your modpack uses Sodium or Embeddium'],
    steps: [
      { title: 'Choose Fabric or NeoForge', body: 'Use Fabric with Sodium and Iris, or NeoForge with Embeddium and the appropriate shader solution. Select the exact Minecraft version before downloading.' },
      { title: 'Remove conflicting rendering jars', body: 'Create a clean profile without OptiFine, OptiFabric, duplicate Sodium ports, or duplicate shader loaders. Duplicate rendering libraries make diagnosis unreliable.' },
      { title: 'Install DH after the base profile launches', body: 'Launch the loader profile once, then add Distant Horizons and test before adding shaders or extra visual mods.' },
      { title: 'Choose a DH-aware shader', body: 'Use the compatibility database and the shader author’s own documentation. Not every shader pack that works with Iris implements the DH programs.' },
    ],
    related: ['distant-horizons-shader-not-working', 'distant-horizons-fabric-vs-neoforge'],
  },
  {
    slug: 'distant-horizons-chunk-flickering',
    title: 'Distant Horizons Chunk Flickering and LOD Seams: Fixes',
    description: 'Reduce Distant Horizons LOD flickering, bright seams, and transition artifacts by checking shader support, generation state, and render settings.',
    category: 'Troubleshooting',
    updated: '2026-07-29',
    intro: 'A seam can come from incomplete LOD generation, a shader transition mismatch, stale resources, or a real compatibility bug. Change one variable at a time so you know which fix helped.',
    symptoms: ['terrain flickers at the LOD boundary', 'distant terrain has a different brightness', 'holes appear while flying', 'the issue only appears with shaders'],
    steps: [
      { title: 'Wait for generation to catch up', body: 'Fly slowly through the affected area and give the LOD builder time to finish. A moving boundary can look like flickering while data is still changing.' },
      { title: 'Reload resources', body: 'Use F3+T after changing DH or shader settings. Restart the instance if the same visual state remains cached.' },
      { title: 'Test with shaders disabled', body: 'If the seam disappears without shaders, use a pack with documented DH integration and enable its DH support option.' },
      { title: 'Reduce the transition workload', body: 'Lower LOD quality or distance temporarily and keep vanilla render distance around 8–12 chunks while testing.' },
      { title: 'Report reproducible cases', body: 'Include the exact versions, shader pack, GPU, screenshots, and whether the issue occurs in a clean world.' },
    ],
    related: ['distant-horizons-shader-not-working', 'distant-horizons-lod-not-generating'],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
