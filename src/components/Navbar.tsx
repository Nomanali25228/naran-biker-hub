"use client";

import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { openBooking } = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bikes", href: "/bikes" },
    { name: "Tours", href: "/tours" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "glass-panel-dark shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Naran Bikers Hub Logo"
                  fill
                  sizes="64px"
                  className="object-cover"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold tracking-wide text-neutral-300 hover:text-brand-orange transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => openBooking("")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-wider transition-all duration-300 active:scale-95 glow-orange hover:glow-orange cursor-pointer whitespace-nowrap"
              >
                Book a Bike
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => openBooking("")}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-orange to-red-600 text-white text-xs font-black uppercase tracking-wide cursor-pointer glow-orange"
              >
                Book
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden w-full border-t border-white/10 overflow-hidden glass-panel-dark"
            >
              <div className="px-4 py-5 space-y-1 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold tracking-wide text-neutral-200 hover:text-brand-orange hover:bg-white/5 transition-colors rounded-lg px-3 py-2.5"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openBooking("");
                  }}
                  className="w-full text-center py-3 mt-2 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white font-black uppercase tracking-wider text-sm transition-all duration-300 glow-orange cursor-pointer"
                >
                  Book a Bike Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
