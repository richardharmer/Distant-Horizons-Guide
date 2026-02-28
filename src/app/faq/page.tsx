import type { Metadata } from 'next';
import FaqSection from '@/components/FaqSection';
import faqData from '@/data/faq.json';

export const metadata: Metadata = {
    title: 'FAQ & Troubleshooting Guide',
    description:
        'Answers to common Distant Horizons questions. Fix crashes, flickering, and shader conflicts. Compare DH vs Voxy, learn about server support and more.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/faq',
    },
    openGraph: {
        title: 'Distant Horizons FAQ & Troubleshooting',
        description: 'Fix common DH issues — crashes, flickering, performance, shader compatibility and more.',
    },
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
                {/* Internal links */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="glass rounded-2xl p-6 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Looking for specific help?</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <a href="/shaders" className="btn-secondary !py-2 !px-5 text-sm">Shader Compatibility</a>
                            <a href="/calculator" className="btn-secondary !py-2 !px-5 text-sm">Optimize Settings</a>
                            <a href="/install/1-21-1" className="btn-secondary !py-2 !px-5 text-sm">Install Guide</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
