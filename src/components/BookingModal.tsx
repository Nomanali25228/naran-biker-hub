"use client";

import { useBooking } from "@/context/BookingContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Calendar, Bike, User, Phone, Mail, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BIKES = [
  "Honda CD 70",
  "Honda CG 125",
  "Yamaha YBR 125",
  "Honda CB 150F",
  "Suzuki GS 150",
  "Suzuki GR 150",
  "Honda XR 150L",
  "Royal Enfield Himalayan (411cc)",
  "Kawasaki KLR 650",
];

export default function BookingModal() {
  const { isBookingOpen, selectedBike, closeBooking, submitBooking } = useBooking();
  const router = useRouter();

  const [bikeModel, setBikeModel] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [gearNeeded, setGearNeeded] = useState(false);
  const [notes, setNotes] = useState("");
  const [days, setDays] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedBike) {
      setBikeModel(selectedBike);
    } else {
      setBikeModel(BIKES[0]);
    }
  }, [selectedBike, isBookingOpen]);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setDays(diffDays);
    } else {
      setDays(1);
    }
  }, [pickupDate, returnDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!pickupDate || !returnDate) {
      setErrorMessage("Please select both Pickup and Return dates.");
      return;
    }

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const result = await submitBooking({
      bikeModel,
      pickupDate,
      returnDate,
      days,
      name,
      email,
      phone,
      gearNeeded,
      notes,
    });

    setIsSubmitting(false);

    if (result.success && result.bookingId) {
      // Redirect to booking success page
      router.push(
        `/booking-success?id=${encodeURIComponent(result.bookingId)}&bike=${encodeURIComponent(
          bikeModel
        )}&pickup=${encodeURIComponent(pickupDate)}&return=${encodeURIComponent(returnDate)}&email=${encodeURIComponent(email)}`
      );
    } else {
      setErrorMessage(result.error || "Failed to submit booking. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl z-10 glass-panel-dark text-white border border-white/10"
          >
            {/* Header */}
            <div className="relative p-5 sm:p-6 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Book Your Ride
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Ready to conquer Babusar Pass and Karakoram trails?
                </p>
              </div>
              <button
                onClick={closeBooking}
                disabled={isSubmitting}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 text-xs text-red-300 bg-red-950/60 border border-red-500/30 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Bike selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-brand-orange" />
                  Select Motorcycle Model
                </label>
                <select
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white cursor-pointer"
                  required
                >
                  {BIKES.map((model) => (
                    <option key={model} value={model} className="bg-neutral-900 text-white">
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-orange" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ali Khan"
                  className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-brand-orange" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white"
                    required
                  />
                </div>
              </div>

              {/* Gear checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="gearNeeded"
                  checked={gearNeeded}
                  onChange={(e) => setGearNeeded(e.target.checked)}
                  className="rounded border-white/20 text-brand-orange focus:ring-0 cursor-pointer h-4 w-4 bg-transparent"
                />
                <label htmlFor="gearNeeded" className="text-sm text-neutral-300 cursor-pointer select-none">
                  I need Rider Safety Equipment (Helmet, Armor pad, Gloves)
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Special Route Notes / Destination Tour
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Planning to ride to Saif-ul-Muluk, Babusar Top, and Hunza Valley"
                  className="w-full rounded-lg border border-white/10 bg-neutral-900/50 p-2.5 text-sm focus:border-brand-orange focus:outline-none text-white h-20 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={closeBooking}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-semibold hover:bg-white/5 transition-colors text-white cursor-pointer text-center disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 py-3 text-sm font-bold shadow-lg transition-all active:scale-[0.98] glow-orange text-white cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
