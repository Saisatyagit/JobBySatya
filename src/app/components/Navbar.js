"use client";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navbarBgColor = "#111111";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: navbarBgColor }}
    >
      <div className="container-fluid px-3">
        {/* Logo */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/uploads/jobify (1).png"
            alt="Logo"
            width="60"
            height="auto"
            className="shadow-sm"
            style={{
              objectFit: "contain",
              backgroundColor: navbarBgColor,
            }}
          />
        </Link>

        {/* Hamburger Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Links */}
        <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}>
          <div className="navbar-nav ms-auto text-center gap-2 mt-3 mt-lg-0">
            <Link href="/resume-builder" className="nav-link text-white fs-5 fw-bold">
              Resume Builder
            </Link>
            <Link href="/status" className="nav-link text-white fs-5 fw-bold">
              Job Status
            </Link>
            <Link href="/profile" className="nav-link text-white fs-5 fw-bold">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
















