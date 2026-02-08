"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function UniversalLoader({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                >
                    {/* ✅ TOP PROGRESS BAR */}
                    <motion.div
                        className="absolute top-0 left-0 h-[3px] bg-amber-500"
                        initial={{ width: "0%" }}
                        animate={{ width: ["0%", "70%", "100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                    />

                    {/* ✅ CENTER LOGO */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 1.6 }}
                            className="mb-4"
                        >
                            <Image
                                src="/logo.png"
                                alt="Wistoan Logo"
                                width={100}
                                height={100}
                                priority
                            />
                        </motion.div>

                        <p className="text-xs tracking-[0.4em] text-white/60 uppercase">
                            Wistoan
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
