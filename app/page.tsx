"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WatchCard } from "@/components/WatchCard";
import { WATCHES } from "@/lib/data";
import { TopPicks } from "@/components/TopPicks";

export default function Home() {
    const featuredWatches = WATCHES.slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="
                        absolute inset-0 opacity-30
                        bg-no-repeat bg-center
                        bg-[url('/logo.png')]
                        bg-size-[400px]        /* mobile */
                        sm:bg-size-[650px]     /* small tablets */
                        md:bg-size-[800px]     /* tablets */
                        lg:bg-size-[1200px]     /* desktop */
                        xl:bg-size-[1800px]     /* large screens */
                    "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

                <div className="relative z-10 text-center px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-6"
                    >
                        Est. 1998
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide mb-8"
                    >
                        A Legacy on<br />Your Wrist
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-amber-500 md:text-lg max-w-lg md:max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Timeless masterpieces crafted with uncompromising precision and heritage.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Link
                            href="/collection"
                            className="inline-block bg-white text-black px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300"
                        >
                            Explore Collection
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
                </motion.div>
            </section>

            {/* Featured Collection */}
            <TopPicks />

            {/* Heritage Section Preview */}
            <section className="py-32 px-6 md:px-12 bg-neutral-950">
                <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                        <img
                            src="/images/heritage.jpg"
                            alt="Wistoan Heritage"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-6">Our Heritage</p>
                        <h2 className="font-serif text-4xl md:text-5xl tracking-wide mb-8">20 Years of<br />Excellence</h2>
                        <p className="text-white/60 leading-relaxed mb-8 max-w-lg">
                            From our founding in Geneva to the present day, Wistoan has remained dedicated
                            to the art of haute horlogerie. Each timepiece represents generations of
                            craftsmanship and innovation.
                        </p>
                        <Link
                            href="/heritage"
                            className="inline-block border border-white/20 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Discover Our Story
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
