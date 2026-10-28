export type ConsentChoice = 'accepted' | 'rejected';
export const CONSENT_KEY = 'dhguide_analytics_consent';
const GA_ID = 'G-89V8QD3P9T';
const CLARITY_ID = 'vozzwftmwa';
let currentChoice: ConsentChoice | null = null;
let configured = false;

type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global {
  interface Window {
    clarity?: Clarity;
    'ga-disable-G-89V8QD3P9T'?: boolean;
  }
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  if (currentChoice) return currentChoice;
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === 'accepted' || stored === 'rejected' ? stored : null;
  } catch {
    return null;
  }
}

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  script.onerror = () => script.remove(); // Allow a later consent action to retry.
  document.head.appendChild(script);
}

export function applyConsent(choice: ConsentChoice) {
  currentChoice = choice;
  try { window.localStorage.setItem(CONSENT_KEY, choice); } catch { /* Session-only choice. */ }
  window['ga-disable-G-89V8QD3P9T'] = choice !== 'accepted';
  window.gtag?.('consent', 'update', { analytics_storage: choice === 'accepted' ? 'granted' : 'denied' });

  if (choice === 'rejected') {
    window.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
    window.clarity?.('stop');
    // Unload already-running SDKs, including a script still in flight. The stored
    // rejection prevents either SDK loading again; no reload is needed on first refusal.
    if (configured || document.getElementById('clarity-script')) window.location.reload();
    return;
  }

  if (!configured) {
    window.gtag?.('config', GA_ID, { anonymize_ip: true });
    configured = true; // Reopening the consent panel must not count another page view.
  }
  loadScript('google-analytics-script', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  if (!window.clarity) {
    const queue: Clarity = (...args) => { (queue.q ??= []).push(args); };
    window.clarity = queue;
  }
  window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
  loadScript('clarity-script', `https://www.clarity.ms/tag/${CLARITY_ID}`);
}

export function analyticsEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (readConsent() !== 'accepted') return;
  window.gtag?.('event', name, params);
}
