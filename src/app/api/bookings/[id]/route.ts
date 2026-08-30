import { updateBookingStatus, deleteBooking } from "@/lib/bookings";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await updateBookingStatus(id, status);
    if (!updated) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    return Response.json({ booking: updated });
  } catch (error) {
    console.error("PATCH /api/bookings/[id] error:", error);
    return Response.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteBooking(id);

    if (!deleted) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/bookings/[id] error:", error);
    return Response.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
