export const siteConfig = {
  name: 'Distant Horizons Guide',
  shortName: 'DHGuide',
  url: 'https://distanthorizonsguide.com',
  lastVerified: '2026-07-29',
  currentRelease: '3.2.0-b',
  currentReleaseLabel: '3.2.x beta',
  officialReleaseUrl: 'https://gitlab.com/distant-horizons-team/distant-horizons/-/releases',
  officialModrinthUrl: 'https://modrinth.com/mod/distanthorizons',
};

export const analyticsEvent = (name: string, params: Record<string, string | number | boolean> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
};

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}
