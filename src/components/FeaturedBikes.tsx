"use client";

import { useBooking } from "@/context/BookingContext";
import { motion } from "framer-motion";
import { Fuel, ShieldAlert, BadgeInfo, Cpu, Gauge } from "lucide-react";
import Image from "next/image";

interface Bike {
  name: string;
  category: string;
  price: number;
  engine: string;
  clearance: string;
  fuel: string;
  tag: string;
  desc: string;
}

export default function FeaturedBikes() {
  const { openBooking } = useBooking();

  const bikes: Bike[] = [
    {
      name: "Yamaha YBR 125G",
      category: "Trail Sport",
      price: 2500,
      engine: "124cc (Air-Cooled)",
      clearance: "145 mm",
      fuel: "13 Liters",
      tag: "Tourers Favorite",
      desc: "Voted #1 for reliability and fuel economy on the mountain tracks. Equipped with block pattern trail tires and engine guards.",
    },
    {
      name: "Suzuki GS 150",
      category: "Mountain Solo",
      price: 3000,
      engine: "150cc (4-Stroke)",
      clearance: "155 mm",
      fuel: "12 Liters",
      tag: "Rugged Classic",
      desc: "The absolute standard for Pakistan's northern routes. Massive torque, high ground clearance, and custom rear pannier racks for heavy luggage.",
    },
    {
      name: "Honda CB 150F",
      category: "Premium Cruiser",
      price: 3500,
      engine: "149cc (Liquid-Like Tuned)",
      clearance: "140 mm",
      fuel: "12.5 Liters",
      tag: "Ultimate Comfort",
      desc: "Outstanding front and rear suspension dampening. Delivers smooth pickup and premium seating comfort for long mileage cruises.",
    },
    {
      name: "Royal Enfield Himalayan (411cc)",
      category: "Heavy Adventure Tourer",
      price: 8000,
      engine: "411cc (Torquey Single)",
      clearance: "220 mm",
      fuel: "15 Liters",
      tag: "Premium Offroad",
      desc: "Purpose-built adventure bike. Easily conquers water crossings, rocky paths, and steep slopes of Skardu and Deosai plains.",
    },
    {
      name: "Kawasaki KLR 650",
      category: "Dual Sport Explorer",
      price: 10000,
      engine: "652cc (Liquid-Cooled DOHC)",
      clearance: "210 mm",
      fuel: "23 Liters",
      tag: "Expert Heavy Bike",
      desc: "A legendary overland tourer. Built for experienced global riders touring Karakoram Highway and rough mountain territories.",
    },
  ];

  return (
    <section id="bikes" className="py-16 sm:py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            Adventure Machinery
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-neutral-100">
            Our Inspected Rental Fleet
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Select the perfect motorcycle tailored to your driving style, budget, and route conditions. Helmets and document folder are included.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bikes.map((bike, idx) => (
            <motion.div
              key={bike.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl glass-panel-dark border border-white/5 overflow-hidden hover:border-brand-orange/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Bike Image banner */}
                <div className="relative h-52 sm:h-56 bg-neutral-900 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent z-10" />
                  <Image
                    src="/bike_standard.png"
                    alt={bike.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded bg-brand-orange text-white text-[10px] uppercase font-black tracking-widest shadow-md">
                    {bike.tag}
                  </span>

                </div>

                {/* Bike Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">
                      {bike.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-neutral-100 mt-1">
                      {bike.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed min-h-[60px]">
                    {bike.desc}
                  </p>

                  {/* Bike Specs */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-[11px] font-semibold text-neutral-400">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Engine</span>
                      </div>
                      <span className="text-neutral-200">{bike.engine}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Fuel className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Fuel Tank</span>
                      </div>
                      <span className="text-neutral-200">{bike.fuel}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Clearance</span>
                      </div>
                      <span className="text-neutral-200">{bike.clearance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => openBooking(bike.name)}
                  className="w-full py-3 bg-white/5 hover:bg-gradient-to-r hover:from-brand-orange hover:to-red-600 hover:text-white transition-all duration-300 font-bold uppercase tracking-wider text-xs border border-white/10 rounded-xl cursor-pointer text-center text-neutral-200"
                >
                  Configure &amp; Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
