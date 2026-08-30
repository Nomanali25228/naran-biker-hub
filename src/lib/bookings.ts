import fs from "fs";
import path from "path";
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

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
  }
}

function getLocalBookings(): Booking[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLocalBooking(booking: Booking) {
  const bookings = getLocalBookings();
  bookings.unshift(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

export async function getBookings(): Promise<Booking[]> {
  try {
    const conn = await connectDB();
    if (conn) {
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
  } catch (error) {
    console.error("Failed to fetch from MongoDB, falling back to local JSON:", error);
  }

  return getLocalBookings();
}

export async function saveBooking(
  booking: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  const bookingId = `NBH-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const now = new Date().toISOString();

  const newBooking: Booking = {
    ...booking,
    id: bookingId,
    status: "pending",
    createdAt: now,
  };

  try {
    const conn = await connectDB();
    if (conn) {
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
      // Also sync to local storage as backup
      saveLocalBooking(newBooking);
      return newBooking;
    }
  } catch (error) {
    console.error("Failed to save to MongoDB, saving locally:", error);
  }

  saveLocalBooking(newBooking);
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  try {
    const conn = await connectDB();
    if (conn) {
      const updated = await BookingModel.findOneAndUpdate(
        { bookingId: id },
        { status },
        { new: true }
      ).lean();

      if (updated) {
        // also sync local
        const local = getLocalBookings();
        const idx = local.findIndex((b) => b.id === id);
        if (idx !== -1) {
          local[idx].status = status;
          fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(local, null, 2));
        }

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
    }
  } catch (error) {
    console.error("Failed to update status in MongoDB:", error);
  }

  // Fallback to local
  const bookings = getLocalBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index].status = status;
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  return bookings[index];
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const conn = await connectDB();
    if (conn) {
      await BookingModel.deleteOne({ bookingId: id });
    }
  } catch (error) {
    console.error("Failed to delete from MongoDB:", error);
  }

  const bookings = getLocalBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  if (filtered.length === bookings.length) return false;
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
