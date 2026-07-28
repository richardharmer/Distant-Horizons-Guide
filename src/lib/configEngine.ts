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

interface ConfigValues {
  lodChunkRenderDistance: number;
  verticalQuality: string;
  horizontalScale: string;
  numberOfThreads: number;
  cpuLoad: string;
  gpuUploadPercentage: number;
  dropoff: string;
  lodQuality: string;
  enableCaveRendering: boolean;
  vanillaRenderDistanceSuggestion: number;
  ramSuggestion: string;
}

const CONFIG_MAP: Record<GpuLevel, Record<Target, Partial<ConfigValues>>> = {
  entry: {
    performance: {
      lodChunkRenderDistance: 128,
      verticalQuality: 'LOW',
      horizontalScale: 'HALF',
      gpuUploadPercentage: 30,
      dropoff: 'AGGRESSIVE',
      lodQuality: 'LOW',
      enableCaveRendering: false,
      vanillaRenderDistanceSuggestion: 6,
      ramSuggestion: '4G',
    },
    balanced: {
      lodChunkRenderDistance: 192,
      verticalQuality: 'MEDIUM',
      horizontalScale: 'HALF',
      gpuUploadPercentage: 40,
      dropoff: 'MODERATE',
      lodQuality: 'LOW',
      enableCaveRendering: false,
      vanillaRenderDistanceSuggestion: 8,
      ramSuggestion: '4G',
    },
    visuals: {
      lodChunkRenderDistance: 256,
      verticalQuality: 'MEDIUM',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 50,
      dropoff: 'MODERATE',
      lodQuality: 'MEDIUM',
      enableCaveRendering: false,
      vanillaRenderDistanceSuggestion: 8,
      ramSuggestion: '6G',
    },
  },
  mid: {
    performance: {
      lodChunkRenderDistance: 256,
      verticalQuality: 'MEDIUM',
      horizontalScale: 'HALF',
      gpuUploadPercentage: 40,
      dropoff: 'MODERATE',
      lodQuality: 'MEDIUM',
      enableCaveRendering: false,
      vanillaRenderDistanceSuggestion: 10,
      ramSuggestion: '6G',
    },
    balanced: {
      lodChunkRenderDistance: 384,
      verticalQuality: 'HIGH',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 50,
      dropoff: 'SMOOTH',
      lodQuality: 'MEDIUM',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 12,
      ramSuggestion: '6G',
    },
    visuals: {
      lodChunkRenderDistance: 512,
      verticalQuality: 'HIGH',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 60,
      dropoff: 'SMOOTH',
      lodQuality: 'HIGH',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 12,
      ramSuggestion: '8G',
    },
  },
  high: {
    performance: {
      lodChunkRenderDistance: 384,
      verticalQuality: 'HIGH',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 50,
      dropoff: 'SMOOTH',
      lodQuality: 'HIGH',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 12,
      ramSuggestion: '8G',
    },
    balanced: {
      lodChunkRenderDistance: 512,
      verticalQuality: 'HIGH',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 60,
      dropoff: 'SMOOTH',
      lodQuality: 'HIGH',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 16,
      ramSuggestion: '8G',
    },
    visuals: {
      lodChunkRenderDistance: 768,
      verticalQuality: 'ULTRA',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 70,
      dropoff: 'GENTLE',
      lodQuality: 'ULTRA',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 16,
      ramSuggestion: '10G',
    },
  },
  ultra: {
    performance: {
      lodChunkRenderDistance: 512,
      verticalQuality: 'HIGH',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 60,
      dropoff: 'SMOOTH',
      lodQuality: 'HIGH',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 16,
      ramSuggestion: '10G',
    },
    balanced: {
      lodChunkRenderDistance: 768,
      verticalQuality: 'ULTRA',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 70,
      dropoff: 'GENTLE',
      lodQuality: 'ULTRA',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 20,
      ramSuggestion: '12G',
    },
    visuals: {
      lodChunkRenderDistance: 1024,
      verticalQuality: 'ULTRA',
      horizontalScale: 'FULL',
      gpuUploadPercentage: 80,
      dropoff: 'GENTLE',
      lodQuality: 'ULTRA',
      enableCaveRendering: true,
      vanillaRenderDistanceSuggestion: 24,
      ramSuggestion: '16G',
    },
  },
};

const CPU_THREAD_MAP: Record<CpuThreads, Record<Target, { threads: number; cpuLoad: string }>> = {
  4: {
    performance: { threads: 1, cpuLoad: 'LOW' },
    balanced: { threads: 2, cpuLoad: 'MEDIUM' },
    visuals: { threads: 2, cpuLoad: 'MEDIUM' },
  },
  8: {
    performance: { threads: 2, cpuLoad: 'LOW' },
    balanced: { threads: 3, cpuLoad: 'MEDIUM' },
    visuals: { threads: 4, cpuLoad: 'HIGH' },
  },
  12: {
    performance: { threads: 3, cpuLoad: 'LOW' },
    balanced: { threads: 4, cpuLoad: 'MEDIUM' },
    visuals: { threads: 6, cpuLoad: 'HIGH' },
  },
  16: {
    performance: { threads: 4, cpuLoad: 'LOW' },
    balanced: { threads: 6, cpuLoad: 'MEDIUM' },
    visuals: { threads: 8, cpuLoad: 'HIGH' },
  },
};

export function generateConfig(profile: HardwareProfile): {
  toml: string;
  suggestions: string[];
} {
  const gpuConfig = CONFIG_MAP[profile.gpuLevel][profile.target];
  const cpuConfig = CPU_THREAD_MAP[profile.cpuThreads][profile.target];

  const config: ConfigValues = {
    lodChunkRenderDistance: gpuConfig.lodChunkRenderDistance!,
    verticalQuality: gpuConfig.verticalQuality!,
    horizontalScale: gpuConfig.horizontalScale!,
    numberOfThreads: cpuConfig.threads,
    cpuLoad: cpuConfig.cpuLoad,
    gpuUploadPercentage: gpuConfig.gpuUploadPercentage!,
    dropoff: gpuConfig.dropoff!,
    lodQuality: gpuConfig.lodQuality!,
    enableCaveRendering: gpuConfig.enableCaveRendering!,
    vanillaRenderDistanceSuggestion: gpuConfig.vanillaRenderDistanceSuggestion!,
    ramSuggestion: profile.ramAllocation ? `${profile.ramAllocation}G` : gpuConfig.ramSuggestion!,
  };

  const toml = `# ═══════════════════════════════════════════════════
# Distant Horizons — Optimized Configuration
# Generated by DistantHorizonsGuide.com
# Profile: ${profile.gpuLevel.toUpperCase()} GPU | ${profile.cpuThreads} CPU Threads | ${profile.target.toUpperCase()}
# ═══════════════════════════════════════════════════

[general]
# Maximum distance LODs will render (in chunks)
lodChunkRenderDistanceRadius = ${config.lodChunkRenderDistance}

[graphics]
# Quality of LOD vertical detail
verticalQuality = "${config.verticalQuality}"

# Horizontal resolution scale
horizontalScale = "${config.horizontalScale}"

# Overall LOD quality level
quality = "${config.lodQuality}"

# Distance dropoff curve — how LOD detail fades
dropoffQuality = "${config.dropoff}"

# Enable cave LOD rendering
enableCaveRendering = ${config.enableCaveRendering}

[performance]
# Number of CPU threads for LOD building
numberOfLodBuilderThreads = ${config.numberOfThreads}

# CPU load target
cpuLoad = "${config.cpuLoad}"

# GPU upload budget (percentage of frame time)
gpuUploadPercentage = ${config.gpuUploadPercentage}

# ═══════════════════════════════════════════════════
# LAUNCHER SETTINGS (apply outside Minecraft)
# ═══════════════════════════════════════════════════
# Recommended JVM arguments:
#   -Xmx${config.ramSuggestion}
# Suggested vanilla render distance: ${config.vanillaRenderDistanceSuggestion} chunks`;

  const suggestions: string[] = [];

  if (profile.gpuLevel === 'entry') {
    suggestions.push(
      '💡 Consider installing Sodium (Fabric) or Embeddium (NeoForge) for significantly better frame rates.'
    );
    suggestions.push(
      '💡 Avoid using shaders if your GPU is low-end. DH alone provides a massive visual upgrade.'
    );
  }

  if (profile.shaderSupport && profile.gpuLevel === 'entry') {
    suggestions.push(
      'Shaders are enabled for this profile. Start with a low-impact pack and reduce LOD distance if frame pacing becomes unstable.'
    );
  }

  if (profile.shaderSupport && profile.gpuLevel !== 'entry') {
    suggestions.push(
      'Use a shader pack with documented Distant Horizons support and verify the exact Minecraft, DH, and shader-loader versions.'
    );
  }

  if (profile.target === 'visuals' && profile.gpuLevel !== 'ultra') {
    suggestions.push(
      '🎮 For even better visuals, consider upgrading your GPU. A mid-range GPU like the RTX 4060 handles DH + shaders beautifully.'
    );
  }

  if (config.lodChunkRenderDistance >= 512) {
    suggestions.push(
      `⚡ With ${config.lodChunkRenderDistance} chunks, initial LOD generation may take 10-15 minutes of exploration. Be patient!`
    );
  }

  if (profile.cpuThreads <= 4) {
    suggestions.push(
      '⚠️ With only 4 threads, avoid running heavy background tasks while DH is generating LODs.'
    );
  }

  suggestions.push(
    `📦 Set your RAM to -Xmx${config.ramSuggestion} in your launcher's JVM arguments.`
  );

  suggestions.push(
    `🔧 Set your vanilla render distance to ${config.vanillaRenderDistanceSuggestion} chunks — DH handles the rest.`
  );

  return { toml, suggestions };
}
