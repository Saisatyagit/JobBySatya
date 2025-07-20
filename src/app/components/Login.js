"use client";
import React, { useState } from 'react';
import { LoginAction } from './ServerActions/LoginAction';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };
    console.log(loginDetails);
    await LoginAction(loginDetails);
    router.push("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #dff6ff, #f7d9ff)",
        padding: "20px"
      }}
    >
      <div className="bg-white p-5 rounded shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h3 className="mb-4 text-center text-primary">Login</h3>
        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <a href="/api/Register" className="text-decoration-none text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
