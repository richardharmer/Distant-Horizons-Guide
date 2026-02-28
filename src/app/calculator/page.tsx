import type { Metadata } from 'next';
import ConfigCalculator from '@/components/ConfigCalculator';

export const metadata: Metadata = {
    title: 'Best Settings & Config Generator',
    description:
        'Generate optimized Distant Horizons settings for your hardware. Input CPU, GPU, and target to get a ready-to-use distant_horizons.toml config file.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/calculator',
    },
    openGraph: {
        title: 'Distant Horizons Best Settings Calculator',
        description: 'Generate optimized DH config for your hardware — from entry GPUs to RTX 4090.',
    },
};

export default function CalculatorPage() {
    return (
        <div className="pt-20">
            <ConfigCalculator />
        </div>
    );
}
