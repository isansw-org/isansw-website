import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { getSmtpConfig } from "@/lib/email/mailer";
import { z } from "zod";

export const sendEmailAPIPayloadSchema = z.object({
  from: z.string().email(),
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { success: isRequestBodyValid, data: email } =
      sendEmailAPIPayloadSchema.safeParse(requestBody);

    if (!isRequestBodyValid) {
      throw new Error("Invalid inputs.");
    }

    const transporter = nodemailer.createTransport(getSmtpConfig());
    const info = await transporter.sendMail(email);

    if (info.accepted.length <= 0) {
      throw new Error("Failed to send email.");
    }

    return NextResponse.json({
      success: true,
      message: "Successfully sent email.",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Something went wrong...",
    });
  }
}
