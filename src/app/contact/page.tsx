"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  User,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CONTACT DATA                                                      */
/* ------------------------------------------------------------------ */

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call / Phone",
    main: "+92 (300) 948-4055",
    sub: "Available 8AM – 10PM daily",
    href: "tel:+923009484055",
    bgClass: "from-green-500/10 to-emerald-500/5",
    borderClass: "border-green-500/20",
    iconClass: "text-green-400",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Chat",
    main: "Chat Instantly",
    sub: "We reply within minutes",
    href: "https://wa.me/923009484055?text=Hi! I have a question about bike rentals.",
    bgClass: "from-[#25D366]/10 to-[#128C7E]/5",
    borderClass: "border-[#25D366]/20",
    iconClass: "text-[#25D366]",
  },
  {
    icon: Mail,
    title: "Email Us",
    main: "info.naranbikershub@gmail.com",
    sub: "Response within 24 hours",
    href: "mailto:info.naranbikershub@gmail.com",
    bgClass: "from-brand-orange/10 to-red-500/5",
    borderClass: "border-brand-orange/20",
    iconClass: "text-brand-orange",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    main: "Main Bypass Road, Naran",
    sub: "Near Jamil Hotel, Kaghan Valley, KP",
    href: "https://maps.google.com/?q=Naran,+Kaghan+Valley,+Pakistan",
    bgClass: "from-blue-500/10 to-indigo-500/5",
    borderClass: "border-blue-500/20",
    iconClass: "text-blue-400",
  },
];

const HOURS = [
  { day: "Monday – Friday", time: "08:00 AM – 10:00 PM" },
  { day: "Saturday", time: "07:00 AM – 11:00 PM" },
  { day: "Sunday", time: "07:00 AM – 11:00 PM" },
  { day: "Peak Season (Jun–Sep)", time: "06:00 AM – 12:00 AM" },
  { day: "Off-Season (Oct–May)", time: "By appointment only" },
];

const TOPICS = [
  "General Inquiry",
  "Bike Rental Booking",
  "Tour Package",
  "Group Booking (5+ riders)",
  "Custom Tour Planning",
  "Corporate / Travel Agency",
  "Emergency / Roadside Help",
  "Feedback / Complaint",
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
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
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTopic(TOPICS[0]);
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setErrorMessage(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-900/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-600 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange transition-colors";

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden text-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-black uppercase tracking-[0.25em] text-brand-orange mb-4"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-gradient-light dark:text-gradient mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto"
            >
              Planning a ride? Have questions about our fleet or tour packages?
              Send us an email inquiry and our team will get back to you within 24 hours.
            </motion.p>
          </div>
        </section>

        {/* ── Contact Cards ─────────────────────────────────── */}
        <section className="pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTACT_CARDS.map((card, i) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`group p-6 rounded-2xl border bg-gradient-to-br ${card.bgClass} ${card.borderClass}
                    hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer block`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/10 dark:bg-white/5 flex items-center justify-center mb-4 ${card.iconClass}`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-1">
                    {card.title}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">
                    {card.main}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-neutral-500 mt-1">{card.sub}</div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Content: Form + Hours + Map ──────────────── */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* ── Contact Form ───────────────────────────── */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-6 md:p-8 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 shadow-xl shadow-slate-200/50 dark:shadow-none"
                >
                  <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    <Mail className="w-6 h-6 text-brand-orange" />
                    Send Us an Email Message
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-neutral-500 mb-6">
                    Fill in your details below. Your message will be sent directly to our team via Email.
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
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent Successfully!</h3>
                      <p className="text-sm text-slate-600 dark:text-neutral-300 max-w-md">
                        Aapka message email par bhej diya gaya hai. Humari team <strong>24 ghante ke andar</strong> aapko response degi.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-xs text-brand-orange font-bold underline cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-1.5 flex items-center gap-1.5">
                            <User className="w-3 h-3 text-brand-orange" /> Full Name *
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className={inputClass}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-brand-orange" /> Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+92 300 0000000"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-brand-orange" /> Email Address (For Response)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>

                      {/* Topic Select */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-1.5">
                          Subject / Topic *
                        </label>
                        <div className="relative">
                          <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className={inputClass + " appearance-none pr-10 cursor-pointer"}
                          >
                            {TOPICS.map((t) => (
                              <option key={t} value={t} className="bg-white dark:bg-neutral-900">
                                {t}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-1.5">
                          Your Message *
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your trip plans, bike preferences, group size, travel dates..."
                          rows={5}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-sm font-black uppercase tracking-widest glow-orange transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending Email...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message via Email
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center text-slate-400 dark:text-neutral-600">
                        Your inquiry will be emailed directly to our team. We guarantee a response within 24 hours.
                      </p>
                    </form>
                  )}
                </motion.div>
              </div>

              {/* ── Sidebar: Hours + Map ────────────────────── */}
              <div className="lg:col-span-5 space-y-6">

                {/* Business Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-6 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8"
                >
                  <h3 className="text-lg font-black font-serif text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-brand-orange" />
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    {HOURS.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm py-2 border-b border-slate-100 dark:border-white/5 last:border-0"
                      >
                        <span className="font-semibold text-slate-700 dark:text-neutral-300">{h.day}</span>
                        <span className="text-brand-orange font-bold text-xs">{h.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-green-500 font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                    We are currently open
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl p-6 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8"
                >
                  <h3 className="text-lg font-black font-serif text-slate-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:info.naranbikershub@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl bg-brand-orange/10 border border-brand-orange/20 hover:bg-brand-orange/20 transition-colors cursor-pointer"
                    >
                      <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Email Us Directly</div>
                        <div className="text-xs text-slate-500 dark:text-neutral-500">info.naranbikershub@gmail.com</div>
                      </div>
                    </a>
                    <a
                      href="tel:+923009484055"
                      className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-pointer"
                    >
                      <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Call Directly</div>
                        <div className="text-xs text-slate-500 dark:text-neutral-500">+92 (300) 948-4055</div>
                      </div>
                    </a>
                  </div>
                </motion.div>

                {/* Google Maps Embed */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/8"
                >
                  <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-dark-card border-b border-slate-100 dark:border-white/5">
                    <MapPin className="w-4 h-4 text-brand-orange" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Find Us on Map</span>
                  </div>
                  <iframe
                    title="Naran Bikers Hub Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.889043209883!2d73.64501114939904!3d34.89934370275268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e7510034d191d1%3A0xaa789ca7c1fb3205!2sNaran%20Bikers%20Hub!5e1!3m2!1sen!2sus!4v1788077106952!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="block"
                  />
                  <div className="px-4 py-3 bg-white dark:bg-dark-card">
                    <p className="text-xs text-slate-500 dark:text-neutral-500">
                      Main Bypass Road, near Jamil Hotel, Naran, Kaghan Valley, KP, Pakistan
                    </p>
                    <a
                      href="https://maps.google.com/?q=Naran,+Kaghan+Valley,+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-orange hover:underline mt-1 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <BookingModal />
    </>
  );
}
