"use server";
import Dbconnect from "@/app/utils/dbConnect";
import JobPostModel from "@/app/utils/models/Jobpost";
import Path from "path";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

// GET method to test API connection
export async function GET() {
  await Dbconnect();
  const records = await JobPostModel.find({})
  return NextResponse.json(records, { status: 200 });
}

// POST method to handle job post creation
export async function POST(request) {
  await Dbconnect();

  const formData = await request.formData();
  const jobTitle= formData.get('jobTitle');
  const description = formData.get('description');
  const companyName = formData.get('companyName');
  const location = formData.get('location');
  const type = formData.get('type');
  const category = formData.get('category');
  const salaryRange = formData.get('salaryRange');
  const requirements = formData.get('requirements');
  const companyLogo = formData.get('companyLogo');
  const postedAt = new Date();
  const bufferdata= await companyLogo.arrayBuffer();
  const buffer= Buffer.from(bufferdata);
  const imagePath = Path.join(process.cwd(), 'public', 'uploads', companyLogo.name);
  try{
    await writeFile(imagePath, buffer);
    const newJob = new JobPostModel({
      title: jobTitle,
      description,
      companyName,
      location,
      type,
      category,
      salaryRange,
      requirements,
      companyLogo: `/uploads/${companyLogo.name}`, // Store relative path
      postedAt
    });
    await newJob.save();
    return NextResponse.json({ message: "Job added successfully" }, { status: 201 });
  }
  catch(err){
    console.error("Error writing file:", err);
    return NextResponse.json({ error: "Failed to save company logo" }, { status: 500 });
  }




}