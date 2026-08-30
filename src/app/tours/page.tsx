"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Mountain,
  Users,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  Bike,
  ShieldCheck,
  Route,
  Utensils,
  BedDouble,
  Camera,
  Fuel,
  Compass,
} from "lucide-react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  TOUR DATA                                                         */
/* ------------------------------------------------------------------ */

interface TourPackage {
  id: string;
  name: string;
  tagline: string;
  image: string;
  duration: string;
  distance: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme";
  difficultyColor: string;
  maxGroup: number;
  startPoint: string;
  endPoint: string;
  elevation: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  inclusions: string[];
  itinerary: { day: string; title: string; desc: string }[];
  bestSeason: string;
  recommendedBike: string;
}

const TOURS: TourPackage[] = [
  {
    id: "naran-valley",
    name: "Naran Valley Explorer",
    tagline: "Discover the Heart of Kaghan",
    image: "/tours_hero.png",
    duration: "1 Day",
    distance: "80 km",
    difficulty: "Easy",
    difficultyColor: "text-green-500 bg-green-500/10",
    maxGroup: 15,
    startPoint: "Naran Hub",
    endPoint: "Naran Hub",
    elevation: "2,409 m",
    price: 4500,
    originalPrice: 6000,
    rating: 4.8,
    reviewCount: 124,
    highlights: [
      "Lake Saif-ul-Muluk",
      "Lulusar Lake viewpoint",
      "Naran Bazaar tour",
      "River Kunhar ride",
    ],
    inclusions: [
      "Motorcycle rental (Honda CG 125)",
      "Fuel for entire trip",
      "Helmet & safety gear",
      "Route map & GPS guidance",
      "Roadside assistance",
      "Photo stops at scenic points",
    ],
    itinerary: [
      { day: "Morning", title: "Naran Hub Departure", desc: "Gear up, safety briefing, and ride along River Kunhar to Saif-ul-Muluk trailhead." },
      { day: "Midday", title: "Lake Saif-ul-Muluk", desc: "Explore the legendary fairy-tale lake surrounded by snow-capped peaks." },
      { day: "Afternoon", title: "Valley Return", desc: "Scenic ride back through pine forests with stops at panoramic viewpoints." },
    ],
    bestSeason: "June – September",
    recommendedBike: "Honda CG 125",
  },
  {
    id: "kaghan-valley",
    name: "Kaghan Valley Grand Tour",
    tagline: "The Complete Valley Experience",
    image: "/tours_hero.png",
    duration: "2 Days / 1 Night",
    distance: "210 km",
    difficulty: "Moderate",
    difficultyColor: "text-yellow-500 bg-yellow-500/10",
    maxGroup: 12,
    startPoint: "Naran Hub",
    endPoint: "Naran Hub",
    elevation: "3,200 m",
    price: 12000,
    originalPrice: 16000,
    rating: 4.9,
    reviewCount: 89,
    highlights: [
      "Shogran Plateau",
      "Siri Paye meadows",
      "Kaghan town heritage",
      "Jalkhand waterfall",
      "Lulusar Lake",
    ],
    inclusions: [
      "Motorcycle rental (Yamaha YBR 125)",
      "Fuel for entire trip",
      "1 night hotel accommodation",
      "Helmet & safety gear",
      "Guided tour leader",
      "Breakfast included",
      "Emergency toolkit",
    ],
    itinerary: [
      { day: "Day 1", title: "Naran → Shogran → Siri Paye", desc: "Ride through lush valleys to Shogran, then climb to the stunning Siri Paye meadows at 3,000m." },
      { day: "Night", title: "Stay at Shogran", desc: "Overnight at a mountain lodge with bonfire & stargazing." },
      { day: "Day 2", title: "Kaghan → Lulusar → Naran", desc: "Descend through Kaghan town, visit Lulusar Lake, and return to Naran by evening." },
    ],
    bestSeason: "May – October",
    recommendedBike: "Yamaha YBR 125",
  },
  {
    id: "babusar-top",
    name: "Babusar Top Expedition",
    tagline: "Conquer the 4,173m Giant",
    image: "/tours_hero.png",
    duration: "2 Days / 1 Night",
    distance: "180 km",
    difficulty: "Challenging",
    difficultyColor: "text-orange-500 bg-orange-500/10",
    maxGroup: 10,
    startPoint: "Naran Hub",
    endPoint: "Naran Hub",
    elevation: "4,173 m",
    price: 18000,
    originalPrice: 24000,
    rating: 4.9,
    reviewCount: 156,
    highlights: [
      "Babusar Pass summit",
      "Lulusar Lake",
      "Babusar Lake",
      "Chilas viewpoint",
      "Snow-covered peaks",
    ],
    inclusions: [
      "Motorcycle rental (Honda CB 150F)",
      "Fuel for entire trip",
      "1 night camping / lodge",
      "Full safety gear",
      "Expert guide & mechanic",
      "Meals (2 lunches, 1 dinner, 1 breakfast)",
      "Emergency oxygen kit",
      "Photography assistance",
    ],
    itinerary: [
      { day: "Day 1", title: "Naran → Babusar Pass", desc: "Ascend through Gitidas, navigate hairpin turns, reach the majestic 4,173m summit." },
      { day: "Night", title: "Camp at Babusar", desc: "Night camp near Babusar Lake with Milky Way views." },
      { day: "Day 2", title: "Descent & Return", desc: "Morning photography, then descend via Lulusar Lake back to Naran." },
    ],
    bestSeason: "July – September",
    recommendedBike: "Honda CB 150F",
  },
  {
    id: "hunza-valley",
    name: "Hunza Valley Odyssey",
    tagline: "Journey to the Roof of the World",
    image: "/tours_hero.png",
    duration: "5 Days / 4 Nights",
    distance: "680 km",
    difficulty: "Challenging",
    difficultyColor: "text-orange-500 bg-orange-500/10",
    maxGroup: 8,
    startPoint: "Naran Hub",
    endPoint: "Naran Hub",
    elevation: "4,693 m",
    price: 55000,
    originalPrice: 72000,
    rating: 5.0,
    reviewCount: 67,
    highlights: [
      "Karakoram Highway",
      "Attabad Lake",
      "Eagle's Nest viewpoint",
      "Passu Cones",
      "Altit & Baltit Fort",
      "Rakaposhi Base Camp",
    ],
    inclusions: [
      "Motorcycle rental (Royal Enfield Himalayan)",
      "Fuel for entire trip",
      "4 nights hotel accommodation",
      "All meals included",
      "Full riding gear",
      "Expert tour guide",
      "Backup vehicle support",
      "Photography stops",
      "Local cultural experiences",
    ],
    itinerary: [
      { day: "Day 1", title: "Naran → Chilas", desc: "Cross Babusar Pass, descend to Chilas along the mighty Indus River." },
      { day: "Day 2", title: "Chilas → Karimabad", desc: "Ride the legendary Karakoram Highway to Hunza, visit Rakaposhi viewpoint." },
      { day: "Day 3", title: "Hunza Exploration", desc: "Visit Altit Fort, Baltit Fort, Eagle's Nest, and local markets." },
      { day: "Day 4", title: "Passu → Attabad Lake", desc: "Ride to Passu Cones, cross Attabad Lake tunnel, visit Borith Lake." },
      { day: "Day 5", title: "Return to Naran", desc: "Return journey via KKH and Babusar Pass to Naran Hub." },
    ],
    bestSeason: "June – October",
    recommendedBike: "Royal Enfield Himalayan",
  },
  {
    id: "skardu",
    name: "Skardu Silk Route",
    tagline: "Gateway to K2 & the Mighty Karakorams",
    image: "/tours_hero.png",
    duration: "7 Days / 6 Nights",
    distance: "1,200 km",
    difficulty: "Extreme",
    difficultyColor: "text-red-500 bg-red-500/10",
    maxGroup: 6,
    startPoint: "Naran Hub",
    endPoint: "Naran Hub",
    elevation: "5,000 m+",
    price: 85000,
    originalPrice: 110000,
    rating: 5.0,
    reviewCount: 43,
    highlights: [
      "Shangrila Resort",
      "Upper & Lower Kachura Lake",
      "Deosai National Park",
      "Satpara Lake",
      "Cold Desert Skardu",
      "K2 Base Camp viewpoint",
    ],
    inclusions: [
      "Motorcycle rental (Kawasaki KLR 650)",
      "Fuel for entire trip",
      "6 nights hotel / camping",
      "All meals included",
      "Full premium riding gear",
      "Expert guide + mechanic",
      "Backup vehicle",
      "Satellite phone for emergencies",
      "Deosai National Park permits",
      "Cultural & heritage tours",
    ],
    itinerary: [
      { day: "Day 1", title: "Naran → Chilas", desc: "Cross Babusar Pass, overnight in Chilas." },
      { day: "Day 2", title: "Chilas → Skardu", desc: "Ride along the Indus to Skardu, arrive at Shangrila." },
      { day: "Day 3", title: "Skardu Exploration", desc: "Visit Upper & Lower Kachura Lake, Skardu Fort, and Cold Desert." },
      { day: "Day 4", title: "Deosai Plateau", desc: "Full day on the 4,114m \"Land of the Giants\" — spot Himalayan brown bears." },
      { day: "Day 5", title: "Satpara & Surroundings", desc: "Visit Satpara Lake, Buddha Rock, and local villages." },
      { day: "Day 6", title: "Skardu → Chilas", desc: "Return ride along the Indus." },
      { day: "Day 7", title: "Chilas → Naran", desc: "Final leg over Babusar Pass back to Naran Hub." },
    ],
    bestSeason: "July – September",
    recommendedBike: "Kawasaki KLR 650",
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows Trail",
    tagline: "Camp Beneath Nanga Parbat",
    image: "/tours_hero.png",
    duration: "4 Days / 3 Nights",
    distance: "480 km",
    difficulty: "Extreme",
    difficultyColor: "text-red-500 bg-red-500/10",
    maxGroup: 6,
    startPoint: "Naran Hub",
    endPoint: "Naran Hub",
    elevation: "3,300 m",
    price: 65000,
    originalPrice: 85000,
    rating: 4.9,
    reviewCount: 52,
    highlights: [
      "Nanga Parbat base view",
      "Fairy Meadows campsite",
      "Raikot Bridge",
      "Tattu Village",
      "Indus River gorge",
    ],
    inclusions: [
      "Motorcycle rental (Honda CB 150F)",
      "Fuel for entire trip",
      "3 nights camping / lodge",
      "All meals included",
      "Full riding & trekking gear",
      "Expert guide",
      "Porter service for camping gear",
      "Jeep transfer from Raikot to Tattu",
      "Emergency medical kit",
    ],
    itinerary: [
      { day: "Day 1", title: "Naran → Chilas → Raikot Bridge", desc: "Cross Babusar Pass, ride to Raikot Bridge." },
      { day: "Day 2", title: "Raikot → Fairy Meadows", desc: "Jeep to Tattu Village, then 3-hour trek to Fairy Meadows." },
      { day: "Day 3", title: "Fairy Meadows Exploration", desc: "Full day at meadows — Nanga Parbat views, photography, and nature walks." },
      { day: "Day 4", title: "Return to Naran", desc: "Trek down, ride back via Babusar Pass." },
    ],
    bestSeason: "June – September",
    recommendedBike: "Honda CB 150F",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function ToursPage() {
  const [expandedTour, setExpandedTour] = useState<string | null>(null);

  const toggleExpand = (id: string) =>
    setExpandedTour((prev) => (prev === id ? null : id));

  const handleBookTour = (tour: TourPackage) => {
    const companyPhone = "923009484055";
    let text = `*🏔️ TOUR BOOKING REQUEST - NARAN BIKERS HUB* 🏔️\n\n`;
    text += `*📦 Package:* ${tour.name}\n`;
    text += `*⏱️ Duration:* ${tour.duration}\n`;
    text += `*📍 Route:* ${tour.startPoint} → ${tour.endPoint}\n`;
    text += `*💰 Price:* PKR ${tour.price.toLocaleString()}/person\n`;
    text += `*🏍️ Recommended Bike:* ${tour.recommendedBike}\n\n`;
    text += `I'm interested in this tour package. Please share available dates and details. Thank you!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${companyPhone}?text=${encodedText}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/tours_hero.png"
              alt="Motorcycle touring in northern Pakistan"
              fill
              className="object-cover object-center opacity-30 dark:opacity-20"
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
              Guided Adventures
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-gradient-light dark:text-gradient mb-6"
            >
              Tour Packages
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg max-w-2xl mx-auto text-slate-600 dark:text-neutral-400 leading-relaxed"
            >
              From single-day valley rides to week-long Karakoram Highway expeditions —
              experience Pakistan&apos;s most breathtaking landscapes on two wheels.
            </motion.p>
          </div>
        </section>

        {/* ── Tour Cards ───────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {TOURS.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/8 bg-white dark:bg-dark-card hover:border-brand-orange/20 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image */}
                  <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

                    {/* Difficulty Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${tour.difficultyColor}`}>
                      {tour.difficulty}
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel-dark text-white">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{tour.rating}</span>
                      <span className="text-xs text-neutral-400">({tour.reviewCount})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-8 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-white mb-1">
                          {tour.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-neutral-400">{tour.tagline}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-slate-400 dark:text-neutral-500 line-through">
                          PKR {tour.originalPrice.toLocaleString()}
                        </div>
                        <div className="text-2xl font-black text-brand-orange">
                          PKR {tour.price.toLocaleString()}
                          <span className="text-xs font-normal text-slate-400 dark:text-neutral-500">/person</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Clock className="w-4 h-4 text-brand-orange shrink-0" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Route className="w-4 h-4 text-brand-orange shrink-0" />
                        <span>{tour.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Mountain className="w-4 h-4 text-brand-orange shrink-0" />
                        <span>{tour.elevation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
                        <Users className="w-4 h-4 text-brand-orange shrink-0" />
                        <span>Max {tour.maxGroup} riders</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {tour.highlights.map((h) => (
                        <span key={h} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-xs font-semibold text-slate-600 dark:text-neutral-400">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Expand / Collapse */}
                    <button
                      onClick={() => toggleExpand(tour.id)}
                      className="flex items-center gap-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer mb-4"
                    >
                      {expandedTour === tour.id ? "Hide Details" : "View Full Details"}
                      {expandedTour === tour.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {expandedTour === tour.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 mb-5"
                      >
                        {/* Inclusions */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" /> What&apos;s Included
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {tour.inclusions.map((inc) => (
                              <div key={inc} className="flex items-start gap-2 text-xs text-slate-600 dark:text-neutral-400">
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Itinerary */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <Compass className="w-4 h-4 text-brand-orange" /> Itinerary
                          </h4>
                          <div className="space-y-3">
                            {tour.itinerary.map((item, idx) => (
                              <div key={idx} className="relative pl-6 border-l-2 border-brand-orange/30 pb-2">
                                <div className="absolute left-[-5px] top-1 w-2 h-2 bg-brand-orange rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-wider text-brand-orange mb-0.5">{item.day}</div>
                                <div className="text-sm font-bold text-slate-800 dark:text-neutral-200">{item.title}</div>
                                <div className="text-xs text-slate-500 dark:text-neutral-500">{item.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Extra Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8">
                            <div className="text-[10px] font-black uppercase tracking-wider text-brand-orange mb-1">Best Season</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5" /> {tour.bestSeason}
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8">
                            <div className="text-[10px] font-black uppercase tracking-wider text-brand-orange mb-1">Recommended Bike</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                              <Bike className="w-3.5 h-3.5" /> {tour.recommendedBike}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* CTA */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleBookTour(tour)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-wider glow-orange transition-all cursor-pointer"
                      >
                        Book This Tour
                      </button>
                      <a
                        href={`https://wa.me/923009484055?text=Hi! I'm interested in the ${encodeURIComponent(tour.name)} package.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                      >
                        Ask a Question
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Custom Tour CTA ──────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-br from-brand-orange/10 via-red-600/5 to-transparent border border-brand-orange/15 dark:border-brand-orange/10">
              <h2 className="text-2xl md:text-3xl font-black font-serif text-gradient-light dark:text-gradient mb-4">
                Need a Custom Tour?
              </h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-lg mx-auto mb-6">
                We design bespoke motorcycle adventures tailored to your schedule,
                budget, and dream destinations. Contact us for a personalized itinerary.
              </p>
              <a
                href="https://wa.me/923009484055?text=Hi! I want to plan a custom motorcycle tour in northern Pakistan."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-widest glow-orange transition-all cursor-pointer"
              >
                Plan Custom Tour on WhatsApp
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
