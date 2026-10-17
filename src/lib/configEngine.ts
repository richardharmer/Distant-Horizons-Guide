export type CpuThreads = 4 | 8 | 12 | 16;
export type GpuLevel = 'entry' | 'mid' | 'high' | 'ultra';
export type Target = 'performance' | 'balanced' | 'visuals';
export type RamAllocation = 4 | 6 | 8 | 12 | 16;
export interface HardwareProfile {
  cpuThreads: CpuThreads;
  gpuLevel: GpuLevel;
  target: Target;
  ramAllocation?: RamAllocation;
  shaderSupport?: boolean;
}
export interface SettingsRecommendation {
  lodDistance: number;
  lodQuality: string;
  builderThreads: number;
  cpuLoad: string;
  caveRendering: boolean;
  vanillaRenderDistance: number;
  ramAllocation: string;
}
// Editorial starting rules, not measured GPU tiers or a DH configuration schema.
// Keep these rules visible on /calculator and use this same result for the preview.
export function generateConfig(profile: HardwareProfile): { settings: SettingsRecommendation; suggestions: string[] } {
  const baseDistance = { performance: 64, balanced: 96, visuals: 128 }[profile.target];
  const constrained = profile.gpuLevel === 'entry' || profile.cpuThreads === 4 || profile.ramAllocation === 4;
  const lodDistance = Math.min(baseDistance, constrained ? 64 : profile.shaderSupport ? 96 : 128);
  const settings: SettingsRecommendation = {
    lodDistance,
    lodQuality: constrained || profile.target === 'performance' ? 'LOW' : 'MEDIUM',
    builderThreads: Math.min(4, Math.max(1, Math.floor(profile.cpuThreads / 4))),
    cpuLoad: 'LOW',
    caveRendering: false,
    vanillaRenderDistance: profile.target === 'performance' || constrained ? 8 : 10,
    ramAllocation: `${profile.ramAllocation ?? 6}G`,
  };
  const suggestions = [
    'These values are editorial starting rules. GPU categories are self-selected; the tool does not detect your hardware, driver, temperature or available system memory.',
    'Use the low CPU-load preset first. If your build exposes a builder-thread control, treat the displayed thread value as an alternative starting point, not a second mandatory setting.',
    `The ${settings.ramAllocation} allocation echoes your selection. Leave memory for the operating system; this tool does not calculate a safe heap from total installed RAM.`,
    `Compare the same viewpoint and route at ${settings.vanillaRenderDistance} vanilla chunks with shaders off. Record the exact versions and wait for LOD generation before changing distance.`,
    'Repeat the route in explored and unexplored terrain. If stutter only appears during generation, reduce generation load; if it persists with generation settled, compare shaders and vanilla rendering separately.',
  ];
  if (profile.shaderSupport) suggestions.push('Shader use limits this starting LOD distance to at most 96 chunks. This is an editorial precaution, not evidence that any shader or hardware combination is compatible.');
  return { settings, suggestions };
}
