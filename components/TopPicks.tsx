"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WatchCard } from "@/components/WatchCard";
import { WATCHES } from "@/lib/data";

export function TopPicks() {
    // 👉 you control logic here
    // first 3, random, or flag based
    const topPicks = WATCHES.slice(0, 3);

    return (
        <section className="py-32 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div>
                        <p className="text-amber-500 text-[11px] uppercase tracking-[0.4em] mb-4">
                            Top Picks
                        </p>

                        <h2 className="font-serif text-4xl md:text-5xl tracking-wide">
                            Featured Timepieces
                        </h2>
                    </div>

                    <Link
                        href="/collection"
                        className="mt-6 md:mt-0 text-[11px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors border-b border-white/20 pb-1"
                    >
                        View All Models
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topPicks.map((watch, index) => (
                        <motion.div
                            key={watch.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <WatchCard watch={watch} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
