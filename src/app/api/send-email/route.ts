import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-template";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json();

    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { success: false, message: "Email and message are both required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format." },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await resend.emails.send({
      from: "bhavesh <onboarding@resend.dev>",
      to: ["bhaveshanjana58@gmail.com"],
      subject: "Message from Your Portfolio",
      react: EmailTemplate({ Email: trimmedEmail, Message: trimmedMessage }),
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Something went wrong while sending email : ${error}`,
        },
        { status: 501 }
      );
    }

    return NextResponse.json(
      { success: true, message: "I will get in touch with you soon :)" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error occurred : ${error}` },
      { status: 501 }
    );
  }
}
