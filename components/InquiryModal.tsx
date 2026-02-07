"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, Mail } from "lucide-react";

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
    const [action, setAction] = useState<"whatsapp" | "email">("whatsapp");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = new FormData(e.currentTarget);

        const name = form.get("name") as string;
        const phone = form.get("phone") as string;
        const message = form.get("message") as string;

        const text = `Inquiry from ${name}\nPhone: ${phone}\n\n${message}`;

        try {
            /* ================= WHATSAPP ================= */
            if (action === "whatsapp") {
                window.open(
                    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
                    "_blank"
                );
            }

            /* ================= EMAIL (API → nodemailer) ================= */
            else {
                const res = await fetch("/api/inquiry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, phone, message })
                });

                if (!res.ok) throw new Error("Email failed");
            }

            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to send inquiry");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-[#0a0a0a] w-full max-w-md rounded-sm border border-white/10 relative shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative top line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                        <button
                            onClick={onClose}
                            type="button"
                            className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors duration-300 p-1"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        <div className="p-8 pt-10">
                            <h2 className="font-serif text-xl uppercase tracking-[0.25em] text-center mb-2">
                                Inquiry
                            </h2>

                            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] text-center mb-8">
                                Begin Your Commission
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                                {/* Name */}
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 ml-1">
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-300"
                                    />
                                </div>

                                {/* Phone (numbers only) */}
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 ml-1">
                                        Phone
                                    </label>
                                    <input
                                        name="phone"
                                        placeholder="Phone Number"
                                        required
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={12}
                                        onInput={(e) =>
                                            (e.currentTarget.value =
                                                e.currentTarget.value.replace(/\D/g, ""))
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Tell us about your vision..."
                                        rows={4}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors duration-300 resize-none"
                                    />
                                </div>

                                {/* Action Tabs */}
                                <div className="flex gap-1 p-1 bg-white/5 rounded-none border border-white/10 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setAction("whatsapp")}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                                            action === "whatsapp"
                                                ? "bg-white/10 text-white"
                                                : "text-white/40 hover:text-white/70"
                                        }`}
                                    >
                                        <MessageCircle size={14} />
                                        WhatsApp
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setAction("email")}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                                            action === "email"
                                                ? "bg-white/10 text-white"
                                                : "text-white/40 hover:text-white/70"
                                        }`}
                                    >
                                        <Mail size={14} />
                                        Email
                                    </button>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black py-4 mt-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Sending...</span>
                                    ) : (
                                        <>
                                            Send Inquiry
                                            <Send size={14} strokeWidth={2} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Decorative bottom */}
                        <div className="h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
