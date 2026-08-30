"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import { motion } from "framer-motion";
import {
  Mountain,
  Heart,
  Target,
  Eye,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Wrench,
  MapPin,
  Star,
  ThumbsUp,
  Headphones,
  Compass,
} from "lucide-react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  TEAM DATA                                                         */
/* ------------------------------------------------------------------ */

const TEAM = [
  {
    name: "Hamza Khan",
    role: "Founder & Lead Guide",
    bio: "Professional motorcycle adventurer with 12+ years of mountain riding experience. Has completed 300+ Babusar Pass crossings.",
    emoji: "🏍️",
  },
  {
    name: "Ahmed Raza",
    role: "Head Mechanic",
    bio: "Certified Honda & Yamaha technician. Ensures every bike is pre-inspected and trail-ready before each rental.",
    emoji: "🔧",
  },
  {
    name: "Ali Hassan",
    role: "Tour Operations Manager",
    bio: "Expert in northern Pakistan routes. Designs custom itineraries for individuals and touring groups of all sizes.",
    emoji: "🗺️",
  },
  {
    name: "Usman Tariq",
    role: "Customer Experience Lead",
    bio: "Dedicated to making your booking seamless. Available 7 days a week on WhatsApp for instant support.",
    emoji: "📞",
  },
  {
    name: "Bilal Shah",
    role: "Safety & Rescue Officer",
    bio: "Former rescue services professional. Handles emergency protocols, roadside assistance, and safety training.",
    emoji: "🛡️",
  },
  {
    name: "Kashif Mehmood",
    role: "Fleet Manager",
    bio: "Manages our fleet of 40+ motorcycles. Coordinates logistics for multi-bike group tours and seasonal maintenance.",
    emoji: "🏁",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "Every rider receives a safety briefing, certified helmet, and 24/7 roadside assistance on every trip.",
  },
  {
    icon: Wrench,
    title: "Mechanically Perfect",
    desc: "All bikes undergo 15-point inspection before every rental. We never compromise on vehicle condition.",
  },
  {
    icon: ThumbsUp,
    title: "Local Expertise",
    desc: "Our guides are born and raised in Kaghan Valley — nobody knows these mountain roads better.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "WhatsApp, phone, or radio — we're always reachable, even on remote trails above 4,000m.",
  },
  {
    icon: Award,
    title: "Value for Money",
    desc: "Transparent pricing with no hidden charges. Fuel, gear, and insurance included in tour packages.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    desc: "We don't just rent bikes — we share our love for riding through Pakistan's most magnificent landscapes.",
  },
];

const STATS = [
  { number: "5,000+", label: "Happy Riders" },
  { number: "40+", label: "Fleet Size" },
  { number: "300+", label: "Tours Completed" },
  { number: "8+", label: "Years Experience" },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/about_team.png"
              alt="Naran Bikers Hub team"
              fill
              className="object-cover object-center opacity-25 dark:opacity-15"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-light-bg/80 via-light-bg/60 to-light-bg dark:from-dark-bg/80 dark:via-dark-bg/60 dark:to-dark-bg" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-black uppercase tracking-[0.25em] text-brand-orange mb-4"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-gradient-light dark:text-gradient mb-6"
            >
              About Naran Bikers Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg max-w-2xl mx-auto text-slate-600 dark:text-neutral-400 leading-relaxed"
            >
              Born from a passion for mountain riding — we&apos;re dedicated to giving every
              traveler the safest, most unforgettable motorcycle adventure in northern Pakistan.
            </motion.p>
          </div>
        </section>

        {/* ── Stats Bar ────────────────────────────────────── */}
        <section className="py-8 border-y border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-brand-orange">{stat.number}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Company Story ────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
                  How It Started
                </span>
                <h2 className="text-3xl md:text-4xl font-black font-serif text-gradient-light dark:text-gradient">
                  From a Single Bike to Pakistan&apos;s Premier Touring Hub
                </h2>
                <div className="space-y-4 text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  <p>
                    It all began in 2017, when our founder Hamza Khan — a lifelong motorcycle enthusiast — noticed
                    that tourists visiting the breathtaking Kaghan Valley had no reliable way to rent quality motorcycles.
                    Most were stuck in cramped vans or overpriced jeeps, unable to explore the valley&apos;s hidden gems at their own pace.
                  </p>
                  <p>
                    With just three Honda CG 125s and a small workshop on Main Bypass Road in Naran, Hamza started
                    offering affordable daily motorcycle rentals. Word spread fast. Riders from Islamabad, Lahore,
                    and Karachi began seeking out the service, drawn by the promise of freedom, adventure, and unmatched
                    mountain scenery.
                  </p>
                  <p>
                    Today, Naran Bikers Hub operates a fleet of 40+ motorcycles — from budget-friendly Honda 70s to
                    heavy-duty Royal Enfield Himalayans — and offers guided tours to Babusar Top, Hunza Valley,
                    Skardu, and Fairy Meadows. We&apos;ve served over 5,000 riders and counting.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/about_team.png"
                  alt="Naran Bikers Hub team and fleet"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-panel-dark p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-wider mb-1">
                      <MapPin className="w-4 h-4" /> Based in Naran
                    </div>
                    <div className="text-sm text-white font-semibold">
                      Main Bypass Road, near Jamil Hotel, Kaghan Valley, KP
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ─────────────────────────────── */}
        <section className="py-16 md:py-20 bg-white/50 dark:bg-white/[0.02] border-y border-slate-200/50 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-dark-card"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  To make Pakistan&apos;s northern landscapes accessible to every adventure enthusiast by providing
                  safe, reliable, and affordable motorcycle rental and touring services. We believe that the
                  freedom of two wheels is the best way to experience the raw beauty of Kaghan Valley,
                  Gilgit-Baltistan, and beyond.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-dark-card"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  To become Pakistan&apos;s most trusted motorcycle touring platform — connecting riders with the
                  world&apos;s most spectacular mountain routes, fostering responsible tourism, and building a community
                  of adventurers who explore northern Pakistan with confidence and joy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-gradient-light dark:text-gradient mt-3">
                What Sets Us Apart
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-dark-card hover:border-brand-orange/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <value.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Professional Team ─────────────────────────────── */}
        <section className="py-16 md:py-20 bg-white/50 dark:bg-white/[0.02] border-y border-slate-200/50 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange">The Crew</span>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-gradient-light dark:text-gradient mt-3">
                Meet Our Team
              </h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 mt-3 max-w-lg mx-auto">
                Every member of our team is a passionate rider and certified professional dedicated to your safety and adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-dark-card text-center hover:border-brand-orange/20 transition-all duration-300"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand-orange/20 to-red-600/10 border-2 border-brand-orange/30 flex items-center justify-center text-3xl mb-4">
                    {member.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mt-1 mb-3">{member.role}</div>
                  <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black font-serif text-gradient-light dark:text-gradient mb-4">
              Ready to Ride With Us?
            </h2>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mb-6 max-w-lg mx-auto">
              Join thousands of riders who trust Naran Bikers Hub for their mountain adventures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/bikes"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-widest glow-orange transition-all cursor-pointer"
              >
                Browse Our Fleet
              </a>
              <a
                href="/tours"
                className="px-8 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 text-xs font-black uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
              >
                View Tour Packages
              </a>
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
