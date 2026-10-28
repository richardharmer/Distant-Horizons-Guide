export const siteConfig = {
  name: 'Distant Horizons Guide',
  shortName: 'DHGuide',
  url: 'https://distanthorizonsguide.com',
  contactEmail: 'contact@distanthorizonsguide.com',
  lastVerified: '2026-10-18',
  currentRelease: '3.3.3',
  currentReleaseLabel: '3.3.x stable',
  officialReleaseUrl: 'https://gitlab.com/distant-horizons-team/distant-horizons/-/releases',
  officialGitlabUrl: 'https://gitlab.com/distant-horizons-team/distant-horizons',
  officialModrinthUrl: 'https://modrinth.com/mod/distanthorizons',
  officialDiscordUrl: 'https://discord.com/invite/distanthorizons',
};

export { analyticsEvent } from '@/lib/analytics';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}
