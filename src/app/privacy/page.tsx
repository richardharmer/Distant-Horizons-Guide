import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'How Distant Horizons Guide uses analytics, consent choices, advertising services, cookies, and external providers.',
    alternates: { canonical: 'https://distanthorizonsguide.com/privacy' },
    ...socialMetadata(
        'Privacy Policy',
        'How Distant Horizons Guide uses analytics, consent choices, advertising services, cookies, and external providers.',
        '/privacy',
    ),
};

export default function PrivacyPage() {
    return (
        <article className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">Privacy Policy</h1>
            <div className="prose-custom space-y-6 text-text-muted leading-relaxed">
                <p>Last updated: September 20, 2026</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Scope and contact</h2>
                <p>DistantHorizonsGuide.com is an independent guide website. Privacy questions and data requests can be sent to <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">{siteConfig.contactEmail}</a>.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Information processed</h2>
                <p>When optional analytics is allowed, Google Analytics and Microsoft Clarity may process pages viewed, approximate location derived from IP address, browser and device information, referring pages, interaction events, session timing, and technical diagnostics. Clarity may record interactions such as clicks, scrolling, and navigation.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Analytics consent</h2>
                <p>Analytics storage is denied by default. Google Analytics and Microsoft Clarity are loaded only after you select “Allow analytics.” Your choice is stored in local storage under <code>dhguide_analytics_consent</code>. You can reopen “Privacy choices” from the bottom of the site. Rejecting analytics does not limit site features.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Google advertising</h2>
                <p>The site may use Google AdSense after advertising is enabled. Third-party vendors, including Google, may place and read cookies on your browser or use web beacons, IP addresses, and other identifiers as a result of ad serving. Google and its partners may use advertising cookies to serve ads based on visits to this and other websites, subject to consent and regional requirements.</p>
                <p>Learn <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">how Google uses data from partner sites</a>. You can manage personalized advertising in <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>. Where required in the EEA, UK, and Switzerland, advertising consent will be requested through a Google-certified consent management platform before personalized ads are served.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Service providers and sharing</h2>
                <p>We do not sell personal information. Data may be processed by hosting, analytics, consent-management, and advertising providers to operate, secure, measure, and fund the site. Those providers act under their own terms and privacy policies. Advertising partners shown in a consent message may change as the advertising platform updates its vendor list.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. External links</h2>
                <p>Links to Modrinth, CurseForge, GitLab, Discord, Reddit, shader sites, and other external services are governed by those services&apos; privacy policies. Opening an external link may allow that service to receive your IP address, browser information, and referring URL.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Retention and choices</h2>
                <p>Analytics and advertising providers determine retention for data they process, subject to our account settings and applicable law. You may reject optional analytics, block cookies in your browser, use advertising opt-out controls, or contact us about information directly associated with a message you sent.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Children</h2>
                <p>This is a general-audience technical guide and is not directed specifically to children under the age required for independent consent in their country. We do not knowingly ask children to provide personal information.</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Policy changes</h2>
                <p>We may update this policy when providers, advertising status, or legal requirements change. Material revisions will update the date at the top of this page.</p>
            </div>
        </article>
    );
}
