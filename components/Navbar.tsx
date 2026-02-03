"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8">
            <svg viewBox="0 0 500 500" className="w-full h-full fill-white transition-transform group-hover:scale-110 duration-500">
              <path d="M50 150 L150 400 L250 150 L350 400 L450 150 L400 150 L350 300 L300 150 L250 250 L200 150 L150 300 L100 150 Z" />
            </svg>
          </div>
          <span className="font-serif text-lg tracking-[0.3em] uppercase font-bold text-white group-hover:text-amber-500 transition-colors duration-500">Wistoan</span>
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-semibold text-white/50">
          <Link href="/collection" className="hover:text-white transition-colors duration-300">Collection</Link>
          <Link href="/heritage" className="hover:text-white transition-colors duration-300">Heritage</Link>
          <Link href="/bespoke" className="hover:text-white transition-colors duration-300">Atelier</Link>
          <Link href="/bespoke" className="hover:text-white transition-colors duration-300">Bespoke</Link>
        </nav>

        <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
          Inquire
        </button>
      </div>
    </header>
  );
} 

