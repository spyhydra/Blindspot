"use client";

import { useState, useEffect } from "react";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled ? "bg-[#09090f]/80 backdrop-blur-lg border-b border-white/10 shadow-xl" : "bg-transparent"}`}
        >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group" id="nav-logo">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:scale-110 transition-transform">
                        <span className="text-white font-black text-sm">B</span>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">
                        Blind<span className="text-violet-400">spot</span>
                    </span>
                </a>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="#cta"
                    id="nav-cta"
                    className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-violet-600 to-indigo-600 text-white
            hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-500/30"
                >
                    Get Started →
                </a>

                {/* Mobile toggle */}
                <button
                    id="mobile-menu-toggle"
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-[#09090f]/95 backdrop-blur-lg border-t border-white/10 px-6 py-4 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#cta"
                        onClick={() => setOpen(false)}
                        className="mt-2 px-4 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                    >
                        Get Started →
                    </a>
                </div>
            )}
        </header>
    );
}
