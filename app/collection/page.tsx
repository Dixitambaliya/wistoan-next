"use client";

import { motion } from "framer-motion";
import { WatchCard } from "@/components/WatchCard";
import { WATCHES } from "@/lib/data";

export default function CollectionPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">The Collection</p>
          <h1 className="font-serif text-5xl md:text-6xl tracking-wide mb-6">All Models</h1>
          <p className="text-white/50 max-w-md mx-auto">
            Discover our complete range of timepieces, each crafted with meticulous attention to detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WATCHES.map((watch, index) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <WatchCard watch={watch} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
