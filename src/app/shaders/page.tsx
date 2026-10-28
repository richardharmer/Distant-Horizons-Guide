import type { Metadata } from 'next';
import ShaderTable from '@/components/ShaderTable';
import Link from 'next/link';
import shaders from '@/data/shaders.json';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Distant Horizons Compatible Shaders: Pack List & Setup',
    description:
        'Find shaders compatible with Distant Horizons. Compare Photon, Complementary, Bliss and other packs, check author support, and fix missing LOD terrain.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/shaders',
    },
    ...socialMetadata(
        'Distant Horizons Compatible Shaders: Pack List & Setup',
        'Check Distant Horizons shader sources, documented support and exact-version limitations.',
        '/shaders',
    ),
};

const jsonLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'Distant Horizons Shader Compatibility Sources',
    numberOfItems: shaders.length,
    itemListElement: shaders.map((shader, index) => ({ '@type': 'ListItem', position: index + 1, name: shader.name, url: `https://distanthorizonsguide.com/shaders/${shader.slug}` })),
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
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                  <h2 className="text-2xl font-bold mb-4">Before enabling a shader</h2>
                  <ol className="list-decimal pl-5 space-y-3 text-text-muted">
                    <li>Confirm DH renders distant terrain with shaders disabled.</li>
                    <li>Match Minecraft, your loader, DH, Iris and its required Sodium version.</li>
                    <li>Read the shader archive’s explicit DH requirements, then test terrain and water beyond vanilla render distance.</li>
                  </ol>
                  <p className="mt-5 text-text-muted">Nearby lighting works but distant terrain disappears? Use the <Link className="text-primary underline" href="/guides/distant-horizons-shader-not-working">DH shaders not working checklist</Link>. For a stable baseline, start with the <Link className="text-primary underline" href="/guides/distant-horizons-best-settings">recommended settings profiles</Link>.</p>
                </section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="glass rounded-2xl p-6 text-center">
                        <h3 className="font-semibold text-foreground mb-2">Ready to install?</h3>
                        <p className="text-sm text-text-muted mb-4">
                            Check the exact versions and author requirements, then set up DH without shaders before adding a pack.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/install/1-21-11" className="btn-primary !py-2 !px-5 text-sm">Install for 1.21.11</Link>
                            <Link href="/install/1-20-1" className="btn-primary !py-2 !px-5 text-sm">Install for 1.20.1</Link>
                            <Link href="/calculator" className="btn-secondary !py-2 !px-5 text-sm">Choose starting settings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
