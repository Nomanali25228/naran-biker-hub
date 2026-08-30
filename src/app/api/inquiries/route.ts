import { sendContactInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, topic, message } = body;

    if (!name || !message) {
      return Response.json({ error: "Name and message are required" }, { status: 400 });
    }

    const emailResult = await sendContactInquiryEmail({
      name,
      phone,
      email,
      topic: topic || "General Inquiry",
      message,
    });

    return Response.json({ success: true, emailResult }, { status: 201 });
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return Response.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
