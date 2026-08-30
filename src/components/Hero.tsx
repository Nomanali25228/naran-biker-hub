"use client";

import { useBooking } from "@/context/BookingContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Bike, ChevronRight, CheckCircle2, Shield, Compass } from "lucide-react";

export default function Hero() {
  const { openBooking } = useBooking();
  const [quickBike, setQuickBike] = useState("Yamaha YBR 125G");

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    openBooking(quickBike);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-16 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero_background.png')` }}
      />
      <div className="absolute inset-0 bg-black/65 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 overlay-gradient z-20 pointer-events-none" />

      {/* Outer container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Column 1: Branding and Headings */}
          <div className="lg:col-span-7 space-y-5 text-white text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase tracking-widest"
            >
              <Compass className="w-4 h-4 indicator-dot" />
              <span>Extreme Tour Guides &amp; Bike Rentals</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.1] text-white"
            >
              Best Bike Rental <br />
              Service in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">
                Naran, Pakistan
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-neutral-300 max-w-xl font-medium leading-relaxed"
            >
              Explore Babusar Top, Kaghan Valley, Hunza, and Skardu on premium,
              well-maintained mountain motorcycles. Rugged bikes. Experienced road
              advisors. Unmatched support.
            </motion.p>

            {/* Core Propositions List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2"
            >
              {[
                "100% Inspected Adventure Fleet",
                "Free Helmet & Safety Gear",
                "Backup Bike in Case of Breakdown",
                "Tailored Guided Group Tours Available",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-sm font-semibold text-white">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Main Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap gap-4"
            >
              <button
                onClick={() => openBooking("")}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-orange cursor-pointer text-white"
              >
                Book Now
              </button>
              <a
                href="#bikes"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-wider text-sm cursor-pointer flex items-center gap-2 text-white"
              >
                View Bikes
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Column 2: Quick Booking Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 w-full"
          >
            <div className="w-full rounded-2xl glass-panel-dark p-5 sm:p-6 border border-white/10 shadow-2xl relative">
              <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-brand-orange to-red-600 rounded-md text-[10px] uppercase font-black tracking-widest text-white animate-pulse">
                Live Availability
              </div>
              <h3 className="text-xl font-bold font-serif text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-orange" /> Quick Reservation
              </h3>
              <p className="text-xs text-neutral-400 mb-5">
                Select motorcycle model and secure your booking.
              </p>

              <form onSubmit={handleQuickEstimate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Select Motorcycle Class
                  </label>
                  <div className="relative">
                    <Bike className="absolute left-3 top-3 w-4 h-4 text-brand-orange" />
                    <select
                      value={quickBike}
                      onChange={(e) => setQuickBike(e.target.value)}
                      className="w-full bg-neutral-900/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-brand-orange focus:outline-none cursor-pointer"
                    >
                      <option className="bg-neutral-900 text-white" value="Yamaha YBR 125G">Yamaha YBR 125G</option>
                      <option className="bg-neutral-900 text-white" value="Suzuki GS 150">Suzuki GS 150</option>
                      <option className="bg-neutral-900 text-white" value="Honda CB 150F">Honda CB 150F</option>
                      <option className="bg-neutral-900 text-white" value="Suzuki GR 150">Suzuki GR 150</option>
                      <option className="bg-neutral-900 text-white" value="Royal Enfield Himalayan (411cc)">Royal Enfield Himalayan</option>
                      <option className="bg-neutral-900 text-white" value="Kawasaki KLR 650">Kawasaki KLR 650</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 glow-orange flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book a Ride</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-neutral-400">
                    💡 *No deposit needed* to lock your reservation slot on WhatsApp.
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
