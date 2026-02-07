// components/Toast.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

export function Toast() {
    const { lastAction } = useFavorites();

    return (
        <AnimatePresence>
            {lastAction && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -20, x: "-50%" }}
                    className="fixed top-20 md:top-24 left-1/2 z-[100] flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-4 bg-neutral-900 border border-white/10 rounded-full shadow-2xl max-w-[90vw] md:max-w-none"
                >
                    <div
                        className={`p-1.5 md:p-2 rounded-full shrink-0 ${lastAction.type === "added"
                            ? "bg-amber-500/20 text-amber-500"
                            : "bg-red-500/20 text-red-400"
                            }`}
                    >
                        {lastAction.type === "added" ? (
                            <Heart size={14} className="md:w-4 md:h-4 fill-amber-500" />
                        ) : (
                            <Trash2 size={14} className="md:w-4 md:h-4" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60">
                            {lastAction.type === "added" ? "Added to Favorites" : "Removed"}
                        </p>
                        <p className="text-xs md:text-sm text-white font-medium truncate max-w-[150px] md:max-w-[200px]">
                            {lastAction.watchName}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
