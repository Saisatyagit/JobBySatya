"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "../components/ServerActions/RegisterAction";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const router = useRouter();

  const Registerhandler = async (e) => {
    e.preventDefault();
    const registerDetails = { fullname, email, password };

    try {
      const response = await registerAction(registerDetails);

      if (response.success) {
        setMessage("🎉 Registered successfully! Redirecting to login...");
        setMessageType("success");

        setTimeout(() => {
          router.push("/api/Login"); // ✅ navigate to login page
        }, 2000);

        setFullname("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("❌ Registration failed. Please try again.");
        setMessageType("danger");
      }
    } catch (err) {
      console.error(err);
      setMessage("🚫 Something went wrong. Please try again later.");
      setMessageType("danger");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #74ebd5, #acb6e5)",
      }}
    >
      <div
        className="bg-white p-5 rounded shadow"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4 text-primary">Register</h2>

        {message && (
          <div
            className={`alert alert-${messageType} text-center`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={Registerhandler}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Full Name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link href="/api/Login" className="text-decoration-none text-primary">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
