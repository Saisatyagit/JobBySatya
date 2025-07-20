import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import JobPost from "@/app/utils/models/Jobpost";
import Apply from "@/app/utils/models/Apply";
import { writeFile } from "fs/promises";
import path from "path";
import { sendMail } from "@/app/utils/sendMail";

export async function POST(req) {
  await dbConnect();
  const data = await req.formData();

  const name = data.get("name");
  const email = data.get("email");
  const file = data.get("resume");
  const jobId = data.get("jobId");

  if (!name || !email || !file || !jobId) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  try {
    // ✅ Save resume file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join("public", "resumes", file.name);
    await writeFile(filePath, buffer);
    const resumeUrl = `/resumes/${file.name}`;

    // ✅ Create application entry
    const application = await Apply.create({ name, email, resume: resumeUrl, jobId });

    // ✅ Add application to job post
    await JobPost.findByIdAndUpdate(jobId, {
      $push: { applications: application._id },
    });

    // ✅ Fetch job details
    const job = await JobPost.findById(jobId);

    // ✅ Send confirmation email to applicant
    await sendMail(
      email,
      "Job Application Submitted",
      `<p>Hi ${name},</p>
       <p>Your application for <strong>${job.title}</strong> has been submitted successfully.</p>
       <p>We’ll contact you if you are shortlisted.</p>
       <p>Thanks for applying!</p><br><p>– Jobify Team</p>`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Application error:", error);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}






