"use client";

import { Users, Compass, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    {
      id: 1,
      name: "Happy Riders Hosted",
      value: "3,500+",
      icon: Users,
      desc: "Adventure seekers worldwide",
    },
    {
      id: 2,
      name: "Rentals & Tours Completed",
      value: "4,800+",
      icon: Compass,
      desc: "Safe mountain journeys",
    },
    {
      id: 3,
      name: "Fleet Availability",
      value: "50+ Bikes",
      icon: ShieldCheck,
      desc: "Yamaha, Suzuki, Royal Enfield",
    },
    {
      id: 4,
      name: "Roadside Assistance Care",
      value: "24/7 Hours",
      icon: HeartHandshake,
      desc: "Rescue support across KP & GB",
    },
  ];

  return (
    <section className="relative z-30 py-10 -mt-12 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl glass-panel-dark p-4 sm:p-6 border border-white/10 shadow-xl transition-all duration-300 hover:scale-[1.03] group hover:border-brand-orange/30 text-white"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-brand-orange/10 rounded-xl text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-serif tracking-tight text-neutral-100">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
                    {stat.name}
                  </div>
                  <div className="hidden sm:block text-[11px] text-neutral-400/80 mt-0.5">
                    {stat.desc}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
