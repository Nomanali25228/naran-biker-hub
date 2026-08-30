import { getBookings, saveBooking } from "@/lib/bookings";
import { sendBookingEmails } from "@/lib/email";

export async function GET() {
  try {
    const bookings = await getBookings();
    return Response.json({ bookings });
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bikeModel, name, email, phone, pickupDate, returnDate, days, gearNeeded, notes } = body;

    if (!bikeModel || !name || !email || !phone || !pickupDate || !returnDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await saveBooking({
      bikeModel,
      name: name || "Customer",
      email: email.trim().toLowerCase(),
      phone: phone || "",
      pickupDate,
      returnDate,
      days: days || 1,
      gearNeeded: gearNeeded || false,
      notes: notes || "",
    });

    // Send emails in background asynchronously
    sendBookingEmails({
      bookingId: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      bikeModel: booking.bikeModel,
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
      days: booking.days,
      gearNeeded: booking.gearNeeded,
      notes: booking.notes,
    }).catch((emailErr) => {
      console.error("Failed to send booking emails:", emailErr);
    });

    return Response.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return Response.json({ error: "Failed to save booking" }, { status: 500 });
  }
}
