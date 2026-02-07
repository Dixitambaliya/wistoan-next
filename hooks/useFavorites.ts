// hooks/useFavorites.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Watch } from "@/types";

const STORAGE_KEY = "wistoan_favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState<Watch[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever favorites change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addToFavorites = useCallback((watch: Watch) => {
        setFavorites((prev) => {
            if (prev.some((f) => f.id === watch.id)) return prev;
            return [...prev, watch];
        });
    }, []);

    const removeFromFavorites = useCallback((watchId: string) => {
        setFavorites((prev) => prev.filter((f) => f.id !== watchId));
    }, []);

    const isFavorite = useCallback(
        (watchId: string) => {
            return favorites.some((f) => f.id === watchId);
        },
        [favorites]
    );

    const toggleFavorite = useCallback(
        (watch: Watch) => {
            if (isFavorite(watch.id)) {
                removeFromFavorites(watch.id);
            } else {
                addToFavorites(watch);
            }
        },
        [isFavorite, addToFavorites, removeFromFavorites]
    );

    const clearAllFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return {
        favorites,
        isLoaded,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        clearAllFavorites,
        favoritesCount: favorites.length,
    };
}
