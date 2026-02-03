"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4 md:px-12">
            <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8">
                        <svg viewBox="0 0 500 500" className="w-full h-full fill-white transition-transform group-hover:scale-110 duration-500">
                            <path d="M50 150 L150 400 L250 150 L350 400 L450 150 L400 150 L350 300 L300 150 L250 250 L200 150 L150 300 L100 150 Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-lg tracking-[0.3em] uppercase font-bold leading-none">Wistoan</span>
                        <span className="text-[7px] uppercase tracking-[0.2em] text-white/40 mt-1">A Legacy on Your Wrist</span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-semibold text-white/50">
                    <Link href="/collection" className="hover:text-white transition-colors duration-300">Collection</Link>
                    <Link href="/heritage" className="hover:text-white transition-colors duration-300">Heritage</Link>
                    <Link href="/bespoke" className="hover:text-white transition-colors duration-300">Bespoke</Link>
                    <a href="#footer" className="hover:text-white transition-colors duration-300">Contact</a>
                </nav>

                <button className="bg-white text-black px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300">
                    Inquire
                </button>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 py-6 px-6 flex flex-col gap-4 text-[10px] uppercase tracking-[0.4em] font-semibold text-white/50">
                    <Link href="/collection" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Collection</Link>
                    <Link href="/heritage" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Heritage</Link>
                    <Link href="/bespoke" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Bespoke</Link>
                    <a href="#footer" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
                </nav>
            )}
        </header>
    );
}
