"use server";

import { signIn } from "@/app/auth";


export async function LoginAction(loginDetails) {
  try {
    const res = await signIn("credentials", {
      email: loginDetails.email,
      password: loginDetails.password,
      redirect: false,   // prevents auto redirect
      callbackUrl: "/",  // redirect path on success
    });

    if (res?.error) {
      console.error("❌ Login failed:", res.error);
      throw new Error(res.error);
    }

    console.log("✅ Login success:", res);
    return res;
  } catch (error) {
    console.error("⚠️ Login error:", error);
    throw error;
  }
}

