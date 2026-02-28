import type { Metadata } from 'next';
import { Mail, MessageSquare, Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the Distant Horizons Guide team. Report issues, provide feedback, or contribute to the shader compatibility database.',
    alternates: {
        canonical: 'https://distanthorizonsguide.com/contact',
    },
};

export default function ContactPage() {
    return (
        <div className="pt-20 pb-16 min-h-[80vh] flex flex-col justify-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
                    <MessageSquare className="w-4 h-4" />
                    Get in touch
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
                    <span className="gradient-text">Contact Us</span>
                </h1>
                <p className="text-lg text-text-muted">
                    Have feedback, found an issue with our guides, or want to contribute to the shader compatibility database? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="glass rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">Email Us</h2>
                <p className="text-text-muted mb-6 max-w-md">
                    For website feedback, guide corrections, and general inquiries, please shoot us an email at:
                </p>

                <a
                    href="mailto:contact@distanthorizonsguide.com"
                    className="text-xl sm:text-2xl font-bold text-primary hover:text-primary-dark transition-colors border-b border-primary/30 hover:border-primary pb-1 mb-8"
                >
                    contact@distanthorizonsguide.com
                </a>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-surface/50 border border-border/50 text-sm text-text-muted text-left">
                    <Heart className="w-5 h-5 text-danger shrink-0 mx-auto sm:mx-0" />
                    <p>
                        <strong>Note:</strong> We are an unofficial site. For technical support regarding the Distant Horizons mod itself, please use the official <a href="https://discord.gg/distanthorizons" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Discord Server</a> or <a href="https://github.com/Jonodonozym/DistantHorizonsStub/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">GitHub Issues</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
