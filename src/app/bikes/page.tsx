"use client";

import { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import { motion } from "framer-motion";
import {
  Fuel,
  Gauge,
  Cog,
  Shield,
  Star,
  SlidersHorizontal,
  ChevronDown,
  Zap,
  Check,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  BIKE DATA                                                         */
/* ------------------------------------------------------------------ */

interface BikeSpec {
  id: string;
  name: string;
  tagline: string;
  image: string;
  engine: string;
  cc: number;
  fuelSystem: string;
  transmission: string;
  mileage: string;
  weight: string;
  seatHeight: string;
  topSpeed: string;
  dailyPrice: number;
  weeklyPrice: number;
  category: "economy" | "standard" | "sport" | "adventure";
  popular?: boolean;
  features: string[];
  bestFor: string;
}

const BIKES: BikeSpec[] = [
  {
    id: "honda-cd-70",
    name: "Honda CD 70",
    tagline: "The Legendary Economy Commuter",
    image: "/bikes_hero.png",
    engine: "4-Stroke, OHC, Single Cylinder",
    cc: 70,
    fuelSystem: "Carburetor",
    transmission: "4-Speed",
    mileage: "70–80 km/l",
    weight: "82 kg",
    seatHeight: "770 mm",
    topSpeed: "90 km/h",
    dailyPrice: 1500,
    weeklyPrice: 8500,
    category: "economy",
    features: [
      "Ultra fuel efficient",
      "Lightweight & nimble",
      "Easy to handle for beginners",
      "Low maintenance cost",
    ],
    bestFor: "City commuting & short valley rides",
  },
  {
    id: "honda-cg-125",
    name: "Honda CG 125",
    tagline: "Pakistan's All-Terrain Warrior",
    image: "/bikes_hero.png",
    engine: "4-Stroke, OHC, Single Cylinder",
    cc: 125,
    fuelSystem: "Carburetor",
    transmission: "5-Speed",
    mileage: "45–55 km/l",
    weight: "106 kg",
    seatHeight: "795 mm",
    topSpeed: "110 km/h",
    dailyPrice: 2000,
    weeklyPrice: 12000,
    category: "standard",
    popular: true,
    features: [
      "Proven mountain reliability",
      "Comfortable pillion seat",
      "Spare parts available everywhere",
      "Excellent torque on steep inclines",
    ],
    bestFor: "Valley exploration & Babusar Pass",
  },
  {
    id: "yamaha-ybr-125",
    name: "Yamaha YBR 125",
    tagline: "Smooth Power for Long Rides",
    image: "/bikes_hero.png",
    engine: "4-Stroke, SOHC, Air Cooled",
    cc: 125,
    fuelSystem: "Carburetor",
    transmission: "5-Speed",
    mileage: "40–50 km/l",
    weight: "114 kg",
    seatHeight: "800 mm",
    topSpeed: "115 km/h",
    dailyPrice: 2500,
    weeklyPrice: 15000,
    category: "standard",
    popular: true,
    features: [
      "Premium ride comfort",
      "Superior suspension system",
      "Electric start convenience",
      "Balanced power delivery",
    ],
    bestFor: "Long touring & multi-day adventures",
  },
  {
    id: "honda-cb-150f",
    name: "Honda CB 150F",
    tagline: "Premium Street Performance",
    image: "/bikes_hero.png",
    engine: "4-Stroke, SOHC, Air Cooled",
    cc: 150,
    fuelSystem: "Fuel Injection (PGM-FI)",
    transmission: "5-Speed",
    mileage: "35–45 km/l",
    weight: "128 kg",
    seatHeight: "785 mm",
    topSpeed: "130 km/h",
    dailyPrice: 3500,
    weeklyPrice: 21000,
    category: "sport",
    popular: true,
    features: [
      "Fuel injection technology",
      "Disc brake safety",
      "Aggressive sport styling",
      "LED lighting system",
    ],
    bestFor: "Sport touring & highway riding",
  },
  {
    id: "suzuki-gs-150",
    name: "Suzuki GS 150",
    tagline: "Torque King of the Mountains",
    image: "/bikes_hero.png",
    engine: "4-Stroke, SOHC, Air Cooled",
    cc: 150,
    fuelSystem: "Carburetor",
    transmission: "5-Speed",
    mileage: "38–48 km/l",
    weight: "135 kg",
    seatHeight: "790 mm",
    topSpeed: "120 km/h",
    dailyPrice: 3000,
    weeklyPrice: 18000,
    category: "sport",
    features: [
      "Powerful low-end torque",
      "Heavy-duty suspension",
      "Robust build quality",
      "Ideal for mountain gradients",
    ],
    bestFor: "Mountain passes & group touring",
  },
  {
    id: "suzuki-gr-150",
    name: "Suzuki GR 150",
    tagline: "Modern Sport Touring Machine",
    image: "/bikes_hero.png",
    engine: "4-Stroke, SOHC, Oil Cooled",
    cc: 150,
    fuelSystem: "Fuel Injection",
    transmission: "6-Speed",
    mileage: "35–42 km/l",
    weight: "139 kg",
    seatHeight: "800 mm",
    topSpeed: "135 km/h",
    dailyPrice: 3800,
    weeklyPrice: 22800,
    category: "sport",
    features: [
      "6-speed gearbox",
      "Oil-cooled engine",
      "Dual disc brakes",
      "Sporty riding position",
    ],
    bestFor: "Aggressive touring & Karakoram Highway",
  },
  {
    id: "honda-xr-150l",
    name: "Honda XR 150L",
    tagline: "Off-Road Trail Dominator",
    image: "/bikes_hero.png",
    engine: "4-Stroke, OHC, Air Cooled",
    cc: 150,
    fuelSystem: "Carburetor",
    transmission: "5-Speed",
    mileage: "40–50 km/l",
    weight: "128 kg",
    seatHeight: "840 mm",
    topSpeed: "105 km/h",
    dailyPrice: 4500,
    weeklyPrice: 27000,
    category: "adventure",
    features: [
      "High ground clearance",
      "Off-road capable tires",
      "Long-travel suspension",
      "Lightweight dual-sport frame",
    ],
    bestFor: "Fairy Meadows trails & off-road",
  },
  {
    id: "himalayan-411",
    name: "Royal Enfield Himalayan",
    tagline: "Purpose-Built Adventure Touring",
    image: "/bikes_hero.png",
    engine: "4-Stroke, SOHC, Air/Oil Cooled",
    cc: 411,
    fuelSystem: "Fuel Injection",
    transmission: "5-Speed",
    mileage: "30–35 km/l",
    weight: "199 kg",
    seatHeight: "800 mm",
    topSpeed: "135 km/h",
    dailyPrice: 8000,
    weeklyPrice: 48000,
    category: "adventure",
    popular: true,
    features: [
      "Built for Himalayan terrain",
      "ABS braking system",
      "Switchable rear ABS",
      "Adventure-ready luggage mounts",
    ],
    bestFor: "Skardu expeditions & multi-week tours",
  },
  {
    id: "klr-650",
    name: "Kawasaki KLR 650",
    tagline: "The Ultimate Expedition Machine",
    image: "/bikes_hero.png",
    engine: "4-Stroke, DOHC, Liquid Cooled",
    cc: 650,
    fuelSystem: "Fuel Injection",
    transmission: "5-Speed",
    mileage: "20–28 km/l",
    weight: "207 kg",
    seatHeight: "870 mm",
    topSpeed: "160 km/h",
    dailyPrice: 10000,
    weeklyPrice: 60000,
    category: "adventure",
    features: [
      "Legendary reliability",
      "Massive fuel tank (23L)",
      "Full panniers included",
      "Dominant highway presence",
    ],
    bestFor: "Khunjerab Pass & cross-country expeditions",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Bikes", icon: "🏍️" },
  { key: "economy", label: "Economy", icon: "💰" },
  { key: "standard", label: "Standard", icon: "⭐" },
  { key: "sport", label: "Sport", icon: "🔥" },
  { key: "adventure", label: "Adventure", icon: "🏔️" },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function BikesPage() {
  const { openBooking } = useBooking();
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "cc-asc" | "cc-desc">("price-asc");

  const filtered = BIKES.filter(
    (b) => activeFilter === "all" || b.category === activeFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.dailyPrice - b.dailyPrice;
      case "price-desc": return b.dailyPrice - a.dailyPrice;
      case "cc-asc": return a.cc - b.cc;
      case "cc-desc": return b.cc - a.cc;
      default: return 0;
    }
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-dark-bg text-foreground">
        {/* ── Hero Banner ────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/bikes_hero.png"
              alt="Mountain bikes fleet"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-black uppercase tracking-[0.25em] text-brand-orange mb-4"
            >
              Our Fleet
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-gradient mb-6"
            >
              Choose Your Ride
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-neutral-400 leading-relaxed"
            >
              From budget-friendly commuters to heavy-duty adventure machines —
              we have the perfect motorcycle for every trail in northern Pakistan.
            </motion.p>
          </div>
        </section>

        {/* ── Filter & Sort Controls ─────────────────────────── */}
        <section className="sticky top-[96px] z-20 py-3 sm:py-4 bg-dark-bg/95 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              {/* Category Filters — horizontally scrollable on mobile */}
              <div className="w-full sm:w-auto overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex gap-2 min-w-max">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveFilter(cat.key)}
                      className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        activeFilter === cat.key
                          ? "bg-gradient-to-r from-brand-orange to-red-600 text-white shadow-lg glow-orange"
                          : "bg-white/5 text-neutral-400 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <span className="mr-1">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="relative shrink-0">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-300 cursor-pointer focus:outline-none focus:border-brand-orange"
                  >
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="cc-asc">Engine: Small → Large</option>
                    <option value="cc-desc">Engine: Large → Small</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bike Grid ──────────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-neutral-500">
              Showing <span className="font-bold text-brand-orange">{sorted.length}</span> bike{sorted.length !== 1 ? "s" : ""}
              {activeFilter !== "all" && (
                <span> in <span className="capitalize font-semibold">{activeFilter}</span> category</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {sorted.map((bike, i) => (
                <motion.div
                  key={bike.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden border border-white/8 bg-dark-card hover:border-brand-orange/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/5 flex flex-col"
                >
                  {/* Popular Badge */}
                  {bike.popular && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full glass-panel-dark text-[10px] font-bold uppercase tracking-wider text-white">
                    {bike.category}
                  </div>

                  {/* Image */}
                  <div className="relative h-44 sm:h-52 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                    <Image
                      src={bike.image}
                      alt={bike.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 via-transparent" />

                    {/* CC Badge overlay */}
                    <div className="absolute bottom-3 left-3 sm:left-4 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-dark-bg/90 border border-white/10">
                      <Zap className="w-3.5 h-3.5 text-brand-orange" />
                      <span className="text-xs sm:text-sm font-black text-white">{bike.cc}cc</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-black font-serif text-white mb-1">
                      {bike.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mb-3 sm:mb-4">
                      {bike.tagline}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400">
                        <Cog className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{bike.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Fuel className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{bike.mileage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Gauge className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{bike.topSpeed}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Shield className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{bike.fuelSystem}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-5 flex-1">
                      {bike.features.map((f) => (
                        <div key={f} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-500">
                          <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Best For */}
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-orange mb-3 sm:mb-4">
                      Best for: {bike.bestFor}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-end justify-between pt-3 sm:pt-4 border-t border-white/5">
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-white">
                          PKR {bike.dailyPrice.toLocaleString()}
                          <span className="text-[10px] sm:text-xs font-normal text-neutral-500">/day</span>
                        </div>
                        <div className="text-[10px] sm:text-xs text-neutral-500">
                          Weekly: <span className="font-semibold text-brand-orange">PKR {bike.weeklyPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => openBooking(bike.name)}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 glow-orange cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        Book <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl p-6 sm:p-8 md:p-12 glass-panel-dark border border-white/5">
              <h2 className="text-2xl md:text-3xl font-black font-serif text-gradient mb-4">
                Can&apos;t Decide? Let Us Help!
              </h2>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-6 leading-relaxed">
                Not sure which bike suits your adventure? Our experts will recommend
                the perfect ride based on your route, group size, and riding experience.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => openBooking("")}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-widest transition-all glow-orange cursor-pointer"
                >
                  Book Any Bike Now
                </button>
                <a
                  href="https://wa.me/923009484055?text=Hi! I need help choosing the right bike for my trip to Naran."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Ask on WhatsApp
                </a>
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
