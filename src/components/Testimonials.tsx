"use client";

import { motion } from "framer-motion";
import { Star, Quote, Heart } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  bike: string;
  rating: number;
  review: string;
  avatarInitials: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Asad Ali",
      location: "Lahore, Pakistan",
      bike: "Suzuki GS 150",
      rating: 5,
      avatarInitials: "AA",
      review: "Rented 3 GS 150s with my group for the Babusar ride. Out of all rental companies, their fleets had the absolute best engines. No oil leaks, brand new rear tires. Racks were pre-installed! Highly recommended.",
    },
    {
      name: "Sven Meyer",
      location: "Munich, Germany",
      bike: "Royal Enfield Himalayan",
      rating: 5,
      avatarInitials: "SM",
      review: "Incredible motorcycle exploration experience. Visited Hunza Valley and Passu Cones. The Himalayan was running beautifully on the Karakoram Highway. Clear documentation and English support.",
    },
    {
      name: "Zainab Fatima",
      location: "Islamabad, Pakistan",
      bike: "Yamaha YBR 125G",
      rating: 5,
      avatarInitials: "ZF",
      review: "Super easy and friendly rental process. The YBR 125G was lightweight and easy to navigate for Saif-ul-Muluk lake climb. They provided fresh, sanitized safety helmets which is rare for bike rentals.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            Rider Feedbacks
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-neutral-100">
            Adventure Logs from Our Clients
          </h2>
          <p className="text-sm text-neutral-400">
            Real stories, real reviews. Join thousands of riders who cruised the Karakoram trails on Naran Bikers Hub fleets.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl glass-panel-dark border border-white/5 p-5 sm:p-6 shadow-md flex flex-col justify-between relative group hover:border-brand-orange/30 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors">
                <Quote className="w-10 h-10 transform scale-x-[-1]" />
              </div>

              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 mt-5 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-orange to-red-600 flex items-center justify-center font-bold text-white text-sm shadow-md glow-orange shrink-0">
                  {t.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-100">{t.name}</h4>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center gap-1 mt-0.5 flex-wrap">
                    <span>{t.location}</span>
                    <span className="text-brand-orange">•</span>
                    <span className="text-brand-orange">{t.bike}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-neutral-500 flex items-center justify-center gap-1">
          <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
          <span>Over 98% 5-star ratings across tourism networks. Trust the orange badge.</span>
        </div>
      </div>
    </section>
  );
}
