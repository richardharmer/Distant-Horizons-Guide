import type { Metadata } from 'next';
import ConfigCalculator from '@/components/ConfigCalculator';
import { socialMetadata } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Distant Horizons Starting Settings Guide',
    description:
        'Choose conservative Distant Horizons starting settings for your CPU, GPU, RAM, shader use, and performance target.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/calculator',
    },
    ...socialMetadata(
        'Distant Horizons Starting Settings Guide',
        'Build a conservative DH starting profile for your hardware, then validate it in your current game version.',
        '/calculator',
    ),
};

export default function CalculatorPage() {
    return (
        <div className="pt-20">
            <ConfigCalculator />
        </div>
    );
}
