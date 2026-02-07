"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { InquiryModal } from "./InquiryModal";
import { Menu } from "lucide-react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    const navLinks = [
        { href: "/collection", label: "Collection" },
        { href: "/heritage", label: "Heritage" },
        { href: "/bespoke", label: "Bespoke" },
        { href: "/contactus", label: "Contact" }
    ];

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4 md:px-12">
                <div className="max-w-[1600px] mx-auto flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <Image
                            src="/images/hero-bg.jpg"
                            alt="Wistoan Logo"
                            width={40}
                            height={40}
                            priority
                            className="grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <span className="font-serif text-lg tracking-[0.3em] uppercase font-bold">
                            Wistoan
                        </span>
                    </Link>

                    {/* ✅ SINGLE NAV (mobile + desktop) */}
                    <nav
                        className={`
                            ${isMenuOpen ? "flex" : "hidden"}
                            md:flex
                            absolute md:static
                            top-full left-0 w-full md:w-auto
                            bg-black/95 md:bg-transparent
                            backdrop-blur-md md:backdrop-blur-none
                            border-b md:border-0 border-white/10
                            flex-col md:flex-row
                            gap-6 md:gap-10
                            py-6 md:py-0 px-6 md:px-0
                            text-xs uppercase tracking-[0.3em]
                        `}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile inquire inside same nav */}
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsInquiryOpen(true);
                            }}
                            className="md:hidden bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer"
                        >
                            Inquire
                        </button>
                    </nav>

                    {/* Desktop CTA */}
                    <button
                        onClick={() => setIsInquiryOpen(true)}
                        className="hidden md:block bg-white text-black px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        Inquire
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white p-2 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} strokeWidth={1.5} />
                    </button>
                </div>
            </header>

            {/* Modal */}
            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />
        </>
    );
}
