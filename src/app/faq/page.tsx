import type { Metadata } from 'next';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import faqData from '@/data/faq.json';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'FAQ & Troubleshooting Guide',
    description:
        'Answers to common Distant Horizons questions. Fix crashes, flickering, and shader conflicts. Compare DH vs Voxy, learn about server support and more.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/faq',
    },
    ...socialMetadata(
        'Distant Horizons FAQ & Troubleshooting',
        'Fix common DH issues — crashes, flickering, performance, shader compatibility and more.',
        '/faq',
    ),
};

function FaqSchema() {
    const allQuestions = faqData.flatMap((cat) =>
        cat.questions.map((q) => ({
            '@type': 'Question' as const,
            name: q.q,
            acceptedAnswer: { '@type': 'Answer' as const, text: q.a },
        }))
    );

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: allQuestions,
                }),
            }}
        />
    );
}

export default function FaqPage() {
    return (
        <>
            <FaqSchema />
            <div className="pt-20">
                <FaqSection />
                <section className="max-w-4xl mx-auto px-4 pb-10 text-sm text-text-muted leading-relaxed space-y-3"><h2 className="text-xl font-bold text-foreground">Sources and scope</h2><p>Reviewed October 18, 2026 against the <a className="text-primary underline" href="https://modrinth.com/mod/distanthorizons" target="_blank" rel="noopener noreferrer">DH project FAQ</a>, <a className="text-primary underline" href="https://www.irisshaders.dev/" target="_blank" rel="noopener noreferrer">Iris FAQ</a>, <a className="text-primary underline" href="https://modrinth.com/mod/voxy" target="_blank" rel="noopener noreferrer">Voxy</a> and <a className="text-primary underline" href="https://modrinth.com/mod/bobby" target="_blank" rel="noopener noreferrer">Bobby</a> author descriptions. Starting settings and diagnostic comparisons are editorial guidance; no in-game benchmark was performed for this update.</p></section>
                {/* Internal links */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="glass rounded-2xl p-6 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Looking for specific help?</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/shaders" className="btn-secondary !py-2 !px-5 text-sm">Shader Compatibility</Link>
                            <Link href="/calculator" className="btn-secondary !py-2 !px-5 text-sm">Choose starting settings</Link>
                            <Link href="/install/1-21-11" className="btn-secondary !py-2 !px-5 text-sm">Install Guide</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
