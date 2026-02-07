"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { WatchCard } from "@/components/WatchCard";
import { WATCHES } from "@/lib/data";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

type FilterCategory = "all" | "gold" | "titanium" | "steel" | "platinum" | "chronograph" | "diver" | "dress" | "tourbillon";

interface FilterOption {
    id: FilterCategory;
    label: string;
    count: number;
}

export default function CollectionPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<"all" | "under10k" | "10k-20k" | "20k-50k" | "over50k">("all");

    // Extract unique materials and types from specs
    const filterOptions: FilterOption[] = useMemo(() => [
        { id: "all", label: "All Models", count: WATCHES.length },
        { id: "gold", label: "Gold Cases", count: WATCHES.filter(w => w.specs.case.toLowerCase().includes("gold")).length },
        { id: "titanium", label: "Titanium", count: WATCHES.filter(w => w.specs.case.toLowerCase().includes("titanium")).length },
        { id: "steel", label: "Stainless Steel", count: WATCHES.filter(w => w.specs.case.toLowerCase().includes("steel") && !w.specs.case.toLowerCase().includes("gold")).length },
        { id: "platinum", label: "Platinum", count: WATCHES.filter(w => w.specs.case.toLowerCase().includes("platinum")).length },
        { id: "chronograph", label: "Chronographs", count: WATCHES.filter(w => w.specs.movement.toLowerCase().includes("chronograph")).length },
        { id: "diver", label: "Professional Divers", count: WATCHES.filter(w => parseInt(w.specs.resistance) >= 200).length },
        { id: "dress", label: "Dress Watches", count: WATCHES.filter(w => parseInt(w.specs.resistance) <= 50 && !w.specs.movement.toLowerCase().includes("chronograph")).length },
        { id: "tourbillon", label: "Tourbillons", count: WATCHES.filter(w => w.specs.movement.toLowerCase().includes("tourbillon")).length },
    ], []);

    // Parse price string to number for comparison
    const parsePrice = (price: string): number => {
        return parseInt(price.replace(/[^0-9]/g, ""));
    };

    // Filter watches based on active filters
    const filteredWatches = useMemo(() => {
        return WATCHES.filter((watch) => {
            // Material/Type filter
            let matchesCategory = true;
            if (activeFilter !== "all") {
                const caseLower = watch.specs.case.toLowerCase();
                const movementLower = watch.specs.movement.toLowerCase();
                const resistance = parseInt(watch.specs.resistance);

                switch (activeFilter) {
                    case "gold":
                        matchesCategory = caseLower.includes("gold");
                        break;
                    case "titanium":
                        matchesCategory = caseLower.includes("titanium");
                        break;
                    case "steel":
                        matchesCategory = caseLower.includes("steel") && !caseLower.includes("gold");
                        break;
                    case "platinum":
                        matchesCategory = caseLower.includes("platinum");
                        break;
                    case "chronograph":
                        matchesCategory = movementLower.includes("chronograph");
                        break;
                    case "diver":
                        matchesCategory = resistance >= 200;
                        break;
                    case "dress":
                        matchesCategory = resistance <= 50 && !movementLower.includes("chronograph");
                        break;
                    case "tourbillon":
                        matchesCategory = movementLower.includes("tourbillon");
                        break;
                }
            }

            // Price filter
            let matchesPrice = true;
            const priceNum = parsePrice(watch.price);
            switch (priceRange) {
                case "under10k":
                    matchesPrice = priceNum < 10000;
                    break;
                case "10k-20k":
                    matchesPrice = priceNum >= 10000 && priceNum < 20000;
                    break;
                case "20k-50k":
                    matchesPrice = priceNum >= 20000 && priceNum < 50000;
                    break;
                case "over50k":
                    matchesPrice = priceNum >= 50000;
                    break;
            }

            return matchesCategory && matchesPrice;
        });
    }, [activeFilter, priceRange]);

    const hasActiveFilters = activeFilter !== "all" || priceRange !== "all";

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-black">
            <div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">
                        The Collection
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl tracking-wide mb-6">
                        All Models
                    </h1>
                    <p className="text-white/50 max-w-md mx-auto">
                        Discover our complete range of timepieces, each crafted with meticulous attention to detail.
                    </p>
                </motion.div>

                {/* Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
                        {/* Category Pills - Desktop */}
                        <div className="hidden md:flex flex-wrap gap-3">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setActiveFilter(option.id)}
                                    className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] border transition-all duration-300 ${activeFilter === option.id
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                                        }`}
                                >
                                    {option.label}
                                    <span className="ml-2 opacity-50">({option.count})</span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="md:hidden flex items-center justify-between w-full px-5 py-3 border border-white/20 text-[11px] uppercase tracking-[0.15em]"
                        >
                            <span className="flex items-center gap-2">
                                <SlidersHorizontal size={14} />
                                Filter Collection
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Price Range Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 hidden md:block">
                                Price
                            </span>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value as typeof priceRange)}
                                className="bg-transparent border border-white/20 text-white text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 focus:outline-none focus:border-white/40 cursor-pointer"
                            >
                                <option value="all" className="bg-black">All Prices</option>
                                <option value="under10k" className="bg-black">Under $10,000</option>
                                <option value="10k-20k" className="bg-black">$10,000 - $20,000</option>
                                <option value="20k-50k" className="bg-black">$20,000 - $50,000</option>
                                <option value="over50k" className="bg-black">Over $50,000</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden overflow-hidden border-b border-white/10"
                            >
                                <div className="py-4 flex flex-col gap-2">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setActiveFilter(option.id);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`px-5 py-3 text-left text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${activeFilter === option.id
                                                    ? "bg-white/10 text-white"
                                                    : "text-white/60 hover:text-white"
                                                }`}
                                        >
                                            {option.label}
                                            <span className="ml-2 opacity-50">({option.count})</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 mt-6 flex-wrap"
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                                Active:
                            </span>
                            {activeFilter !== "all" && (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-[10px] uppercase tracking-[0.1em]">
                                    {filterOptions.find(f => f.id === activeFilter)?.label}
                                    <button
                                        onClick={() => setActiveFilter("all")}
                                        className="hover:text-white/70"
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            )}
                            {priceRange !== "all" && (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-[10px] uppercase tracking-[0.1em]">
                                    {priceRange === "under10k" && "Under $10k"}
                                    {priceRange === "10k-20k" && "$10k - $20k"}
                                    {priceRange === "20k-50k" && "$20k - $50k"}
                                    {priceRange === "over50k" && "Over $50k"}
                                    <button
                                        onClick={() => setPriceRange("all")}
                                        className="hover:text-white/70"
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setActiveFilter("all");
                                    setPriceRange("all");
                                }}
                                className="text-[10px] uppercase tracking-[0.2em] text-amber-500 hover:text-amber-400 ml-auto"
                            >
                                Clear All
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Results Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={filteredWatches.length}
                    className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8"
                >
                    Showing {filteredWatches.length} {filteredWatches.length === 1 ? "timepiece" : "timepieces"}
                </motion.p>

                {/* Watch Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredWatches.map((watch, index) => (
                            <motion.div
                                key={watch.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <WatchCard watch={watch} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredWatches.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24"
                    >
                        <p className="font-serif text-2xl mb-4">No timepieces found</p>
                        <p className="text-white/50 text-sm mb-8">
                            Try adjusting your filters to see more results.
                        </p>
                        <button
                            onClick={() => {
                                setActiveFilter("all");
                                setPriceRange("all");
                            }}
                            className="px-8 py-3 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
