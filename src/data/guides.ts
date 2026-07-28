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
  {
    slug: 'distant-horizons-lod-cache-reset', title: 'How to Reset the Distant Horizons LOD Cache',
    description: 'Safely rebuild stale or corrupted Distant Horizons LOD data after changing versions, resource packs, dimensions, or world-generation mods.', category: 'Troubleshooting', updated: '2026-07-29',
    intro: 'A stale LOD database can preserve old terrain, show the wrong resource-pack colors, or make a dimension look incomplete. Back up your world first, then remove only the affected DH data rather than deleting the save.',
    symptoms: ['old terrain remains after an update', 'LOD colors do not match the resource pack', 'a dimension shows data from another profile', 'generation works in a new world but not the old one'],
    steps: [
      { title: 'Back up the world and instance', body: 'Close Minecraft completely and make a copy of the save and instance before changing generated data.' },
      { title: 'Change one cause at a time', body: 'If the problem started after a resource pack change, restart Minecraft first. DH may need to rebuild LODs with the new textures.' },
      { title: 'Find the DH data location', body: 'Use the Distant Horizons settings or the official FAQ to identify the LOD data folder for the world or server. Do not delete the Minecraft save folder.' },
      { title: 'Remove only the affected LOD data', body: 'Delete or move the relevant DH database folder, then launch the same profile and allow the area to regenerate.' },
      { title: 'Verify every dimension', body: 'Check the Overworld, Nether, and End separately. Server and Realm identifiers can also affect where LOD data is stored.' },
    ], related: ['distant-horizons-lod-not-generating', 'distant-horizons-chunk-flickering'],
  },
  {
    slug: 'distant-horizons-server-realms', title: 'Distant Horizons on Servers and Realms: What Actually Works',
    description: 'Understand Distant Horizons multiplayer limits, server chunk delivery, Realm data, and why distant terrain may take time to appear.', category: 'Multiplayer', updated: '2026-07-29',
    intro: 'Distant Horizons can render distant terrain on a client, but it cannot create information that the server has never sent. Multiplayer generation speed depends on server view distance, chunk delivery, connection quality, and client LOD settings.',
    symptoms: ['single-player works but a server looks empty', 'Realms LODs do not update', 'terrain from an old server session appears', 'flying creates a large generation backlog'],
    steps: [
      { title: 'Test the same profile offline', body: 'Compare a local world with the server. If local generation works, investigate server view distance, chunk delivery, or server-side restrictions.' },
      { title: 'Allow the client to catch up', body: 'Move steadily instead of constantly teleporting or flying ahead. DH needs received chunks before it can build distant LODs.' },
      { title: 'Keep server identities stable', body: 'A changing address or port can create separate LOD data folders. Confirm that you are looking at the current server profile.' },
      { title: 'Do not expect server-side magic', body: 'Increasing client RAM cannot make an unloaded server chunk appear. Ask the server owner about view distance and pre-generated terrain.' },
      { title: 'Report with multiplayer context', body: 'Include server type, Minecraft version, client loader, DH version, whether the issue affects every dimension, and a screenshot.' },
    ], related: ['distant-horizons-lod-not-generating', 'distant-horizons-lod-cache-reset'],
  },
  {
    slug: 'distant-horizons-chunks-not-loading', title: 'Distant Horizons Chunks Not Loading: Fix Empty Horizons',
    description: 'Fix empty horizons, missing LOD chunks, and slow distant-terrain generation with a clear client and server checklist.', category: 'Troubleshooting', updated: '2026-07-29',
    intro: '“Chunks not loading” can mean the renderer is disabled, the generator is paused, the client is overloaded, or the server has not delivered the required terrain. Identify which layer is failing before changing every setting.',
    symptoms: ['only nearby chunks render', 'the LOD distance is visible but empty', 'chunks appear after restarting', 'generation is stuck at one percentage'],
    steps: [
      { title: 'Confirm DH is active', body: 'Open the DH settings and verify that distant terrain rendering and LOD generation are enabled for the current profile.' },
      { title: 'Check the generation queue', body: 'Give the client time in the affected area. Lower the LOD distance temporarily if the queue is too large for the CPU.' },
      { title: 'Use a clean rendering test', body: 'Disable shaders and nonessential visual mods. This separates missing data from a shader or renderer problem.' },
      { title: 'Check disk and memory pressure', body: 'Make sure the instance can write to its data directory and that Minecraft is not repeatedly hitting its memory limit.' },
      { title: 'Rebuild only if needed', body: 'If a new world works but one world does not, back up the save and rebuild the affected DH LOD data.' },
    ], related: ['distant-horizons-lod-not-generating', 'distant-horizons-lod-cache-reset'],
  },
  {
    slug: 'distant-horizons-high-cpu-usage', title: 'Distant Horizons High CPU Usage: Reduce Stutter Without Losing the Horizon',
    description: 'Tune CPU load, builder threads, vanilla render distance, and LOD generation so Distant Horizons stops overwhelming Minecraft.', category: 'Performance', updated: '2026-07-29',
    intro: 'High CPU usage is expected while new LODs are being built, but constant stutter means the generator is taking too much time from the game thread or other mods. Reduce the workload before increasing memory.',
    symptoms: ['CPU stays at 100% while exploring', 'mouse input stutters during generation', 'the game freezes when flying', 'a high-end GPU does not improve the problem'],
    steps: [
      { title: 'Reduce builder load first', body: 'Lower the DH CPU load or builder thread count until Minecraft remains responsive. Leave CPU headroom for the game and other mods.' },
      { title: 'Lower vanilla render distance', body: 'Start around 8–12 chunks so full-detail terrain is not competing with LOD generation.' },
      { title: 'Limit exploration speed', body: 'Allow the generator to catch up before crossing a large unexplored area. Chunk pre-generation can create a huge client workload.' },
      { title: 'Test without shaders', body: 'Shaders change the GPU and CPU balance. Benchmark the same route with shaders off before choosing a shader profile.' },
    ], related: ['distant-horizons-low-fps', 'distant-horizons-ram-settings'],
  },
  {
    slug: 'distant-horizons-out-of-memory', title: 'Distant Horizons Out of Memory Fix: RAM and LOD Settings',
    description: 'Fix Distant Horizons out-of-memory crashes by balancing Java heap size, modpack memory, LOD distance, quality, and shader use.', category: 'Performance', updated: '2026-07-29',
    intro: 'An out-of-memory crash is not solved by assigning every gigabyte to Minecraft. The right allocation depends on the modpack and leaves memory for the operating system, the launcher, and graphics drivers.',
    symptoms: ['Minecraft crashes with an out-of-memory error', 'generation causes long freezes', 'RAM usage climbs continuously', 'the same world works with fewer mods'],
    steps: [
      { title: 'Measure the full instance', body: 'Check the modpack size, resource packs, shader pack, and current Java allocation. Treat the game as a whole rather than blaming DH alone.' },
      { title: 'Start with a sensible heap', body: 'Use a moderate allocation such as 4–8 GB for a typical setup, then adjust based on the actual modpack and logs.' },
      { title: 'Lower LOD workload', body: 'Reduce distance and quality, disable expensive cave or detail options, and allow existing LODs to finish generating.' },
      { title: 'Avoid over-allocation', body: 'A very large heap can increase garbage-collection pauses and starve the operating system. More RAM is not automatically more performance.' },
    ], related: ['distant-horizons-ram-settings', 'distant-horizons-low-fps'],
  },
  {
    slug: 'distant-horizons-wrong-dimension', title: 'Distant Horizons Wrong-Dimension LODs: Fix Nether and End Data',
    description: 'Stop Distant Horizons from showing stale or cross-dimension terrain by checking world identity, server folders, and cached LOD data.', category: 'Troubleshooting', updated: '2026-07-29',
    intro: 'LOD data is associated with a world, server identity, and dimension. If those identifiers change or old data is reused, the horizon can show terrain from the wrong dimension or an earlier session.',
    symptoms: ['Nether terrain appears in the Overworld', 'Realms data changes after reconnecting', 'the End shows a previous world', 'the issue survives a Minecraft restart'],
    steps: [
      { title: 'Stop the game before changing data', body: 'Close Minecraft and the launcher so the LOD database is not being written while you inspect it.' },
      { title: 'Confirm the current profile', body: 'Check the Minecraft instance, world, server address, port, and dimension. Similar names can make separate profiles look identical.' },
      { title: 'Move the affected cache aside', body: 'Back up and move only the relevant DH LOD folder instead of deleting the world save. Let DH rebuild it on the next launch.' },
      { title: 'Check each dimension after regeneration', body: 'Visit the Overworld, Nether, and End separately and wait for each area to generate before judging the result.' },
    ], related: ['distant-horizons-lod-cache-reset', 'distant-horizons-server-realms'],
  },
  {
    slug: 'distant-horizons-iris-sodium-crash', title: 'Distant Horizons Crashes with Iris or Sodium: Clean Test Setup',
    description: 'Diagnose Distant Horizons crashes involving Iris, Sodium, Embeddium, Oculus, shader packs, and duplicate rendering mods.', category: 'Compatibility', updated: '2026-07-29',
    intro: 'Rendering crashes are difficult to diagnose when several versions and rendering libraries are changed together. Build a clean profile, verify it launches, and add one dependency at a time.',
    symptoms: ['the game crashes when entering a world', 'the crash starts when shaders are enabled', 'a mixin or renderer error appears', 'the title screen loads but the world does not'],
    steps: [
      { title: 'Create a clean profile', body: 'Use the correct loader, its required API, and Distant Horizons only. Keep the world and instance backed up.' },
      { title: 'Add the performance mod', body: 'On Fabric, test Sodium; on NeoForge, test the matching Embeddium build. Do not install both rendering stacks.' },
      { title: 'Add the shader loader', body: 'Use Iris on Fabric or the appropriate NeoForge shader solution, then launch once before adding a shader pack.' },
      { title: 'Test one shader pack', body: 'Choose a pack with documented DH integration. If it crashes, remove the pack and record the exact versions for a report.' },
      { title: 'Read the first meaningful error', body: 'The first DH, loader, mixin, or OpenGL error in the crash report is usually more useful than the final generic exit code.' },
    ], related: ['distant-horizons-crash-on-startup', 'distant-horizons-shader-not-working'],
  },
  {
    slug: 'distant-horizons-best-settings-laptop', title: 'Best Distant Horizons Settings for Laptops and Integrated Graphics',
    description: 'Use a balanced Distant Horizons profile on laptops and integrated GPUs with lower heat, memory, and battery demand.', category: 'Hardware', updated: '2026-07-29',
    intro: 'Laptop performance depends on cooling, power mode, shared memory, and CPU limits as much as the GPU name. A stable medium-distance profile is usually better than a very high distance that constantly generates terrain.',
    symptoms: ['the laptop overheats while exploring', 'battery drains quickly', 'integrated graphics stutter with shaders', 'the game slows down after several minutes'],
    steps: [
      { title: 'Use plugged-in performance mode', body: 'Test while connected to power with the operating system set to a performance profile. Battery-saving modes can change the result dramatically.' },
      { title: 'Start with 8–12 vanilla chunks', body: 'Let DH provide the distant view while Minecraft renders a modest full-detail area.' },
      { title: 'Choose a lower LOD profile', body: 'Start around 64–128 chunks at low or medium quality, then increase distance only after temperatures and frame pacing are stable.' },
      { title: 'Disable shaders for diagnosis', body: 'Integrated GPUs often benefit more from a stable no-shader profile. Add a lightweight DH-aware shader only after the base setup is reliable.' },
    ], related: ['distant-horizons-low-fps', 'distant-horizons-high-cpu-usage'],
  },
  {
    slug: 'distant-horizons-vs-voxy-bobby', title: 'Distant Horizons vs Voxy vs Bobby: Which Mod Fits Your Goal?',
    description: 'Compare Distant Horizons, Voxy, and Bobby by view distance, terrain detail, storage, server behavior, and shader expectations.', category: 'Comparisons', updated: '2026-07-29',
    intro: 'These mods solve related but different problems. Distant Horizons focuses on far-distance LOD terrain, Bobby stores and renders previously loaded chunks, and Voxy uses its own approach to distant terrain. Choose by world size, server access, visual expectations, and loader support.',
    symptoms: ['you are choosing a distant-rendering mod', 'you want exact blocks far away', 'you play mostly on servers', 'you need shader support'],
    steps: [
      { title: 'Choose DH for a broad horizon', body: 'Distant Horizons is a strong fit when you want a very large view distance with simplified distant terrain and a documented shader integration path.' },
      { title: 'Choose Bobby for previously loaded chunks', body: 'Bobby is better understood as a client-side cache of chunks you have already loaded; it does not replace a true LOD generator for unexplored terrain.' },
      { title: 'Evaluate Voxy separately', body: 'Voxy may be attractive if its visual style, version support, and modpack compatibility match your setup. Test the exact game version before migrating.' },
      { title: 'Compare the same world', body: 'Use the same seed, camera route, render distance, loader, shader state, and performance target for a meaningful comparison.' },
    ], related: ['distant-horizons-fabric-vs-neoforge', 'distant-horizons-shader-not-working'],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
