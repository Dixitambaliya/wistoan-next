"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, Loader2, CheckCircle } from "lucide-react";

interface ConsultationModalProps {
    onClose: () => void;
}

export default function ConsultationModal({ onClose }: ConsultationModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        serviceType: "",
        budget: "",
        timeline: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const serviceTypes = [
        "Custom Engraving",
        "Bespoke Dials",
        "Strap Atelier",
        "Complications",
        "Full Bespoke Commission",
        "Other"
    ];

    const budgetRanges = [
        "$5,000 - $10,000",
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "$50,000 - $100,000",
        "$100,000+",
        "Prefer to discuss"
    ];

    const timelines = [
        "3-6 months",
        "6-12 months",
        "12-18 months",
        "Flexible",
        "Urgent (specify in message)"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: `Bespoke Consultation: ${formData.subject || formData.serviceType}`,
                    message: `
Phone: ${formData.phone || "Not provided"}
Service Type: ${formData.serviceType || "Not specified"}
Budget Range: ${formData.budget || "Not specified"}
Preferred Timeline: ${formData.timeline || "Not specified"}

Message:
${formData.message}
          `.trim()
                }),
            });

            if (!response.ok) throw new Error("Failed to send");

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (err) {
            setError("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 rounded-2xl p-8 md:p-12"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <CheckCircle className="w-16 h-16 text-amber-500 mb-6" />
                        <h3 className="font-serif text-2xl text-white mb-4">Request Received</h3>
                        <p className="text-white/60">
                            Our concierge team will contact you within 24 hours to discuss your bespoke timepiece.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <div className="text-center mb-10">
                            <p className="text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-4">
                                Private Consultation
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
                                Begin Your Journey
                            </h2>
                            <p className="text-white/50 text-sm">
                                Tell us about your vision and our master craftsmen will bring it to life.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-white/60 text-xs uppercase tracking-wider">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/60 text-xs uppercase tracking-wider">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-white/60 text-xs uppercase tracking-wider">Phone (10 digits)</label>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value.replace(/\D/g, "").slice(0, 10)
                                            })
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors"
                                        placeholder="Enter 10 digit phone"
                                    />

                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/60 text-xs uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors"
                                        placeholder="Vintage-inspired chronograph"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-white/60 text-xs uppercase tracking-wider">Service Interest</label>
                                    <select
                                        value={formData.serviceType}
                                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-neutral-900">Select a service</option>
                                        {serviceTypes.map((type) => (
                                            <option key={type} value={type} className="bg-neutral-900">{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/60 text-xs uppercase tracking-wider">Budget Range</label>
                                    <select
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-neutral-900">Select budget</option>
                                        {budgetRanges.map((range) => (
                                            <option key={range} value={range} className="bg-neutral-900">{range}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/60 text-xs uppercase tracking-wider">Preferred Timeline</label>
                                <select
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-neutral-900">Select timeline</option>
                                    {timelines.map((time) => (
                                        <option key={time} value={time} className="bg-neutral-900">{time}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/60 text-xs uppercase tracking-wider">Your Vision *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                                    placeholder="Describe your ideal timepiece, materials, complications, or any specific requirements..."
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending Request...
                                    </>
                                ) : (
                                    "Submit Consultation Request"
                                )}
                            </button>

                            <p className="text-white/30 text-xs text-center">
                                Your information is kept strictly confidential.
                            </p>
                        </form>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
