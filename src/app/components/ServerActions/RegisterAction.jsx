"use server"

import Dbconnect from "@/app/utils/dbConnect"
import Userdata from "@/app/utils/models/User";

export async function registerAction(registerDetails){
  console.log(  "server details",registerDetails)
  await Dbconnect();
  await Userdata.create(registerDetails)
  return {success: true, message: "User registered successfully" }

  }
