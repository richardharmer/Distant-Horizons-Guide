import { Github, ExternalLink, Heart } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="border-t border-border/50 bg-surface/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Image
                                src="/logo.png"
                                alt="DHGuide Logo"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                            <span className="text-lg font-bold">
                                <span className="text-primary">DH</span>Guide
                            </span>
                        </div>
                        <p className="text-sm text-text-dim leading-relaxed">
                            The ultimate Distant Horizons mod resource. Shader compatibility, optimized configs,
                            and installation guides — all in one place.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-2.5">
                            <li><a href="/shaders" className="text-sm text-text-muted hover:text-primary transition-colors">Shader Database</a></li>
                            <li><a href="/calculator" className="text-sm text-text-muted hover:text-primary transition-colors">Config Generator</a></li>
                            <li><a href="/install/1-21-1" className="text-sm text-text-muted hover:text-primary transition-colors">Installation Guide</a></li>
                            <li><a href="/faq" className="text-sm text-text-muted hover:text-primary transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Official Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Official Links</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <a href="https://modrinth.com/mod/distanthorizons" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors">
                                    <ExternalLink className="w-3 h-3" /> Modrinth
                                </a>
                            </li>
                            <li>
                                <a href="https://www.curseforge.com/minecraft/mc-mods/distant-horizons" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors">
                                    <ExternalLink className="w-3 h-3" /> CurseForge
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Jonodonozym/DistantHorizonsStub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors">
                                    <Github className="w-3 h-3" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.gg/distanthorizons" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors">
                                    <ExternalLink className="w-3 h-3" /> Discord
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Community</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <a href="https://www.reddit.com/r/DistantHorizons/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors">
                                    <ExternalLink className="w-3 h-3" /> Reddit
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/results?search_query=distant+horizons+minecraft" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors">
                                    <ExternalLink className="w-3 h-3" /> YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-text-dim max-w-md">
                        © {new Date().getFullYear()} DistantHorizonsGuide.com — An unofficial community resource.
                        Not affiliated with the Distant Horizons mod team.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                        <a href="/about" className="text-xs text-text-dim hover:text-primary transition-colors">About</a>
                        <a href="/contact" className="text-xs text-text-dim hover:text-primary transition-colors">Contact</a>
                        <a href="/privacy" className="text-xs text-text-dim hover:text-primary transition-colors">Privacy</a>
                        <a href="/terms" className="text-xs text-text-dim hover:text-primary transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
