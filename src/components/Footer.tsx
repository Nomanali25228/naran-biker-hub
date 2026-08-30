"use client";

import { useBooking } from "@/context/BookingContext";
import { Mail, Phone, MapPin, Calendar, Clock, ShieldCheck, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  const { openBooking } = useBooking();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-neutral-950 text-white pt-16 pb-8 border-t border-neutral-900 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company identity */}
          <div className="space-y-4">
            <Link href="/" className="block w-16 h-16 relative">
              <Image
                src="/logo.png"
                alt="Naran Bikers Hub Logo"
                fill
                sizes="64px"
                className="object-cover"
              />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Pakistan's ultimate motorcycle rental and guided tour service. Based in Naran, we equip you with high-quality bikes to conquer Babusar Pass, Gilgit-Baltistan, Hunza, and Skardu.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-orange font-semibold">
              <ShieldCheck className="w-5 h-5" />
              <span>Helmets & basic checks included with every rental!</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-4 border-l-2 border-brand-orange pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link href="/bikes" className="hover:text-brand-orange transition-colors">Bike Rentals</Link></li>
              <li><Link href="/tours" className="hover:text-brand-orange transition-colors">Tour Packages</Link></li>
              <li><Link href="/gallery" className="hover:text-brand-orange transition-colors">Photo Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-brand-orange transition-colors">Travel Blog</Link></li>
              <li><Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Practical info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-4 border-l-2 border-brand-orange pl-2.5">
              Contact & Hub
            </h4>
            <ul className="space-y-3.5 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span>Main Bypass Road, near Jamil Hotel, Naran, Kaghan Valley, KP, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:+923009484055" className="hover:text-brand-orange transition-colors">
                  +92 (300) 948-4055
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:info.naranbikershub@gmail.com" className="hover:text-brand-orange transition-colors">
                  info.naranbikershub@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Operating hours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-4 border-l-2 border-brand-orange pl-2.5">
              Operating Hours
            </h4>
            <div className="space-y-3.5 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>08:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>Open 7 Days a week (June-November)</span>
              </div>
              <div className="pt-2 flex gap-3 text-neutral-400">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900 rounded-lg hover:bg-brand-orange hover:text-white transition-colors cursor-pointer" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900 rounded-lg hover:bg-brand-orange hover:text-white transition-colors cursor-pointer" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer / Notice */}
        <div className="mt-12 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-500 leading-relaxed max-w-4xl mx-auto">
          <p>
            ⚠️ *Safety Notice & Riding Requirements:* All riders must present a valid national/international motorcycle driving license before pickup. Safety helmets are strictly mandatory for both riders and pillions. Adventure riders touring to remote regions (e.g. Khunjrab Pass, Skardu) are advised to travel in groups and hire a local tour guide.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Naran Bikers Hub. All rights reserved. Built for rugged northern touring.
          </p>
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-brand-orange transition-colors group cursor-pointer"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
