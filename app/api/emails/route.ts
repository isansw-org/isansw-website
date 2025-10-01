import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { getSmtpConfig } from "@/lib/email/mailer";
import { sendEmailAPIPayloadSchema } from "@/lib/email/schema";
import { z } from "zod";

// nodemailer requires Node.js runtime
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = sendEmailAPIPayloadSchema.parse(body);

    const transporter = nodemailer.createTransport(getSmtpConfig());
    const info = await transporter.sendMail(email);

    if (!info.accepted || info.accepted.length === 0) {
      return NextResponse.json(
        { success: false, message: "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully sent email.",
      id: info.messageId,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid inputs.", errors: err.issues },
        { status: 400 }
      );
    }

    const message =
      err instanceof Error ? err.message : "Something went wrong...";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
