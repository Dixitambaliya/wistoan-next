// app/collection/[id]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { WATCHES } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useState } from "react";
import { Heart } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const watch = WATCHES.find((w) => w.id === id);
    const { isFavorite } = useFavorites();

    if (!watch) notFound();

    const [activeImage, setActiveImage] = useState<string>(watch.mainImage);
    const isFav = isFavorite(watch.id);
    const images = [watch.mainImage, ...watch.gallery];

    const Spec = ({ label, value }: { label: string; value: string }) => (
        <div>
            <p className="text-[9px] uppercase tracking-widest text-white/40">{label}</p>
            <p className="text-white">{value}</p>
        </div>
    );

    return (
        <div className="pt-24 bg-black min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                {/* breadcrumb */}
                <nav className="mb-10 flex gap-3 text-[9px] uppercase tracking-[0.3em] text-white/30">
                    <Link href="/collection" className="hover:text-white">Catalog</Link>
                    <span>/</span>
                    <span className="text-amber-500">{watch.name}</span>
                </nav>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* LEFT — images */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="aspect-square bg-neutral-900 rounded-xl overflow-hidden shadow-xl relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={activeImage}
                                    alt={watch.name}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>

                            {/* Favorite Badge */}
                            <AnimatePresence>
                                {isFav && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <Heart size={12} className="fill-black" />
                                        </motion.div>
                                        In Your Collection
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* thumbnails */}
                        <div className="grid grid-cols-4 gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`aspect-square rounded-md overflow-hidden border transition ${activeImage === img
                                        ? "border-amber-500"
                                        : "border-transparent opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — details */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-6 space-y-6"
                    >
                        <span className="text-amber-500 text-[9px] uppercase tracking-[0.35em] font-bold">
                            {watch.tagline}
                        </span>

                        <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
                            {watch.name}
                        </h1>

                        <p className="text-lg text-white/80">{watch.price}</p>

                        <p className="text-white/50 text-sm leading-relaxed italic">
                            {watch.description}
                        </p>

                        {/* specs */}
                        <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-6 text-sm">
                            <Spec label="Movement" value={watch.specs.movement} />
                            <Spec label="Case" value={watch.specs.case} />
                            <Spec label="Strap" value={watch.specs.strap} />
                            <Spec label="Water" value={watch.specs.resistance} />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    const message = `Hi, I'm interested in this watch:\n\nName: ${watch.name}\nPrice: ${watch.price}\n\nView product: ${window.location.href}\n\nPlease share more details.`;
                                    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank");
                                }}
                                className="flex-1 bg-white cursor-pointer text-black py-4 rounded-full text-xs font-bold uppercase tracking-[0.35em] hover:bg-amber-500 transition"
                            >
                                Inquire for Purchase
                            </button>

                            <FavoriteButton watch={watch} />
                        </div>

                        {/* Status Message */}
                        <AnimatePresence mode="wait">
                            {isFav && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-amber-500 text-xs text-center"
                                >
                                    This watch is in your favorites collection
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
