"use server"

import Dbconnect from "@/app/utils/dbConnect"

export async function JobpostAction(formData) {
   await Dbconnect();
   // Handle formData and perform actions (e.g., create a job post)
   console.log("job details", formData);
}