// TOP OF FILE
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const res = await fetch(`/api/status?email=${email}`);
    const data = await res.json();
    setApplications(data.applications || []);
  };

  return (
    <div className="min-h-screen bg-light py-5 px-3">
      <div className="container mx-auto">
        <div className="bg-white shadow rounded p-4 mb-5 border border-secondary">
          <h2 className="text-center text-primary fs-3 fw-bold mb-3">
            Job Application Status Tracker
          </h2>

          <div className="row g-2 justify-content-center mb-4">
            <div className="col-md-6">
              <input
                type="email"
                className="form-control form-control-lg border border-primary shadow-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={fetchApplications}
              >
                Search
              </button>
            </div>
          </div>

          {applications.length === 0 ? (
            <p className="text-center text-muted">No applications found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {applications.map((app, index) => (
                <div className="col" key={index}>
                  <div className="card border-primary h-100 shadow-sm">
                    <div className="card-header bg-primary text-white fw-semibold">
                      {app.jobId.title}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-secondary">{app.jobId.companyName}</h5>
                      <p className="card-text"><strong>Salary:</strong> {app.jobId.salaryRange}</p>
                      <hr />
                      <p className="mb-1"><strong>Name:</strong> {app.name}</p>
                      <p className="mb-2"><strong>Email:</strong> {app.email}</p>

                      <span className={`badge mb-2 ${
                        app.status === "Accepted" ? "bg-success" :
                        app.status === "Rejected" ? "bg-danger" :
                        app.status === "Reviewed" ? "bg-warning text-dark" :
                        "bg-secondary"
                      }`}>
                        {app.status}
                      </span>

                      {app.resume && (
                        <div className="mt-3">
                          <a
                            href={app.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





