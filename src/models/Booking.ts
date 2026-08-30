import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  bookingId: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    bikeModel: {
      type: String,
      required: [true, "Bike model is required"],
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Customer phone number is required"],
    },
    pickupDate: {
      type: String,
      required: [true, "Pickup date is required"],
    },
    returnDate: {
      type: String,
      required: [true, "Return date is required"],
    },
    days: {
      type: Number,
      required: true,
      default: 1,
    },
    gearNeeded: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
