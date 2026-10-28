// Editorial diagnostic procedures, not observed test results.
export type DiagnosticCheck = { observation: string; check: string; meaning: string };
export const guideChecks: Record<string, DiagnosticCheck[]> = {
  'distant-horizons-low-fps': [
    { observation: 'Stutter only while exploring', check: 'Repeat the same route after its LOD generation settles, with the same distances and shaders off.', meaning: 'A difference points toward generation workload; it does not establish a GPU limit.' },
    { observation: 'Low FPS while standing still', check: 'Keep the viewpoint and lower only vanilla distance, then restore it and compare shaders separately.', meaning: 'This separates full-detail rendering and shader cost from the generation queue.' },
    { observation: 'Increasing RAM did not help', check: 'Restore the previous heap and compare CPU load and system memory pressure.', meaning: 'A larger heap cannot resolve every rendering or generation bottleneck.' },
  ],
  'distant-horizons-high-cpu-usage': [
    { observation: 'CPU rises in new terrain', check: 'Stand still until the queue settles, then compare with a second trip through the same area.', meaning: 'Work that settles is different from a persistent load or stalled queue.' },
    { observation: 'Input becomes sluggish', check: 'Lower the DH CPU-load preset one step while keeping distance constant.', meaning: 'Judge game responsiveness as well as generation speed; maximum CPU use is not the goal.' },
  ],
  'distant-horizons-lod-not-generating': [
    { observation: 'Old LODs display, but no new LODs appear', check: 'Compare a newly visited local-world area with the server session, without shaders.', meaning: 'Existing data rendering narrows the question to generation or terrain delivery.' },
    { observation: 'No visible progress while stationary', check: 'Record the generation setting and queue state before and after waiting in the same place.', meaning: 'A queue that changes slowly is different from a disabled generator; no universal wait time is assumed.' },
  ],
  'distant-horizons-chunks-not-loading': [
    { observation: 'Horizon disappears only with shaders', check: 'Turn off only the shader, keep DH enabled and return to the same landmark.', meaning: 'If the LOD returns, focus on shader integration rather than deleting data.' },
    { observation: 'Only multiplayer is affected', check: 'Compare client-only play with a locally generated world and record server-side DH availability.', meaning: 'Remote terrain delivery is a separate layer from local rendering.' },
    { observation: 'Terrain appears after travel', check: 'Record whether the area was previously visited and whether the server supplies LODs.', meaning: 'Client exploration and server-provided LODs have different data sources.' },
  ],
  'distant-horizons-out-of-memory': [
    { observation: 'A crash mentions Java heap space', check: 'Record the actual launcher heap and keep the first allocation error and crash report.', meaning: 'This is evidence of heap pressure; an exit code alone is not.' },
    { observation: 'The whole computer slows down', check: 'Check free system memory and swap before increasing the heap.', meaning: 'Allocating more memory to Minecraft can reduce memory available to the operating system.' },
  ],
  'distant-horizons-ram-settings': [
    { observation: 'Choosing an initial allocation', check: 'Use the modpack requirements and installed physical memory, then observe a representative session.', meaning: 'The calculator echoes your selection; it does not infer a safe heap from total memory.' },
    { observation: 'Memory grows during generation', check: 'Compare usage before exploration, during building and after the workload settles.', meaning: 'A rising value during work alone does not prove a memory leak.' },
  ],
  'distant-horizons-garbage-collector': [
    { observation: 'Repeated periodic freezes', check: 'Record Java version, existing JVM arguments and pause timestamps before changing collectors.', meaning: 'Correlating pauses with a log is stronger evidence than attributing every freeze to garbage collection.' },
    { observation: 'Considering JVM flags', check: 'Follow the launcher and Java-version documentation; save the original arguments first.', meaning: 'Do not paste a flag bundle intended for another Java runtime. No collector benchmark is published here.' },
  ],
  'distant-horizons-wrong-dimension': [
    { observation: 'Terrain belongs to another dimension', check: 'Record the exact save, server address/port and dimension in both sessions.', meaning: 'World identity must be established before changing any cache.' },
    { observation: 'A fresh world looks correct', check: 'Compare only after a backup; move identified DH data aside with the game closed.', meaning: 'Preserve a reversible comparison. Do not delete the world save or guess a database path.' },
  ],
  'distant-horizons-lod-cache-reset': [
    { observation: 'Considering a data reset', check: 'Close the game, back up the instance and locate DH data using instructions for the installed build.', meaning: 'This guide deliberately avoids a universal deletion path; locations vary by build and context.' },
    { observation: 'Rebuild did not fix the issue', check: 'Restore the backup if needed and compare the same scene without shaders and resource packs.', meaning: 'Do not repeatedly delete data when a rendering mismatch remains possible.' },
  ],
  'distant-horizons-server-commands': [
    { observation: 'Looking for a pre-generation command', check: 'Identify whether the server runs the DH mod, a separate Bukkit support plugin, or neither; use that exact project’s documentation.', meaning: 'A client-only install cannot grant server administration functions. No universal /dh subcommand is verified here.' },
    { observation: 'Server has DH, but clients get no LODs', check: 'Ask the administrator to check the installed build and its distant-generation setting, then compare a matching client.', meaning: 'The official project FAQ describes server/client LOD delivery; it does not imply every server command has the same syntax.' },
    { observation: 'A command is unknown or permission-denied', check: 'Keep the exact message and build, and consult the server’s available help/completion without executing a bulk task.', meaning: 'Unknown command and missing permission are different failures. Do not guess generation commands on a live world.' },
  ],
  'distant-horizons-server-realms': [
    { observation: 'Using a client-only server or Realm', check: 'Explore a recognizable area, leave, and revisit using the same profile.', meaning: 'The client can retain received terrain; this does not promise data for an unexplored remote area.' },
    { observation: 'The server supplies DH data', check: 'Record server/client builds and check whether server distant generation is enabled.', meaning: 'Distinguish the server delivery path from client-only exploration before comparing speed.' },
  ],
  'distant-horizons-vs-voxy-bobby': [
    { observation: 'Want distant LOD terrain', check: 'Compare DH and Voxy files for the exact loader and game version; test separately.', meaning: 'The Voxy author requires OpenGL 4.6 and explicit shader support. Similar purpose does not establish interchangeable requirements.' },
    { observation: 'Want to retain server-sent chunks', check: 'Read Bobby’s cache and optional fallback-world behavior.', meaning: 'Bobby stores server-sent chunk data; it is not the same task as rendering simplified LOD terrain.' },
    { observation: 'Choosing by screenshots or FPS claims', check: 'Use the same world, route and rendering settings before comparing your own results.', meaning: 'This page publishes a feature comparison, not a measured performance ranking.' },
  ],
  'distant-horizons-vulkan-opengl': [
    { observation: 'Iris with a separate Vulkan rendering mod', check: 'Duplicate the instance and remove that render replacement before testing Iris.', meaning: 'Iris explicitly lists Vulkan mods among incompatible render replacements. This is distinct from DH’s own renderer options.' },
    { observation: 'An OpenGL error remains without shaders', check: 'Keep the first renderer error, GPU/driver version and loaded mod list.', meaning: 'A generic OpenGL message alone does not identify a specific DH bug.' },
  ],
  'distant-horizons-c2me': [
    { observation: 'DH works before adding C2ME', check: 'Add only the exact C2ME build, then compare the same seed and route in a duplicate profile.', meaning: 'This is an isolation procedure, not a claim that the combination is supported or unsupported.' },
    { observation: 'An old post recommends a config toggle', check: 'Check that the installed C2ME version documents that option before editing.', meaning: 'No universal IO/serializer patch is established by this review.' },
  ],
  'distant-horizons-shader-not-working': [
    { observation: 'Iris loads the shader but LODs are absent', check: 'Find an explicit DH statement for the selected shader archive, not only the Iris platform badge.', meaning: 'Iris’s DH interface has separate terrain/water programs; ordinary shader loading is not sufficient evidence.' },
    { observation: 'NeoForge setup uses an old Oculus recipe', check: 'Check Iris support for the exact NeoForge game version and its matching Sodium files.', meaning: 'Current Iris supports NeoForge 1.21.1 or newer; Forge is a different loader.' },
  ],
};

export function getGuideChecks(slug: string, category: string): DiagnosticCheck[] {
  if (slug === 'distant-horizons-client-or-server-side') return [
    { observation: 'Client-only multiplayer', check: 'Explore an area, disconnect and revisit it with the same instance.', meaning: 'Retaining visited terrain is different from receiving LODs for unexplored areas.' },
    { observation: 'Server-provided LODs', check: 'Check the matching server mod or plugin and distant-generation settings on both sides.', meaning: 'Do not assume that a client download also belongs in a server plugins folder.' },
  ];
  if (guideChecks[slug]) return guideChecks[slug];
  if (category === 'Installation' || category === 'Getting Started') return [
    { observation: 'Selecting files', check: 'Keep Minecraft and loader fixed; open the exact release record and compare the filename and dependency list.', meaning: 'A game-version label is not evidence that a nearby patch or different loader is compatible.' },
    { observation: 'Adding optional rendering mods', check: 'Launch the base instance first, then add a version-matched renderer and shader one at a time.', meaning: 'A clean baseline identifies which addition changes the behavior.' },
  ];
  if (category === 'Hardware' || category === 'Performance') return [
    { observation: 'Choosing a starting profile', check: 'Use an editorial 64–128 chunk LOD baseline with shaders off, then compare the same route.', meaning: 'These are starting choices, not an FPS promise or a measured hardware limit.' },
    { observation: 'Behavior changes over time', check: 'Record generation state, system memory and, on a laptop, power/thermal conditions.', meaning: 'A cold stationary scene and sustained exploration measure different workloads.' },
  ];
  return [
    { observation: 'The symptom appears in a modpack', check: 'Keep a copy of the instance and compare DH alone before reintroducing the relevant rendering or world-generation mods.', meaning: 'A clean comparison narrows the cause without asserting that every mod combination was tested.' },
    { observation: 'Preparing a reproducible report', check: 'Keep the exact builds, first log error, dimension, viewpoint and actions that trigger the symptom.', meaning: 'An exit code or screenshot without setup details is insufficient for an exact compatibility conclusion.' },
  ];
}

const dhSource = { title: 'Distant Horizons project FAQ', url: 'https://modrinth.com/mod/distanthorizons', scope: 'Project description, client/server behavior and general stutter guidance; not a reproduction of this guide’s steps.' };
const irisSource = { title: 'Iris compatibility FAQ', url: 'https://www.irisshaders.dev/', scope: 'Supported loaders, requirement for explicit shader integration and render-replacement conflicts.' };
export function getGuideSources(slug: string, category: string) {
  if (slug === 'distant-horizons-client-or-server-side') return [dhSource,
    { title: 'Distant Horizons Support plugin', url: 'https://modrinth.com/plugin/distant-horizons-support', scope: 'Separate Bukkit-compatible server plugin and its own version requirements.' },
    { title: 'Minecraft Java Realms guidance', url: 'https://help.minecraft.net/hc/en-us/articles/360029644312', scope: 'Official joining guidance recommends using Realms without mods; client-only DH is not an official Realms feature.' },
  ];
  if (slug === 'distant-horizons-vs-voxy-bobby') return [dhSource,
    { title: 'Voxy author description', url: 'https://modrinth.com/mod/voxy', scope: 'LOD rendering, OpenGL requirement and explicit shader support.' },
    { title: 'Bobby author description', url: 'https://modrinth.com/mod/bobby', scope: 'Server-sent chunk caching and optional fallback-world behavior.' },
  ];
  if (/shader|iris|optifine|dependencies|vulkan|fabric-vs/.test(slug) || category === 'Shaders') return [dhSource, irisSource];
  return [dhSource];
}
