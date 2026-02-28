'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Layers, Calculator, Download, HelpCircle, Info } from 'lucide-react';

const navLinks = [
    { href: '/about', label: 'About DH', icon: Info },
    { href: '/shaders', label: 'Shaders', icon: Layers },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/install/1-21-11', label: 'Install', icon: Download },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/logo.png"
                            alt="DHGuide Logo"
                            width={36}
                            height={36}
                            priority
                            className="rounded-lg transition-transform group-hover:scale-110"
                        />
                        <span className="text-lg font-bold tracking-tight">
                            <span className="text-primary">DH</span>
                            <span className="text-foreground">Guide</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-primary hover:bg-primary-glow transition-all duration-200"
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href="https://modrinth.com/mod/distanthorizons"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 btn-primary text-sm !py-2 !px-5"
                        >
                            <Download className="w-4 h-4" />
                            Download DH
                        </a>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden glass-strong border-t border-border animate-fade-in">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-muted hover:text-primary hover:bg-primary-glow transition-all"
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href="https://modrinth.com/mod/distanthorizons"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary"
                        >
                            <Download className="w-4 h-4" />
                            Download DH
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
