import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Distant Horizons Guide. Use of our website implies acceptance of these terms.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/terms',
    },
};

export default function TermsPage() {
    return (
        <div className="pt-20 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">
                <span className="gradient-text">Terms of Service</span>
            </h1>
            <div className="prose-custom space-y-6 text-text-muted leading-relaxed">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using DistantHorizonsGuide.com (&quot;the Website&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Website.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Unofficial Status &amp; Disclaimer</h2>
                <p>
                    DistantHorizonsGuide.com is an independent, unofficial community resource. It is <strong>NOT</strong> affiliated with, endorsed by, sponsored by, or connected to the official Distant Horizons mod development team, Mojang AB, or Microsoft.
                </p>
                <p>
                    All Minecraft assets, brand names, and trademarks are the property of their respective owners. The guides, configurations, shader compatibility lists, and tools provided on this site are for informational and educational purposes only. We do not guarantee that the information is entirely accurate, complete, or up-to-date.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Use of Content</h2>
                <p>
                    The content on this Website is provided free of charge for the Minecraft community. You may use our guides, copy configuration code, and share our links for your personal gaming experience. You may not scrape, frame, or commercially redistribute our original content without explicit permission.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Limitation of Liability</h2>
                <p>
                    In no event shall DistantHorizonsGuide.com, its maintainers, or contributors be liable for any direct, indirect, incidental, or consequential damages (including, without limitation, damages for loss of data or profit, game crashes, corrupted saves, or hardware issues) arising out of the use or inability to use the information and materials on this Website.
                </p>
                <p>
                    <strong>Always back up your Minecraft worlds before installing new mods or making configuration changes.</strong> Modding carries inherent risks, and you modify your game at your own risk.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Revisions and Errata</h2>
                <p>
                    The materials appearing on the Website could include technical, typographical, or visual errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the content at any time without notice, but we make no commitment to update the materials.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. External Links</h2>
                <p>
                    The Website contains links to external websites (e.g., Modrinth, CurseForge, GitHub). We have not reviewed all of the sites linked and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement. Use of any linked website is at the user&apos;s own risk.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Contact Information</h2>
                <p>
                    If you have any questions regarding these Terms of Service or believe copyrighted material has been misused, please contact us at{' '}
                    <a href="mailto:contact@distanthorizonsguide.com" className="text-primary hover:underline font-medium">
                        contact@distanthorizonsguide.com
                    </a>.
                </p>
            </div>
        </div>
    );
}
