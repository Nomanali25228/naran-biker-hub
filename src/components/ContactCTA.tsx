"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General Rental Inquiry");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, topic, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send inquiry.");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error("CTA Contact error:", err);
      setErrorMessage(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 text-white relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Column 1: Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
                Start Adventure
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-neutral-100">
                Let&apos;s Gear Up and Hit the Mountains
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Whether you need a daily rental for Lake Saif-ul-Muluk or are preparing a 10-day expedition to Khunjerab Pass, we have the machinery and route advice ready.
              </p>
            </div>

            {/* Address Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <MapPin className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Adventure Hub Address</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Main Bypass Road, near Jamil Hotel, Naran, Kaghan Valley, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <Mail className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Email Address</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Email:{" "}
                    <a href="mailto:info.naranbikershub@gmail.com" className="text-brand-orange hover:underline font-semibold">
                      info.naranbikershub@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info.naranbikershub@gmail.com"
                className="flex-1 py-4 bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white rounded-xl text-center text-xs font-black uppercase tracking-wider shadow-md transition-colors cursor-pointer"
              >
                Send Email Message
              </a>
              <a
                href="tel:+923009484055"
                className="flex-1 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-center text-xs font-black uppercase tracking-wider border border-white/10 shadow-md transition-colors cursor-pointer"
              >
                Call Phone Hotline
              </a>
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glass-panel-dark border border-white/10 p-6 sm:p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold font-serif text-white mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-orange" /> Route Inquiry Desk
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill in details below to transmit an email inquiry directly to our customer team.
              </p>

              {errorMessage && (
                <div className="mb-4 flex items-center gap-2 p-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <CheckCircle className="w-14 h-14 text-green-500 mb-3" />
                  <h4 className="text-lg font-bold text-white mb-1">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-neutral-300 max-w-sm">
                    Aapka message email par receive ho chuka hai. Humari team <strong>24 ghante ke andar</strong> aapko email/phone par respond karegi.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-brand-orange font-bold underline cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Hammad Khan"
                        className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. hammad@domain.com"
                        className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +92 300 1234567"
                        className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Select Subject
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white cursor-pointer"
                      >
                        <option className="bg-neutral-900 text-white" value="General Rental Inquiry">General Rental Inquiry</option>
                        <option className="bg-neutral-900 text-white" value="Guided Motorcycle Tour Packages">Guided Tour Packages</option>
                        <option className="bg-neutral-900 text-white" value="Special Heavy Bike Renting">Special Heavy Bike Renting</option>
                        <option className="bg-neutral-900 text-white" value="Mechanic / Rescue Partnership">Rescue Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Message / Custom Route Needs *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter details about your touring group, preferred bikes, date details..."
                      className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white h-24 resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md glow-orange flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Email...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry via Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
