import { NextResponse } from "next/server";


import Dbconnect from "@/app/utils/dbConnect";
import Jobpost from "@/app/utils/models/Jobpost";
import Apply from "@/app/utils/models/Apply";

export async function GET() {
  await Dbconnect();
  const applications = await Apply.find().populate("jobId");
  return NextResponse.json({ applications });
}

export async function PATCH(req) {
  await Dbconnect();
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: "Missing ID or status" }, { status: 400 });
  }

  try {
    const updated = await Apply.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

