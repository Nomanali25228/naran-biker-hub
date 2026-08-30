"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Wrench, Heart, Compass, Check } from "lucide-react";

export default function Features() {
  const cards = [
    {
      title: "Pristine Fleet Condition",
      desc: "Our mechanics perform a strict 20-point diagnostic inspection (engine tune-up, brakes, suspension, tire pressure) after every rental cycle.",
      icon: Wrench,
    },
    {
      title: "All-Inclusive Safety Equipment",
      desc: "Every rental comes with a quality helmet, knee and elbow guard pads, bungee ropes, and a basic tool kit at zero additional charge.",
      icon: ShieldAlert,
    },
    {
      title: "24/7 Adventure Assistance",
      desc: "Stuck at Babusar Top or Lulusar Lake? We provide instant guide consultations, towing networks, and emergency replacement bikes.",
      icon: Heart,
    },
    {
      title: "Local Guideline Maps",
      desc: "Get real-time updates on Babusar pass closure, Kaghan road blockades, landslide hotspots, and recommended hotels from local riders.",
      icon: Compass,
    },
  ];

  const highlights = [
    "No hidden security withholding charges",
    "Flexible tour extensions directly via WhatsApp",
    "Special discount rates for 5+ days rentals",
    "Clean Pakistan dual-license authorization assistance",
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-neutral-950/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              Rider Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-neutral-100">
              Why Conquer Naran Trails With Us?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Adventure riding in Northern Pakistan is thrilling but demands exceptionally reliable machinery. We build safety, credibility, and support into every single motorcycle rental.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
                <div className="p-1 rounded-full bg-brand-orange/20 text-brand-orange shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl glass-panel-dark p-6 border border-white/5 hover:border-brand-orange/30 transition-all duration-300 hover:scale-[1.02] shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-neutral-900 group-hover:bg-brand-orange text-brand-orange group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-serif group-hover:text-brand-orange transition-colors text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-brand-orange transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
