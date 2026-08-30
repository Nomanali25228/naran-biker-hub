"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, Calendar, Bike, ArrowRight, Home } from "lucide-react";

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("id") || "NBH-CONFIRMED";
  const bike = searchParams.get("bike") || "Adventure Bike";
  const pickup = searchParams.get("pickup") || "Selected Date";
  const returnDate = searchParams.get("return") || "Selected Date";
  const email = searchParams.get("email") || "your email";

  return (
    <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10 glass-panel-dark rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl text-center"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 12 }}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-xl shadow-green-900/30"
        >
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight mb-2">
          Request Submitted Successfully!
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base max-w-md mx-auto mb-6">
          Aapki booking request haasil ho gayi hai. Confirmation email aapke address <span className="text-brand-orange font-semibold">{email}</span> par bhej di gayi hai.
        </p>

        {/* 24 Hour SLA Alert Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5 text-left"
        >
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-emerald-300 font-semibold text-sm sm:text-base">
              24 Hours Response Guarantee
            </h4>
            <p className="text-neutral-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
              Humari team aapki request verify karke **24 ghante ke andar** email aur phone par contact karegi aur payment & pickup details confirm karegi.
            </p>
          </div>
        </motion.div>

        {/* Order Details Card */}
        <div className="bg-neutral-900/70 rounded-2xl p-5 border border-white/10 text-left mb-8 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Booking ID
            </span>
            <span className="font-mono text-brand-orange font-bold text-sm sm:text-base bg-brand-orange/10 px-3 py-1 rounded-lg">
              {bookingId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-1">
            <div className="flex items-center gap-2.5 text-neutral-200">
              <Bike className="w-4 h-4 text-brand-orange shrink-0" />
              <span>
                <strong className="text-white">Motorcycle:</strong> {bike}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-neutral-200">
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <span className="truncate">
                <strong className="text-white">Email:</strong> {email}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-neutral-200">
              <Calendar className="w-4 h-4 text-brand-orange shrink-0" />
              <span>
                <strong className="text-white">Pickup:</strong> {pickup}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-neutral-200">
              <Calendar className="w-4 h-4 text-brand-orange shrink-0" />
              <span>
                <strong className="text-white">Return:</strong> {returnDate}
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/10"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/bikes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white font-bold shadow-lg transition-all glow-orange"
          >
            Browse More Bikes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
