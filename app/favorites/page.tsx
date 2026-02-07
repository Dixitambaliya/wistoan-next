// app/favorites/page.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function FavoritesPage() {
    const { favorites, isLoaded, clearAllFavorites } = useFavorites();

    if (!isLoaded) {
        return (
            <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-black flex items-center justify-center">
                <div className="animate-pulse text-white/40 text-xs uppercase tracking-[0.3em]">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-black">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">
                                Your Selection
                            </p>
                            <h1 className="font-serif text-5xl md:text-6xl tracking-wide">
                                Favorites
                            </h1>
                        </div>

                        {favorites.length > 0 && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={clearAllFavorites}
                                className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 rounded-full transition-all text-xs uppercase tracking-[0.2em]"
                            >
                                <Trash2 size={14} />
                                Clear All
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {/* Empty State */}
                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 border border-white/10 rounded-xl"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Heart size={48} className="mx-auto mb-6 text-white/20" />
                        </motion.div>
                        <p className="font-serif text-2xl mb-4">No favorites yet</p>
                        <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
                            Discover our collection and save your favorite timepieces for later.
                        </p>
                        <Link
                            href="/collection"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-amber-500 transition-colors rounded-full"
                        >
                            Explore Collection
                            <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* Results Count */}
                        <motion.p
                            key={favorites.length}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8"
                        >
                            {favorites.length} {favorites.length === 1 ? "timepiece" : "timepieces"} saved
                        </motion.p>

                        {/* Favorites Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {favorites.map((watch, index) => (
                                    <motion.div
                                        key={watch.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors"
                                    >
                                        {/* Image */}
                                        <Link href={`/watch/${watch.id}`} className="block">
                                            <div className="aspect-[4/5] overflow-hidden bg-neutral-800">
                                                <Image
                                                    src={watch.mainImage}
                                                    alt={watch.name}
                                                    width={600}
                                                    height={750}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                        </Link>

                                        {/* Quick Remove Button */}
                                        <div className="absolute top-4 right-4">
                                            <FavoriteButton watch={watch} variant="simple" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <p className="text-amber-500 text-[9px] uppercase tracking-[0.3em] mb-2">
                                                {watch.tagline}
                                            </p>
                                            <Link href={`/watch/${watch.id}`}>
                                                <h3 className="font-serif text-xl mb-2 group-hover:text-amber-500 transition-colors">
                                                    {watch.name}
                                                </h3>
                                            </Link>
                                            <p className="text-white/60 text-sm mb-4">{watch.price}</p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                                                    {watch.specs.case}
                                                </span>
                                                <Link
                                                    href={`/watch/${watch.id}`}
                                                    className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-1"
                                                >
                                                    View
                                                    <ArrowRight size={12} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Continue Shopping */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-16 text-center"
                        >
                            <Link
                                href="/collection"
                                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.3em]"
                            >
                                Continue Exploring
                                <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
