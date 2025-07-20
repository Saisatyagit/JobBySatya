"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Modified to send mail via /api/status
  const updateStatus = async (applicationId, newStatus) => {
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, newStatus }),
      });

      const result = await res.json();
      console.log(" Status update response:", result);
      fetchApplications(); // Refresh data
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-center text-primary fw-bold mb-4">
        Manage Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-muted text-center">No applications found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {applications.map((app) => (
            <div key={app._id} className="col">
              <div className="card h-100 border-secondary shadow-sm">
                <div className="card-header bg-secondary text-white fw-semibold">
                  {app.jobId?.title || "Unknown Title"}
                </div>
                <div className="card-body">
                  <p><strong>Company:</strong> {app.jobId?.companyName}</p>
                  <p><strong>Salary:</strong> {app.jobId?.salaryRange}</p>
                  <hr />
                  <p><strong>Applicant:</strong> {app.name}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${
                      app.status === "Accepted" ? "bg-success" :
                      app.status === "Rejected" ? "bg-danger" :
                      app.status === "Reviewed" ? "bg-warning text-dark" :
                      "bg-secondary"
                    }`}>
                      {app.status}
                    </span>
                  </p>

                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {["Pending", "Reviewed", "Accepted", "Rejected"].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(app._id, status)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Set as {status}
                      </button>
                    ))}

                    {app.resume && (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        View Resume
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



