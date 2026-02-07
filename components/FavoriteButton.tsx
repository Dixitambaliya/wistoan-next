// components/FavoriteButton.tsx
"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Watch } from "@/types";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
    watch: Watch;
    variant?: "default" | "icon-only" | "simple";
    className?: string;
    showText?: boolean;
}

export function FavoriteButton({
    watch,
    variant = "default",
    className = "",
    showText = true,
}: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isActive = isFavorite(watch.id);

    if (variant === "icon-only") {
        return (
            <motion.button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(watch);
                }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:border-amber-500/50 transition-all duration-300 ${isActive ? "border-amber-500/50 bg-amber-500/10" : ""
                    } ${className}`}
                aria-label={isActive ? "Remove from favorites" : "Add to favorites"}
            >
                <motion.div
                    animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Heart
                        size={18}
                        className={`transition-colors duration-300 ${isActive ? "fill-amber-500 text-amber-500" : "text-white"
                            }`}
                    />
                </motion.div>
            </motion.button>
        );
    }

    if (variant === "simple") {
        return (
            <motion.button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(watch);
                }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full transition-all duration-300 ${isActive
                    ? "bg-amber-500 text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                    } ${className}`}
            >
                <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Heart size={20} className={isActive ? "fill-black" : ""} />
                </motion.div>
            </motion.button>
        );
    }

    return (
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(watch);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${isActive
                ? "bg-amber-500 text-black border-amber-500 hover:bg-amber-400"
                : "bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10"
                } ${className}`}
        >
            <motion.div
                animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
            >
                <Heart
                    size={16}
                    className={`transition-all duration-300 ${isActive ? "fill-black" : ""
                        }`}
                />
            </motion.div>
            {showText && (isActive ? "Saved" : "Add to Favorites")}
        </motion.button>
    );
}
