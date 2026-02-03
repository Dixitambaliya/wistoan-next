"use client";

import Link from "next/link";
import { Watch } from "@/types";
import { motion } from "framer-motion";

interface WatchCardProps {
  watch: Watch;
}

export function WatchCard({ watch }: WatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/watch/${watch.id}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
          <img
            src={watch.mainImage}
            alt={watch.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>

          <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] bg-gradient-to-t from-black via-black/80 to-transparent">
             <p className="text-amber-500 text-[9px] uppercase tracking-[0.4em] font-bold mb-2">View Model Details</p>
             <div className="w-8 h-[1px] bg-amber-500"></div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-2">
          <h3 className="font-serif text-2xl text-white tracking-wide group-hover:text-amber-500 transition-colors duration-500">
            {watch.name}
          </h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold italic">
            {watch.price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
