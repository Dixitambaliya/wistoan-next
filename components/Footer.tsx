"use client";

import Link from "next/link";
import { WATCHES } from "@/lib/data";

export function Footer() {

    /* ✅ dynamically extract unique watch names */
    const collections = Array.from(
        new Set(WATCHES.map((w) => w.id))
    );

    return (
        <footer className="bg-black border-t border-white/10 py-16 px-6 md:px-12">

            <div className="max-w-[1600px] mx-auto grid md:grid-cols-4 gap-12">

                {/* Brand */}
                <div>
                    <h4 className="font-serif text-lg tracking-[0.2em] uppercase mb-6">
                        Wistoan
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                        Crafting precision masterpieces since 2000. A legacy of elegance.
                    </p>
                </div>


                {/* ================= COLLECTION (DYNAMIC) ================= */}
                <div>
                    <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6">
                        Collection
                    </h5>

                    <ul className="space-y-3 text-sm text-white/40">

                        {collections.map((id) => {
                            const slug = id.toLowerCase().replace(/\s+/g, "-");

                            return (
                                <li key={id}>
                                    <Link
                                        href={`/watch/${slug}`}
                                        className="hover:text-white transition-colors cursor-pointer"
                                    >
                                        {id}
                                    </Link>
                                </li>
                            );
                        })}


                    </ul>
                </div>


                {/* Atelier */}
                <div>
                    <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6">
                        Atelier
                    </h5>
                    <ul className="space-y-3 text-sm text-white/40">
                        <li className="hover:text-white cursor-pointer">Bespoke Services</li>
                        <li className="hover:text-white cursor-pointer">Restoration</li>
                        <li className="hover:text-white cursor-pointer">Authentication</li>
                    </ul>
                </div>


                {/* Contact */}
                <div>
                    <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6">
                        Contact
                    </h5>
                    <ul className="space-y-3 text-sm text-white/40">
                        <li>Patel Nagar, Rajkot</li>
                        <li>+91 98243 77313</li>
                        <li>info@wistoanwatch.com</li>
                    </ul>
                </div>

            </div>


            {/* Bottom bar */}
            <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                <p>&copy; 2024 Dixit Ambaliya. All rights reserved.</p>

                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors cursor-pointer">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-white transition-colors cursor-pointer">
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    );
}
