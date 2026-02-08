// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { InquiryModal } from "./InquiryModal";
import { Menu, Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";
import { TbTrademark } from "react-icons/tb";


export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const { favoritesCount } = useFavorites();

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
                            src="/logo.png"
                            alt="Wistoan Logo"
                            width={40}
                            height={40}
                            priority
                            className="grayscale group-hover:grayscale-0 transition-all duration-500"
                        />

                        <span className="font-serif text-lg tracking-[0.3em] uppercase font-bold flex items-start gap-1">
                            Wistoan
                            <TbTrademark className="w-4 h-4 text-white/40 -mt-1" />
                        </span>
                    </Link>


                    {/* Navigation */}
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

                        {/* Mobile Favorites */}
                        <Link
                            href="/favorites"
                            onClick={() => setIsMenuOpen(false)}
                            className="md:hidden flex items-center gap-2 text-white/70 hover:text-white"
                        >
                            <Heart size={16} />
                            Favorites
                            {favoritesCount > 0 && (
                                <span className="bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>

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

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Favorites Icon with Animated Badge */}
                        <Link
                            href="/favorites"
                            className="relative text-white/70 hover:text-white transition-colors"
                        >
                            <Heart size={20} />
                            <AnimatePresence mode="popLayout">
                                {favoritesCount > 0 && (
                                    <motion.span
                                        key="count"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                        className="absolute -top-2 -right-2 bg-amber-500 text-black text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                                    >
                                        {favoritesCount > 99 ? "99+" : favoritesCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        <button
                            onClick={() => setIsInquiryOpen(true)}
                            className="bg-white text-black px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            Inquire
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        {/* Mobile Favorites Icon */}
                        <Link href="/favorites" className="relative text-white">
                            <Heart size={20} />
                            {favoritesCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>

                        <button
                            className="text-white p-2 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </header>

            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />
        </>
    );
}
