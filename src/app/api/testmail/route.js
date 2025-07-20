import { NextResponse } from "next/server";
import { sendMail } from "@/app/utils/sendMail"; // Adjust path if needed

export async function GET() {
  try {
    await sendMail(
      "saisurla460@gmail.com", // ✅ Your real email
      "Test Email from Jobify",
      `<p>Hi Sai,</p>
       <p>This is a test email from the Jobify mailing system.</p>
       <p>If you're seeing this, your mail configuration is working perfectly! ✅</p>`
    );

    return NextResponse.json({ success: true, message: "Test email sent" });
  } catch (err) {
    console.error("❌ Test mail error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
