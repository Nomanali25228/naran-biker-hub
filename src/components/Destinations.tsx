"use client";

import { motion } from "framer-motion";
import { Milestone, Compass, MapPin, Gauge } from "lucide-react";
import Image from "next/image";

interface Destination {
  name: string;
  elevation: string;
  distance: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme";
  terrain: string;
  recommendation: string;
  desc: string;
}

export default function Destinations() {
  const destinations: Destination[] = [
    {
      name: "Babusar Top (Babusar Pass)",
      elevation: "13,691 feet (4,173 m)",
      distance: "65 km from Naran",
      difficulty: "Challenging",
      terrain: "Winding High-Altitude Asphalt",
      recommendation: "Suzuki GS 150 / Honda CB 150F",
      desc: "Spectacular steep hairpin twisties. A must-do cruise that leads to the border gate connecting KP with Gilgit-Baltistan.",
    },
    {
      name: "Saif-ul-Muluk Lake",
      elevation: "10,578 feet (3,224 m)",
      distance: "9 km from Naran Hub",
      difficulty: "Extreme",
      terrain: "Loose Gravel, Boulders & Streams",
      recommendation: "Yamaha YBR 125G (Air Pressure 20 psi)",
      desc: "A rocky trial route that tests your standing technique and clutch control. Jeep-only road, highly rewarding on standard trailers.",
    },
    {
      name: "Hunza Valley (Karimabad)",
      elevation: "8,200 feet (2,438 m)",
      distance: "235 km from Naran",
      difficulty: "Moderate",
      terrain: "Smooth Karakoram Highway (KKH)",
      recommendation: "Any 150cc + Cruiser / Adventure",
      desc: "A breathtaking long ride under the shadows of Rakaposhi and absolute giant peaks. Crosses tunnels, bridges and blue river streams.",
    },
    {
      name: "Skardu Canyon & Valley",
      elevation: "7,300 feet (2,225 m)",
      distance: "280 km from Naran",
      difficulty: "Extreme",
      terrain: "Juglot-Skardu Canyon Road & Sand",
      recommendation: "Himalayan 411cc / GS 150",
      desc: "Ride between carving cliffs, high altitude desert sand dunes (Katpana), and majestic bridges. Epic touring destination.",
    },
  ];

  const difficultyColors = {
    Easy: "bg-green-500/10 text-green-500 border-green-500/20",
    Moderate: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    Challenging: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
    Extreme: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-neutral-950/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              Riding Routes
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-neutral-100">
              Popular Motorcycle Routes
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Plan your mountain expedition. Review travel statistics, trail elevations, and recommendations before picking up your motorcycle.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-xl bg-white/5 text-xs font-bold font-serif text-neutral-300 whitespace-nowrap self-start md:self-auto">
            <Milestone className="w-5 h-5 text-brand-orange shrink-0" />
            <span>Map coordinates &amp; GPX advices at the Hub</span>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden glass-panel-dark border border-white/5 shadow-xl flex flex-col sm:flex-row items-stretch"
            >
              {/* Image banner */}
              <div className="relative w-full sm:w-2/5 min-h-[200px] sm:min-h-[220px] bg-neutral-900 overflow-hidden">
                <Image
                  src="/destination_babusar.png"
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent z-10" />
                <span className={`absolute top-4 left-4 z-20 px-2 py-0.5 border rounded text-[10px] uppercase font-bold tracking-wider ${difficultyColors[dest.difficulty]}`}>
                  {dest.difficulty} Mode
                </span>
              </div>

              {/* Text content */}
              <div className="p-5 sm:p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{dest.distance}</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-neutral-100">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {dest.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col gap-2 text-[11px] font-semibold text-neutral-400">
                  <div className="flex justify-between">
                    <span>Peak Altitude:</span>
                    <span className="text-neutral-200">{dest.elevation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Track Style:</span>
                    <span className="text-neutral-200">{dest.terrain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Machine:</span>
                    <span className="text-brand-orange font-bold">{dest.recommendation}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
