
"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerAction } from './ServerActions/RegisterAction';
import { useRouter } from 'next/navigation';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
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
                    router.push("/api/Login");
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
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "linear-gradient(to right, #74ebd5, #acb6e5)" }}>
            <div className="bg-white p-5 rounded shadow" style={{ width: "100%", maxWidth: "450px" }}>
                <h2 className="text-center mb-4">Register Form</h2>
                {message && (
                    <div className={`alert alert-${messageType} text-center`} role="alert">
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
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <a href="/api/Login" className="text-decoration-none text-primary">
                        Go to Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
