"use server"

import { signIn } from "@/app/auth";

export async function LoginAction(loginDetails) {
  console.log("login details", loginDetails);
  try {
    await signIn("credentials", {
      email:loginDetails.email,
      password: loginDetails.password,
    redirectTo:"/"
  })
  }catch(error) {
    console.error("Login failed:", error);
    return { success: false, error: error.message };
  }
}
