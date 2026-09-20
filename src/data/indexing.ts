export const INDEXABLE_INSTALL_VERSIONS = new Set([
  '26.3',
  '26.2',
  '1.21.11',
  '1.21.1',
]);

export const INDEXABLE_SHADER_SLUGS = new Set([
  'complementary-unbound',
  'complementary-reimagined',
  'bliss-shaders',
  'photon-shader',
  'rethinking-voxels',
  'bsl-shaders',
  'kappa-shader',
  'astralex-shaders',
]);

export const GUIDE_REDIRECTS: Record<string, string> = {
  'distant-horizons-lod-not-generating': '/guides/distant-horizons-chunks-not-loading',
  'distant-horizons-high-cpu-usage': '/guides/distant-horizons-low-fps',
  'distant-horizons-out-of-memory': '/guides/distant-horizons-ram-settings',
  'distant-horizons-garbage-collector': '/guides/distant-horizons-ram-settings',
  'distant-horizons-wrong-dimension': '/guides/distant-horizons-lod-cache-reset',
  'distant-horizons-dependencies': '/install/1-21-11',
};

export const REDIRECTED_GUIDE_SLUGS = new Set(Object.keys(GUIDE_REDIRECTS));
