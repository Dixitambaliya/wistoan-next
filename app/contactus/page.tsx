"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import axios from "axios";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE!;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const LOCATION = process.env.NEXT_PUBLIC_LOCATION!;

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post("/api/contact", formData);

            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (err: any) {
            alert(
                err?.response?.data?.error ||
                "Failed to send message. Please try again."
            );
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitted(false), 5000);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const contactInfo = [
        {
            icon: Phone,
            label: "WhatsApp",
            value: CONTACT_PHONE,
            href: `https://wa.me/${WHATSAPP_NUMBER}`,
            description: "Direct inquiry for purchases"
        },
        {
            icon: Mail,
            label: "Email",
            value: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            description: "General inquiries & support"
        },
        {
            icon: MapPin,
            label: "Location",
            value: LOCATION,
            href: "#",
            description: "By appointment only"
        },
        {
            icon: Clock,
            label: "Hours",
            value: "Mon - Sat: 10AM - 7PM",
            href: "#",
            description: "Sunday: Closed"
        }
    ];

    return (
        <div className="pt-24 bg-black min-h-screen">
            <div className="max-w-6xl mx-auto px-6 pb-20">
                {/* Breadcrumb */}
                <nav className="mb-10 flex gap-3 text-[9px] uppercase tracking-[0.3em] text-white/30">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-amber-500">Contact</span>
                </nav>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <span className="text-amber-500 text-[9px] uppercase tracking-[0.35em] font-bold block mb-4">
                        Get in Touch
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl text-white tracking-wide mb-4">
                        Contact Us
                    </h1>
                    <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed italic">
                        Interested in a timepiece? Reach out for personalized consultation
                        and exclusive availability.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* LEFT — Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="grid gap-4">
                            {contactInfo.map((item, idx) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="group flex items-start gap-4 p-6 bg-neutral-900/50 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                                >
                                    <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                                        <item.icon className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-white font-medium mb-1 group-hover:text-amber-500 transition-colors">
                                            {item.value}
                                        </p>
                                        <p className="text-white/30 text-xs">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Quick WhatsApp CTA */}
                        <div className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl border border-white/10">
                            <h3 className="text-white font-serif text-lg mb-2">Prefer WhatsApp?</h3>
                            <p className="text-white/50 text-sm mb-4 leading-relaxed">
                                For immediate response regarding specific timepieces,
                                connect with us directly on WhatsApp.
                            </p>
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                            >
                                <Phone className="w-4 h-4" />
                                Start Chat
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-neutral-900/30 rounded-2xl p-8 border border-white/5">
                            <h2 className="font-serif text-2xl text-white mb-6 tracking-wide">
                                Send Inquiry
                            </h2>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-white font-serif text-xl mb-2">Message Sent</h3>
                                    <p className="text-white/60 text-sm">
                                        We will get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase tracking-widest text-white/40 block">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase tracking-widest text-white/40 block">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-white/40 block">
                                            Subject
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled className="bg-neutral-800">Select inquiry type</option>
                                            <option value="purchase" className="bg-neutral-800">Purchase Inquiry</option>
                                            <option value="availability" className="bg-neutral-800">Check Availability</option>
                                            <option value="service" className="bg-neutral-800">After-Sales Service</option>
                                            <option value="general" className="bg-neutral-800">General Question</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-white/40 block">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                                            placeholder="Tell us about the timepiece you're interested in..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-white text-black py-4 rounded-full text-xs font-bold uppercase tracking-[0.35em] hover:bg-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>

                                    <p className="text-[9px] text-white/30 text-center uppercase tracking-wider">
                                        Or email us directly at{" "}
                                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-500 hover:underline">
                                            info@wistoan.com
                                        </a>
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
