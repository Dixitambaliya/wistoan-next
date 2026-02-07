"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HERITAGE } from "@/lib/heritageData";

export default function HeritagePage() {
    return (
        <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">
                        Since 2001
                    </p>

                    <h1 className="font-serif text-5xl md:text-6xl tracking-wide mb-6">
                        Our Journey
                    </h1>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-28">
                    {HERITAGE.map((milestone, index) => (
                        <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } gap-12 items-center`}
                        >
                            {/* Image */}
                            <div
                                className="
                                w-full
                                md:flex-1
                                relative
                                aspect-[4/3]
                                md:h-[320px]
                                rounded-2xl
                                overflow-hidden
                            "
                            >
                                <Image
                                    src={milestone.image}
                                    alt={milestone.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>


                            {/* Text */}
                            <div className="flex-1 space-y-4">
                                <span className="font-serif text-7xl text-white/10">
                                    {milestone.year}
                                </span>

                                <h3 className="font-serif text-2xl tracking-wide">
                                    {milestone.title}
                                </h3>

                                <p className="text-white/50 leading-relaxed">
                                    {milestone.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
