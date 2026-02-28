import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Distant Horizons Guide - Learn how we collect, use, and protect your data.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/privacy',
    },
};

export default function PrivacyPage() {
    return (
        <div className="pt-20 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">
                <span className="gradient-text">Privacy Policy</span>
            </h1>
            <div className="prose-custom space-y-6 text-text-muted leading-relaxed">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Information We Collect</h2>
                <p>
                    DistantHorizonsGuide.com uses analytics tools like Google Analytics and Microsoft Clarity to understand how visitors engage with our website. These tools may collect non-personally identifiable information such as browser type, operating system, referring pages, and time spent on the site.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. How We Use Information</h2>
                <p>
                    The information collected is used solely to improve the user experience, analyze website traffic trends, identify errors, and optimize our guides to better serve the Minecraft community. We do not sell or share your data with third-party advertisers.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Cookies</h2>
                <p>
                    Our analytics tools use cookies to track user interactions and differentiate between new and returning visitors. You can choose to disable cookies through your web browser settings at any time without fundamentally affecting your ability to use our guides and configuration tools.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Third-Party Links</h2>
                <p>
                    Our website contains links to third-party sites such as Modrinth, CurseForge, Discord, and GitHub. This Privacy Policy does not apply to those external websites. We are not responsible for the privacy practices, content, or data collection policies of any external sites we link to.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify visitors of any fundamental changes by updating the &quot;Last updated&quot; date at the top of this page.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                    <a href="mailto:contact@distanthorizonsguide.com" className="text-primary hover:underline font-medium">
                        contact@distanthorizonsguide.com
                    </a>.
                </p>
            </div>
        </div>
    );
}
