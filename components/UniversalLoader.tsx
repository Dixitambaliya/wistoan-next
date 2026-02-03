"use client";

import { motion } from "framer-motion";

export function UniversalLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4">
          <svg viewBox="0 0 500 500" className="w-full h-full fill-white animate-pulse">
            <path d="M50 150 L150 400 L250 150 L350 400 L450 150 L400 150 L350 300 L300 150 L250 250 L200 150 L150 300 L100 150 Z" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Wistoan</p>
      </motion.div>
    </motion.div>
  );
}
