"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

function JobCollections() {
  const [jobCollections, setJobCollections] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ location: "", type: "", search: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`api/admin/add-job`);
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      const jobs = data.jobs || data;

      setJobCollections(jobs);
      setFilteredJobs(jobs);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Fuzzy Search
  useEffect(() => {
    const fuse = new Fuse(jobCollections, {
      keys: ["title", "companyName"],
      threshold: 0.3,
    });

    let results = filters.search
      ? fuse.search(filters.search).map((r) => r.item)
      : [...jobCollections];

    // Apply other filters
    results = results.filter((job) => {
      const matchesLocation =
        !filters.location ||
        job.location?.toLowerCase() === filters.location.toLowerCase();
      const matchesType =
        !filters.type ||
        job.type?.toLowerCase() === filters.type.toLowerCase();
      return matchesLocation && matchesType;
    });

    // Sorting
    results.sort((a, b) => {
      const dateA = new Date(a.postedAt);
      const dateB = new Date(b.postedAt);
      const salaryA = parseInt(a.salaryRange || "0");
      const salaryB = parseInt(b.salaryRange || "0");

      switch (sortOption) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "highest":
          return salaryB - salaryA;
        case "lowest":
          return salaryA - salaryB;
        default:
          return 0;
      }
    });

    setFilteredJobs(results);
  }, [filters, jobCollections, sortOption]);

  const handleReset = () => {
    setFilters({ location: "", type: "", search: "" });
  };

  const handleSaveJob = (job) => {
    alert(`✅ Job "${job.title}" saved! (hook this to DB if needed)`);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center fw-bold">🚀 Latest Job Listings</h1>

      {/* 🔍 Search + Filters + Sort */}
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search jobs or company..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
        <div className="col-auto mb-2">
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">🆕 Newest</option>
            <option value="oldest">📜 Oldest</option>
            <option value="highest">💰 Highest Salary</option>
            <option value="lowest">🔻 Lowest Salary</option>
          </select>
        </div>
        <div className="col-auto mb-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide Filters ❌" : "Show Filters 🎯"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="row">
        {showFilters && (
          <div className="col-md-3 mb-4">
            <div className="bg-light p-3 rounded border">
              <h5 className="mb-3 text-center">Filter Jobs</h5>

              <select
                className="form-select mb-3"
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
              >
                <option value="">🌍 All Locations</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Remote">Remote</option>
              </select>

              <select
                className="form-select mb-3"
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <option value="">💼 All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>

              <button className="btn btn-secondary w-100" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Jobs */}
        <div className={showFilters ? "col-md-9" : "col-12"}>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="row">
              {filteredJobs.length === 0 ? (
                <p className="text-muted">No jobs match your filters.</p>
              ) : (
                filteredJobs.map((job) => {
                  const logoSrc = job?.companyLogo?.startsWith("/uploads")
                    ? job.companyLogo
                    : "/default-logo.png";

                  const isNew =
                    new Date() - new Date(job?.postedAt) <
                    3 * 24 * 60 * 60 * 1000;

                  return (
                    <div key={job._id} className="col-md-6 col-lg-4 mb-4">
                      <div
                        className={`card h-100 shadow-sm border-0 ${
                          job.featured ? "border border-warning" : ""
                        }`}
                        style={{
                          backgroundColor: job.featured ? "#fffbe6" : "#f8f9fa",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          src={logoSrc}
                          alt={job?.companyName}
                          className="card-img-top p-3"
                          style={{ height: "100px", objectFit: "contain" }}
                        />
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="card-title text-primary mb-0">
                              {job?.title}
                            </h5>
                            <div>
                              {isNew && (
                                <span className="badge bg-success me-1">New</span>
                              )}
                              {job.featured && (
                                <span className="badge bg-warning text-dark">⭐ Featured</span>
                              )}
                            </div>
                          </div>

                          <p className="card-text text-muted">
                            {job?.description?.slice(0, 100)}...
                          </p>

                          <ul className="list-unstyled small mb-3">
                            <li>
                              <i className="bi bi-geo-alt-fill text-danger me-1"></i>{" "}
                              <strong>Location:</strong> {job?.location}
                            </li>
                            <li>
                              <i className="bi bi-currency-rupee text-success me-1"></i>{" "}
                              <strong>Salary:</strong> ₹{job?.salaryRange}
                            </li>
                            <li>
                              <i className="bi bi-briefcase-fill text-primary me-1"></i>{" "}
                              <strong>Type:</strong> {job?.type}
                            </li>
                            <li>
                              <i className="bi bi-calendar-check me-1"></i>{" "}
                              <strong>Posted:</strong>{" "}
                              {new Date(job?.postedAt).toLocaleDateString()}
                            </li>
                          </ul>

                          <div className="d-flex gap-2">
                            <Link href={`/components/detail/${job._id}`} className="w-100">
                              <button className="btn btn-outline-primary btn-sm w-100">
                                View Details
                              </button>
                            </Link>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleSaveJob(job)}
                            >
                              ❤️ Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCollections;







