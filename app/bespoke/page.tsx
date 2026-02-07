"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

export default function BespokePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-black">
            <div className="max-w-[1000px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">Bespoke Services</p>
                    <h1 className="font-serif text-5xl md:text-6xl tracking-wide mb-6 text-white">Your Vision,<br />Our Craft</h1>
                    <p className="text-white/50 max-w-lg mx-auto">
                        Commission a unique timepiece tailored to your exact specifications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { title: "Custom Engraving", desc: "Personalize your caseback with initials, crests, or meaningful dates." },
                        { title: "Bespoke Dials", desc: "Choose from rare materials including meteorite, mother-of-pearl, or custom colors." },
                        { title: "Strap Atelier", desc: "Handcrafted straps in exotic leathers, rare fabrics, or precious metals." },
                        { title: "Complications", desc: "Add specialized functions from moon phases to perpetual calendars." },
                    ].map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="p-8 border border-white/10 rounded-2xl hover:border-amber-500/50 transition-colors group cursor-pointer"
                        >
                            <h3 className="font-serif text-xl mb-4 text-white group-hover:text-amber-500 transition-colors">{service.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white cursor-pointer text-black px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300"
                    >
                        Request Consultation
                    </button>
                </motion.div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <ConsultationModal onClose={() => setIsModalOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
