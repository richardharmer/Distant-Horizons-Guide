'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Layers, Calculator, Download, HelpCircle, Info, BookOpen, Cpu } from 'lucide-react';

const navLinks = [
    { href: '/about', label: 'About DH', icon: Info },
    { href: '/shaders', label: 'Shaders', icon: Layers },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/install/1-21-11', label: 'Install', icon: Download },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/guides', label: 'Guides', icon: BookOpen },
    { href: '/hardware', label: 'Hardware', icon: Cpu },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const isActive = (href: string) => href.startsWith('/install/')
        ? pathname.startsWith('/install/')
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
        <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 glass-strong" onKeyDown={(event) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
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

                    <div className="hidden xl:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive(link.href) ? 'page' : undefined}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-muted aria-[current=page]:text-primary aria-[current=page]:bg-primary-glow hover:text-primary hover:bg-primary-glow transition-all duration-200"
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
                        ref={toggleRef}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsOpen(!isOpen)}
                        className="xl:hidden min-h-11 min-w-11 flex items-center justify-center p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface transition-colors"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div id="mobile-navigation" hidden={!isOpen} className="xl:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto glass-strong border-t border-border">
                <div className="px-4 py-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-muted aria-[current=page]:text-primary aria-[current=page]:bg-primary-glow hover:text-primary hover:bg-primary-glow transition-all"
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
        </nav>
    );
}
