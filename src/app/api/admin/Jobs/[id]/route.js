import Dbconnect from "@/app/utils/dbConnect";
import JobPostModel from "@/app/utils/models/Jobpost";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { id } = params;
    await Dbconnect();
    try {
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Job ID is required"
            }, { status: 400 });
        }
        
        const job = await JobPostModel.findById(id);
        
        if (!job) {
            return NextResponse.json({
                success: false,
                message: "Job not found"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            success: true,
            job: job,
            message: "Job found"
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}