import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import Apply from "@/app/utils/models/Apply";
import JobPost from "@/app/utils/models/Jobpost"; // ✅ FIXED: Register JobPost
import { sendMail } from "@/app/utils/sendMail";

// ✅ GET: Fetch all applications for a user by email
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const applications = await Apply.find({ email }).populate("jobId");
    return NextResponse.json({ applications });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ POST: Update status and send email
export async function POST(req) {
  await dbConnect();

  const { applicationId, newStatus } = await req.json();

  if (!applicationId || !newStatus) {
    return NextResponse.json({ error: "Missing applicationId or newStatus" }, { status: 400 });
  }

  try {
    const application = await Apply.findById(applicationId).populate("jobId");
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    application.status = newStatus;
    await application.save();

    // ✅ Email notification
    await sendMail(
      application.email,
      "Application Status Updated",
      `<p>Hi ${application.name},</p>
       <p>Your application for <strong>${application.jobId.title}</strong> has been updated to: <strong>${newStatus}</strong>.</p>
       <p>Thank you for using Jobify!</p>`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error updating status or sending email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

