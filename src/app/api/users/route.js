import Dbconnect from "@/app/utils/dbConnect";
import Userdata from "@/app/utils/models/User";
import { NextResponse } from "next/server";


export async function GET(){
    await Dbconnect();
    try{
        const user= await Userdata.find({role:{$ne:"admin"}}).select("-password -__v");
        if(!user){
            return NextResponse.json({
                success:false,
                message:"No user found"},{status:404});
        }
        return NextResponse.json({
            success:true,user,message:"user found"},{status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error"},{status:500});

    }
}
   
