'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ConsentChoice = 'accepted' | 'rejected';

const STORAGE_KEY = 'dhguide_analytics_consent';

function enableAnalytics() {
  if (!document.getElementById('google-analytics-script')) {
    const ga = document.createElement('script');
    ga.id = 'google-analytics-script';
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-89V8QD3P9T';
    document.head.appendChild(ga);
  }

  window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  window.gtag?.('config', 'G-89V8QD3P9T', { anonymize_ip: true });

  if (!document.getElementById('clarity-script')) {
    const clarity = document.createElement('script');
    clarity.id = 'clarity-script';
    clarity.async = true;
    clarity.src = 'https://www.clarity.ms/tag/vozzwftmwa';
    document.head.appendChild(clarity);
  }
}

function disableAnalytics() {
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
}

export default function ConsentScripts() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
      setChoice(stored);
      if (stored === 'accepted') enableAnalytics();
      if (stored === 'rejected') disableAnalytics();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, nextChoice);
    setChoice(nextChoice);
    setOpen(false);
    if (nextChoice === 'accepted') enableAnalytics();
    else disableAnalytics();
  };

  const showPanel = choice === null || open;

  return (
    <>
      {showPanel && (
        <section className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-5 text-sm shadow-2xl shadow-black/40" aria-label="Analytics privacy choices">
          <h2 className="font-bold text-foreground mb-2">Analytics privacy choices</h2>
          <p className="text-text-muted leading-relaxed">With your permission, Google Analytics and Microsoft Clarity help us understand which guides work and where visitors get stuck. Rejecting analytics does not limit site features. Advertising consent, when ads are enabled, is handled separately through a Google-certified consent message.</p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button type="button" className="btn-primary !py-2 !px-4 text-sm" onClick={() => saveChoice('accepted')}>Allow analytics</button>
            <button type="button" className="btn-secondary !py-2 !px-4 text-sm" onClick={() => saveChoice('rejected')}>Reject analytics</button>
            <Link href="/privacy" className="text-primary hover:underline">Privacy policy</Link>
          </div>
        </section>
      )}
      {!showPanel && (
        <button type="button" onClick={() => setOpen(true)} className="fixed bottom-3 right-3 z-[60] rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-muted hover:text-primary">
          Privacy choices
        </button>
      )}
    </>
  );
}
