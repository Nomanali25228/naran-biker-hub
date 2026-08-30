"use client";

import React, { createContext, useContext, useState } from "react";

export interface BookingDetails {
  bikeModel: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  name: string;
  email: string;
  phone: string;
  gearNeeded?: boolean;
  notes?: string;
}

interface SubmitResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}

interface BookingContextType {
  isBookingOpen: boolean;
  selectedBike: string;
  openBooking: (bikeModel?: string) => void;
  closeBooking: () => void;
  submitBooking: (details: BookingDetails) => Promise<SubmitResult>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState("");

  const openBooking = (bikeModel = "") => {
    setSelectedBike(bikeModel);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedBike("");
  };

  const submitBooking = async (details: BookingDetails): Promise<SubmitResult> => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bikeModel: details.bikeModel,
          name: details.name,
          email: details.email,
          phone: details.phone,
          pickupDate: details.pickupDate,
          returnDate: details.returnDate,
          days: details.days,
          gearNeeded: details.gearNeeded || false,
          notes: details.notes || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process booking request");
      }

      closeBooking();
      return { success: true, bookingId: data.booking.id };
    } catch (err: any) {
      console.error("Booking error:", err);
      return { success: false, error: err.message || "An unexpected error occurred." };
    }
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        selectedBike,
        openBooking,
        closeBooking,
        submitBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
