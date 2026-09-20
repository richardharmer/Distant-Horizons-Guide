export const siteConfig = {
  name: 'Distant Horizons Guide',
  shortName: 'DHGuide',
  url: 'https://distanthorizonsguide.com',
  contactEmail: 'contact@distanthorizonsguide.com',
  lastVerified: '2026-09-20',
  currentRelease: '3.3.1',
  currentReleaseLabel: '3.3.x stable',
  officialReleaseUrl: 'https://gitlab.com/distant-horizons-team/distant-horizons/-/releases',
  officialGitlabUrl: 'https://gitlab.com/distant-horizons-team/distant-horizons',
  officialModrinthUrl: 'https://modrinth.com/mod/distanthorizons',
  officialDiscordUrl: 'https://discord.com/invite/distanthorizons',
};

export const analyticsEvent = (name: string, params: Record<string, string | number | boolean> = {}) => {
  const consent = typeof window !== 'undefined'
    ? window.localStorage.getItem('dhguide_analytics_consent')
    : null;
  if (consent === 'accepted' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
};

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}
