
import { NextResponse } from "next/server";
import JobPost from "@/app/utils/models/JobPost";
import Apply from "@/app/utils/models/Apply";
import Dbconnect from "@/app/utils/dbConnect";

// ✅ This route fetches the job details based on applicant email
export async function GET(req) {
  await Dbconnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const application = await Apply.findOne({ email }).populate("jobId");

    if (!application || !application.jobId) {
      return NextResponse.json(
        { success: false, error: "No job found for this email" },
        { status: 404 }
      );
    }

    const job = application.jobId;

    return NextResponse.json({
      success: true,
      job: {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
      },
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}



