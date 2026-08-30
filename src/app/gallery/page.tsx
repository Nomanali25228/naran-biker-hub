"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  GALLERY DATA  (uses CSS gradient cards — no external images)      */
/* ------------------------------------------------------------------ */

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  category: "adventure" | "bikes" | "tourist";
  gradient: string;
  emoji: string;
  span?: "tall" | "wide" | "normal";
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Adventure
  {
    id: 1,
    title: "Babusar Pass Summit",
    location: "Babusar Top, 4,173m",
    category: "adventure",
    gradient: "from-slate-800 via-blue-900 to-slate-900",
    emoji: "🏔️",
    span: "tall",
  },
  {
    id: 2,
    title: "River Kunhar Trail",
    location: "Kaghan Valley",
    category: "adventure",
    gradient: "from-teal-900 via-emerald-800 to-slate-900",
    emoji: "🌊",
    span: "normal",
  },
  {
    id: 3,
    title: "Pine Forest Ride",
    location: "Shogran Plateau",
    category: "adventure",
    gradient: "from-green-900 via-emerald-900 to-slate-800",
    emoji: "🌲",
    span: "wide",
  },
  {
    id: 4,
    title: "Snow-Capped Peaks",
    location: "Lulusar Lake",
    category: "adventure",
    gradient: "from-indigo-900 via-slate-700 to-white/10",
    emoji: "🗻",
    span: "normal",
  },
  {
    id: 5,
    title: "KKH Abyss",
    location: "Karakoram Highway",
    category: "adventure",
    gradient: "from-amber-900 via-orange-900 to-slate-900",
    emoji: "⛰️",
    span: "tall",
  },
  {
    id: 6,
    title: "Fairy Meadows Camp",
    location: "Nanga Parbat Basecamp",
    category: "adventure",
    gradient: "from-violet-900 via-purple-800 to-slate-900",
    emoji: "🏕️",
    span: "normal",
  },
  // Bikes
  {
    id: 7,
    title: "Honda CG 125 Classic",
    location: "Naran Hub",
    category: "bikes",
    gradient: "from-red-900 via-rose-800 to-slate-900",
    emoji: "🏍️",
    span: "wide",
  },
  {
    id: 8,
    title: "Royal Enfield Himalayan",
    location: "Mountain Pass",
    category: "bikes",
    gradient: "from-stone-800 via-amber-900 to-slate-900",
    emoji: "⚙️",
    span: "tall",
  },
  {
    id: 9,
    title: "Yamaha YBR Fleet",
    location: "Naran Hub",
    category: "bikes",
    gradient: "from-blue-900 via-indigo-800 to-slate-900",
    emoji: "🚗",
    span: "normal",
  },
  {
    id: 10,
    title: "Honda CB150F Sport",
    location: "Bypass Road",
    category: "bikes",
    gradient: "from-cyan-900 via-teal-800 to-slate-800",
    emoji: "⚡",
    span: "normal",
  },
  {
    id: 11,
    title: "Adventure Gear Setup",
    location: "Naran Hub",
    category: "bikes",
    gradient: "from-zinc-800 via-gray-700 to-slate-900",
    emoji: "🛡️",
    span: "normal",
  },
  // Tourist
  {
    id: 12,
    title: "Lake Saif-ul-Muluk",
    location: "Naran, KP",
    category: "tourist",
    gradient: "from-sky-900 via-blue-700 to-teal-800",
    emoji: "🌅",
    span: "wide",
  },
  {
    id: 13,
    title: "Group Riders at Summit",
    location: "Babusar Top",
    category: "tourist",
    gradient: "from-orange-900 via-red-800 to-slate-900",
    emoji: "👥",
    span: "tall",
  },
  {
    id: 14,
    title: "Hunza Valley Vista",
    location: "Karimabad, Hunza",
    category: "tourist",
    gradient: "from-emerald-900 via-teal-700 to-slate-800",
    emoji: "🌄",
    span: "normal",
  },
  {
    id: 15,
    title: "Attabad Lake Crossing",
    location: "Gilgit-Baltistan",
    category: "tourist",
    gradient: "from-blue-900 via-cyan-700 to-teal-900",
    emoji: "🚤",
    span: "normal",
  },
  {
    id: 16,
    title: "Skardu Cold Desert",
    location: "Skardu, GB",
    category: "tourist",
    gradient: "from-yellow-900 via-amber-700 to-stone-800",
    emoji: "🏜️",
    span: "normal",
  },
  {
    id: 17,
    title: "Night Sky at 4000m",
    location: "Babusar Lake",
    category: "tourist",
    gradient: "from-slate-900 via-indigo-900 to-blue-950",
    emoji: "🌠",
    span: "wide",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Photos", icon: Camera },
  { key: "adventure", label: "Adventure", icon: Camera },
  { key: "bikes", label: "Our Fleet", icon: Camera },
  { key: "tourist", label: "Destinations", icon: Camera },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = GALLERY_ITEMS.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden text-center">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-600/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-black uppercase tracking-[0.25em] text-brand-orange mb-4"
            >
              Visual Stories
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-gradient-light dark:text-gradient mb-6"
            >
              Adventure Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed"
            >
              A glimpse into the rides, routes, and raw landscapes that await
              you in northern Pakistan&apos;s most spectacular terrain.
            </motion.p>
          </div>
        </section>

        {/* ── Filter Tabs ───────────────────────────────────── */}
        <section className="sticky top-[64px] z-20 py-4 glass-panel-light dark:glass-panel-dark border-b border-slate-200/50 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === cat.key
                      ? "bg-gradient-to-r from-brand-orange to-red-600 text-white shadow-lg glow-orange"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-400 dark:text-neutral-600 self-center">
                {filtered.length} photos
              </span>
            </div>
          </div>
        </section>

        {/* ── Masonry Gallery ───────────────────────────────── */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
              <AnimatePresence>
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(index)}
                    className={`relative group overflow-hidden rounded-2xl break-inside-avoid cursor-pointer
                      ${item.span === "tall" ? "h-80" : item.span === "wide" ? "h-52" : "h-60"}
                      bg-gradient-to-br ${item.gradient}
                      border border-white/5 hover:border-brand-orange/30 transition-all duration-300
                      hover:shadow-2xl hover:shadow-brand-orange/10 mb-4`}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Emoji Visual Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-7xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                        {item.emoji}
                      </div>
                    </div>

                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-3 rounded-full glass-panel-dark border border-white/20">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-brand-orange mb-0.5">
                        {item.category}
                      </div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1 h-1 rounded-full bg-brand-orange inline-block" />
                        {item.location}
                      </div>
                    </div>

                    {/* Hover Glow Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-brand-orange/0 group-hover:border-brand-orange/20 transition-all duration-300 pointer-events-none" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl p-8 md:p-12 glass-panel-light dark:glass-panel-dark border border-slate-200/50 dark:border-white/5">
              <div className="text-5xl mb-4">📸</div>
              <h2 className="text-2xl md:text-3xl font-black font-serif text-gradient-light dark:text-gradient mb-4">
                Capture Your Own Adventure
              </h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-lg mx-auto mb-6">
                Book a ride or tour with us and create memories worth a thousand photos.
                Every trail in northern Pakistan is a frame waiting to be captured.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/bikes"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-widest glow-orange transition-all cursor-pointer"
                >
                  Rent a Bike
                </a>
                <a
                  href="/tours"
                  className="px-8 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 text-xs font-black uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                >
                  View Tours
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={closeLightbox}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-2xl"
            >
              {/* Item Display */}
              {filtered[lightboxIndex] && (
                <div
                  className={`relative h-[70vh] rounded-2xl overflow-hidden bg-gradient-to-br ${filtered[lightboxIndex].gradient} border border-white/10`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[150px] opacity-25">{filtered[lightboxIndex].emoji}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[10px] font-black uppercase tracking-wider text-brand-orange mb-1">
                      {filtered[lightboxIndex].category}
                    </div>
                    <h3 className="text-2xl font-black text-white">{filtered[lightboxIndex].title}</h3>
                    <p className="text-sm text-neutral-400 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange inline-block" />
                      {filtered[lightboxIndex].location}
                    </p>
                  </div>

                  {/* Counter */}
                  <div className="absolute top-4 right-4 px-3 py-1 glass-panel-dark rounded-full text-xs text-white font-bold">
                    {lightboxIndex + 1} / {filtered.length}
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-[-52px] top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel-dark border border-white/10 text-white hover:border-brand-orange/40 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-[-52px] top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel-dark border border-white/10 text-white hover:border-brand-orange/40 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel-dark border border-white/10 text-white hover:border-brand-orange/40 transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
      <BookingModal />
    </>
  );
}
