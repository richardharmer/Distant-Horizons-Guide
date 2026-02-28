import type { Metadata } from 'next';
import ShaderTable from '@/components/ShaderTable';

export const metadata: Metadata = {
    title: 'DH Shader Compatibility Database',
    description:
        'Find which shaders work with Distant Horizons. 20+ shader packs tested with compatibility status, recommended settings, and known issues for DH mod.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/shaders',
    },
    openGraph: {
        title: 'DH Shader Compatibility Database',
        description:
            'Find which shaders work with Distant Horizons. 20+ shaders tested with compatibility status and settings.',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Shaders Compatible with Distant Horizons',
    description:
        'A comprehensive list of Minecraft shader packs and their compatibility with the Distant Horizons LOD mod.',
    numberOfItems: 20,
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'BSL Shaders', description: 'Compatible' },
        { '@type': 'ListItem', position: 2, name: 'Complementary Reimagined', description: 'Compatible' },
        { '@type': 'ListItem', position: 3, name: 'Complementary Unbound', description: 'Compatible' },
        { '@type': 'ListItem', position: 4, name: 'SEUS Renewed', description: 'Partial' },
        { '@type': 'ListItem', position: 5, name: "Sildur's Vibrant", description: 'Incompatible' },
    ],
};

export default function ShadersPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="pt-20">
                <ShaderTable />
                {/* Internal links to related pages */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="glass rounded-2xl p-6 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Ready to install?</h3>
                        <p className="text-sm text-text-muted mb-4">
                            Found a compatible shader? Set up Distant Horizons with our step-by-step guide.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <a href="/install/1-21-1" className="btn-primary !py-2 !px-5 text-sm">Install for 1.21.1</a>
                            <a href="/install/1-20-1" className="btn-primary !py-2 !px-5 text-sm">Install for 1.20.1</a>
                            <a href="/calculator" className="btn-secondary !py-2 !px-5 text-sm">Optimize Settings</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
