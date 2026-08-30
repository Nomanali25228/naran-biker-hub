import nodemailer from "nodemailer";

export interface BookingEmailData {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  bikeModel: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  gearNeeded: boolean;
  notes: string;
}

export interface ContactInquiryEmailData {
  name: string;
  phone?: string;
  email?: string;
  topic: string;
  message: string;
}

function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("SMTP credentials not configured in environment variables. Emails will be logged to console.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendBookingEmails(data: BookingEmailData) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || "info@naranbikerhub.com";

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0f0f11; color: #ffffff; padding: 30px; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 15px; margin-bottom: 25px;">
        <h1 style="color: #ea580c; margin: 0; font-size: 24px;">🏍️ New Booking Request</h1>
        <p style="color: #a3a3a3; font-size: 14px; margin-top: 5px;">Naran Bikers Hub — Order ID: <strong>${data.bookingId}</strong></p>
      </div>

      <div style="background-color: #1a1a1e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #2a2a30;">
        <h3 style="color: #f97316; margin-top: 0;">Customer Information</h3>
        <table style="width: 100%; font-size: 14px; color: #e5e5e5; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Name:</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Email:</td><td><a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Phone:</td><td><a href="tel:${data.phone}" style="color: #f97316;">${data.phone}</a></td></tr>
        </table>
      </div>

      <div style="background-color: #1a1a1e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #2a2a30;">
        <h3 style="color: #f97316; margin-top: 0;">Rental & Ride Details</h3>
        <table style="width: 100%; font-size: 14px; color: #e5e5e5; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Bike Model:</td><td><strong>${data.bikeModel}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Pickup Date:</td><td>${data.pickupDate}</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Return Date:</td><td>${data.returnDate}</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Duration:</td><td>${data.days} day(s)</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Rider Gear:</td><td>${data.gearNeeded ? "Yes (Helmet & Protective Armor)" : "No"}</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Notes / Tour:</td><td>${data.notes || "None"}</td></tr>
        </table>
      </div>

      <div style="text-align: center; margin-top: 25px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin" style="background-color: #ea580c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Open Admin Dashboard</a>
      </div>
    </div>
  `;

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0f0f11; color: #ffffff; padding: 30px; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 15px; margin-bottom: 25px;">
        <h1 style="color: #ea580c; margin: 0; font-size: 24px;">🏍️ Naran Bikers Hub</h1>
        <p style="color: #22c55e; font-size: 16px; font-weight: bold; margin-top: 8px;">Booking Request Received Successfully!</p>
      </div>

      <p style="font-size: 15px; line-height: 1.6; color: #d4d4d4;">
        Hi <strong>${data.name}</strong>,<br/><br/>
        Thank you for submitting your motorcycle rental request with <strong>Naran Bikers Hub</strong>! We are excited to serve you on your mountain adventure.
      </p>

      <div style="background-color: #1a1a1e; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #2a2a30;">
        <h3 style="color: #f97316; margin-top: 0; font-size: 16px;">Booking Summary (ID: ${data.bookingId})</h3>
        <table style="width: 100%; font-size: 14px; color: #e5e5e5; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Motorcycle:</td><td><strong>${data.bikeModel}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Pickup Date:</td><td>${data.pickupDate}</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Return Date:</td><td>${data.returnDate}</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Duration:</td><td>${data.days} Day(s)</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Rider Gear:</td><td>${data.gearNeeded ? "Yes (Helmet & Armor Included)" : "No"}</td></tr>
        </table>
      </div>

      <div style="background-color: #042f2e; border: 1px solid #0d9488; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
        <p style="margin: 0; color: #5eead4; font-weight: bold; font-size: 14px;">
          ⏰ Response Time: Our team will review your request and contact you via Email/Phone within <strong>24 hours</strong> to confirm bike availability and pickup instructions.
        </p>
      </div>

      <p style="font-size: 13px; color: #a3a3a3; text-align: center;">
        If you have urgent questions, feel free to reply directly to this email or reach us on WhatsApp.
      </p>

      <div style="border-top: 1px solid #262626; padding-top: 15px; margin-top: 25px; text-align: center; color: #737373; font-size: 12px;">
        © Naran Bikers Hub — Naran Valley, Khyber Pakhtunkhwa, Pakistan
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("=== MOCK EMAIL SENT ===");
    console.log(`[TO ADMIN]: ${adminEmail}`);
    console.log(`[TO CUSTOMER]: ${data.email}`);
    console.log(`[BOOKING ID]: ${data.bookingId}`);
    return { success: true, mocked: true };
  }

  try {
    // Send email to Admin
    await transporter.sendMail({
      from: `"Naran Bikers Hub" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🚨 New Booking Request #${data.bookingId} - ${data.name} (${data.bikeModel})`,
      html: adminHtml,
    });

    // Send email to Customer
    await transporter.sendMail({
      from: `"Naran Bikers Hub" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `✅ Booking Request Received #${data.bookingId} - Naran Bikers Hub`,
      html: customerHtml,
    });

    return { success: true, mocked: false };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendContactInquiryEmail(data: ContactInquiryEmailData) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || "info@naranbikerhub.com";

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0f0f11; color: #ffffff; padding: 30px; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 15px; margin-bottom: 25px;">
        <h1 style="color: #ea580c; margin: 0; font-size: 24px;">📩 New Contact Us Inquiry</h1>
        <p style="color: #a3a3a3; font-size: 14px; margin-top: 5px;">Naran Bikers Hub — Topic: <strong>${data.topic}</strong></p>
      </div>

      <div style="background-color: #1a1a1e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #2a2a30;">
        <h3 style="color: #f97316; margin-top: 0;">Inquirer Details</h3>
        <table style="width: 100%; font-size: 14px; color: #e5e5e5; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Name:</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Phone:</td><td><a href="tel:${data.phone || ""}" style="color: #f97316;">${data.phone || "Not provided"}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Email:</td><td>${data.email ? `<a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding: 6px 0; color: #a3a3a3;">Subject/Topic:</td><td><strong>${data.topic}</strong></td></tr>
        </table>
      </div>

      <div style="background-color: #1a1a1e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #2a2a30;">
        <h3 style="color: #f97316; margin-top: 0;">Message</h3>
        <p style="font-size: 14px; color: #e5e5e5; white-space: pre-wrap; line-height: 1.6; margin: 0;">${data.message}</p>
      </div>

      <div style="text-align: center; margin-top: 25px;">
        ${data.email ? `<a href="mailto:${data.email}" style="background-color: #ea580c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">Reply via Email</a>` : ""}
        ${data.phone ? `<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}" style="background-color: #22c55e; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply via WhatsApp</a>` : ""}
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("=== MOCK INQUIRY EMAIL SENT ===");
    console.log(`[TO ADMIN]: ${adminEmail}`);
    console.log(`[SUBJECT]: ${data.topic}`);
    return { success: true, mocked: true };
  }

  try {
    // Send email to Admin
    await transporter.sendMail({
      from: `"Naran Bikers Hub Inquiry" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `📩 Contact Inquiry: ${data.topic} - ${data.name}`,
      html: adminHtml,
    });

    // Send auto-reply to Customer if email provided
    if (data.email) {
      const customerAutoReplyHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #0f0f11; color: #ffffff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 15px; margin-bottom: 25px;">
            <h1 style="color: #ea580c; margin: 0; font-size: 24px;">🏍️ Naran Bikers Hub</h1>
            <p style="color: #22c55e; font-size: 16px; font-weight: bold; margin-top: 8px;">Inquiry Received!</p>
          </div>

          <p style="font-size: 15px; line-height: 1.6; color: #d4d4d4;">
            Hi <strong>${data.name}</strong>,<br/><br/>
            Thank you for reaching out to <strong>Naran Bikers Hub</strong> regarding <strong>${data.topic}</strong>.
          </p>

          <div style="background-color: #042f2e; border: 1px solid #0d9488; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: #5eead4; font-weight: bold; font-size: 14px;">
              ⏰ We have received your message and our team will get back to you within <strong>24 hours</strong>.
            </p>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 15px; margin-top: 25px; text-align: center; color: #737373; font-size: 12px;">
            © Naran Bikers Hub — Naran Valley, Khyber Pakhtunkhwa, Pakistan
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Naran Bikers Hub" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `✅ We received your inquiry - Naran Bikers Hub`,
        html: customerAutoReplyHtml,
      });
    }

    return { success: true, mocked: false };
  } catch (error) {
    console.error("Error sending inquiry email:", error);
    return { success: false, error };
  }
}
