
import Dbconnect from "@/app/utils/dbConnect";
import Userdata from "@/app/utils/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    await Dbconnect();
    const { id } = params;
    console.log(id)
    try{
        if(!id){
            return NextResponse.json({error:"user Id is required"}, {status:400});

        }
        const user = await Userdata.findById(id);
        return NextResponse.json({message:"User fetched successfully"}, {status:200});
    }
    catch(err){
        console.error("Error fetching user:", err);
        return NextResponse.json({error:"Failed to fetch user"}, {status:500});
    }
 
 
}