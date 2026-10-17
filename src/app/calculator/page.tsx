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
            <section className="max-w-4xl mx-auto px-4 pb-16 text-text-muted leading-relaxed space-y-5">
                <h2 className="text-2xl font-bold text-foreground">How these starting rules work</h2>
                <p>This is a rule-based planning tool, not a benchmark or automatic hardware optimizer. It does not read your PC specifications. No measured FPS or tested GPU equivalence is claimed.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Lower load, Balanced and More detail begin at 64, 96 and 128 LOD chunks respectively.</li>
                    <li>Entry graphics, 4 CPU threads or a selected 4 GB heap cap that starting distance at 64. Shader use otherwise caps it at 96.</li>
                    <li>Constrained or Lower load profiles use Low quality and 8 vanilla chunks; other profiles use Medium quality and 10 vanilla chunks.</li>
                    <li>CPU load starts Low. An optional thread suggestion uses one quarter of selected logical threads, rounded down, between 1 and 4. Use it only if your DH build exposes that setting.</li>
                    <li>The selected RAM is echoed, not inferred. The tool cannot know how much memory your operating system and modpack need.</li>
                </ul>
                <p>These numbers are editorial starting choices, not official DH presets. The project FAQ separately recommends lowering CPU load, graphics quality or distant generation when investigating stutter. Its memory examples depend on workload and are not a universal heap requirement. <a className="text-primary underline" href="https://modrinth.com/mod/distanthorizons" target="_blank" rel="noopener noreferrer">Read the project FAQ</a>.</p>
                <h2 className="text-2xl font-bold text-foreground">Validate instead of trusting a tier label</h2>
                <p>Record your world, viewpoint, Minecraft/DH/loader versions, shader archive and resource pack. Compare a stationary view after generation finishes, then repeat one exploration route. Change only one setting and repeat. If the game becomes less responsive or starts using system swap, undo the change before increasing distance.</p>
                <p>No in-game test was performed for this tool update. Keep your measured results separate from the starting rules above.</p>
            </section>
        </div>
    );
}
