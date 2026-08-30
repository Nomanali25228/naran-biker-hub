import { connectDB } from "./db";
import BookingModel from "@/models/Booking";

export interface Booking {
  id: string;
  bikeModel: string;
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  gearNeeded: boolean;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export async function getBookings(): Promise<Booking[]> {
  const conn = await connectDB();
  if (!conn) {
    throw new Error("Database connection failed");
  }
  const docs = await BookingModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: doc.bookingId,
    bikeModel: doc.bikeModel,
    name: doc.name,
    email: doc.email || "",
    phone: doc.phone,
    pickupDate: doc.pickupDate,
    returnDate: doc.returnDate,
    days: doc.days,
    gearNeeded: doc.gearNeeded,
    notes: doc.notes || "",
    status: doc.status as Booking["status"],
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
  }));
}

export async function saveBooking(
  booking: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  const bookingId = `NBH-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const now = new Date().toISOString();

  const conn = await connectDB();
  if (!conn) {
    throw new Error("Database connection failed");
  }

  await BookingModel.create({
    bookingId,
    bikeModel: booking.bikeModel,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    pickupDate: booking.pickupDate,
    returnDate: booking.returnDate,
    days: booking.days,
    gearNeeded: booking.gearNeeded,
    notes: booking.notes,
    status: "pending",
  });

  return {
    ...booking,
    id: bookingId,
    status: "pending",
    createdAt: now,
  };
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  const conn = await connectDB();
  if (!conn) {
    throw new Error("Database connection failed");
  }

  const updated = await BookingModel.findOneAndUpdate(
    { bookingId: id },
    { status },
    { new: true }
  ).lean();

  if (!updated) return null;

  return {
    id: updated.bookingId,
    bikeModel: updated.bikeModel,
    name: updated.name,
    email: updated.email || "",
    phone: updated.phone,
    pickupDate: updated.pickupDate,
    returnDate: updated.returnDate,
    days: updated.days,
    gearNeeded: updated.gearNeeded,
    notes: updated.notes || "",
    status: updated.status as Booking["status"],
    createdAt: new Date(updated.createdAt).toISOString(),
  };
}

export async function deleteBooking(id: string): Promise<boolean> {
  const conn = await connectDB();
  if (!conn) {
    throw new Error("Database connection failed");
  }

  const result = await BookingModel.deleteOne({ bookingId: id });
  return result.deletedCount > 0;
}
