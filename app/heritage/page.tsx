"use client";

import { motion } from "framer-motion";

export default function HeritagePage() {
  const milestones = [
    { year: "1895", title: "The Beginning", desc: "Founded in Geneva by master watchmaker Jean Wistoan." },
    { year: "1923", title: "First Chronograph", desc: "Introduction of the revolutionary Caliber 100." },
    { year: "1956", title: "Royal Collection", desc: "Launch of the iconic Royal Oak series." },
    { year: "2024", title: "Future Forward", desc: "Continuing the legacy of excellence." },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">Since 1895</p>
          <h1 className="font-serif text-5xl md:text-6xl tracking-wide mb-6">Our Heritage</h1>
        </motion.div>

        <div className="space-y-24">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1">
                <span className="font-serif text-6xl md:text-8xl text-white/10">{milestone.year}</span>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="font-serif text-2xl tracking-wide">{milestone.title}</h3>
                <p className="text-white/50 leading-relaxed">{milestone.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
