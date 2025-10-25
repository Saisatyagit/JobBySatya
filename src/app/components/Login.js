"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginAction } from "../components/ServerActions/LoginAction";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };

    try {
      const result = await LoginAction(loginDetails);

      if (result?.error) {
        alert("Invalid email or password!");
      } else {
        alert("Login successful!");
        router.push("/"); // Redirect to home page after login
      }
    } catch (err) {
      alert("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #dff6ff, #f7d9ff)",
        padding: "20px",
      }}
    >
      <div
        className="bg-white p-5 rounded shadow-lg w-100"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="mb-4 text-center text-primary">Login</h3>

        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <Link href="/api/Register" className="text-decoration-none text-primary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
