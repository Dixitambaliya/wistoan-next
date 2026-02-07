// contexts/FavoritesContext.tsx
"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { Watch } from "@/types";

interface FavoritesContextType {
    favorites: Watch[];
    isLoaded: boolean;
    addToFavorites: (watch: Watch) => void;
    removeFromFavorites: (watchId: string) => void;
    isFavorite: (watchId: string) => boolean;
    toggleFavorite: (watch: Watch) => void;
    clearAllFavorites: () => void;
    favoritesCount: number;
    lastAction: { type: "added" | "removed"; watchName: string } | null;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "wistoan_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Watch[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lastAction, setLastAction] = useState<{ type: "added" | "removed"; watchName: string } | null>(null);

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
        setLastAction({ type: "added", watchName: watch.name });
        // Clear action after 3 seconds
        setTimeout(() => setLastAction(null), 3000);
    }, []);

    const removeFromFavorites = useCallback((watchId: string) => {
        setFavorites((prev) => {
            const watch = prev.find((f) => f.id === watchId);
            if (watch) {
                setLastAction({ type: "removed", watchName: watch.name });
                setTimeout(() => setLastAction(null), 3000);
            }
            return prev.filter((f) => f.id !== watchId);
        });
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
        setLastAction({ type: "removed", watchName: "All items" });
        setTimeout(() => setLastAction(null), 3000);
    }, []);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isLoaded,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                toggleFavorite,
                clearAllFavorites,
                favoritesCount: favorites.length,
                lastAction,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
