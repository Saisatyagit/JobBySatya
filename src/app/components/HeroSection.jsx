"use client";
import React from "react";
import Link from "next/link";

const HeroSection = () => {
  const scrollToJobs = () => {
    const jobsSection = document.getElementById("jobs");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-light py-5 border-bottom text-center">
      <div className="container">
        <h1 className="fw-bold display-5 mb-3 text-dark">
          👋 Welcome to Jobify
        </h1>
        <p className="lead text-muted mb-2">
          Your all-in-one platform to connect developers and companies effortlessly.
        </p>
        <p className="text-muted fs-5 mb-4">
          👨‍💻 Developers: Discover opportunities that match your skills.<br />
          🏢 Companies: Find and hire the right tech talent — fast and easy.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {/* 🔽 Auto-scroll button */}
          <button onClick={scrollToJobs} className="btn btn-primary btn-lg px-4">
            🔍 Browse Jobs
          </button>

          {/* 🔗 Post Job for Companies */}
          <Link href="/">
            <button className="btn btn-success btn-lg px-4">
              📢 Post a Job
            </button>
          </Link>
        </div>

        {/* Optional Stats */}
        <div className="row text-center mt-5">
          <div className="col">
            <h4 className="fw-bold text-primary">2,000+</h4>
            <p className="text-muted">Jobs Posted</p>
          </div>
          <div className="col">
            <h4 className="fw-bold text-success">1,000+</h4>
            <p className="text-muted">Developers Hired</p>
          </div>
          <div className="col">
            <h4 className="fw-bold text-danger">300+</h4>
            <p className="text-muted">Active Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;




