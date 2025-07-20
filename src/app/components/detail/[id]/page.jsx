"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Apply Form Component
const ApplyForm = ({ jobId, onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", resume: null });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.resume) {
      setError("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("resume", form.resume);
    data.append("jobId", jobId);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      const result = await res.json();

      if (result.alreadyApplied) {
        setAlreadyApplied(true);
      } else if (result.success) {
        setSuccess("✅ Application submitted successfully!");
        setTimeout(() => onSuccess(), 1500);
      } else {
        setError("Something went wrong.");
      }
    } catch {
      setError("Server error. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <input name="name" className="form-control" placeholder="Name" onChange={handleChange} />
      <input name="email" className="form-control" placeholder="Email" onChange={handleChange} />
      <input type="file" name="resume" className="form-control" onChange={handleChange} />
      <button className="btn btn-primary w-100">Submit</button>

      {alreadyApplied && (
        <div className="mt-3 text-center">
          <div className="alert alert-warning">You already applied for this job.</div>
          <a href="/status" className="text-primary text-decoration-underline">Go to Status Page</a>
        </div>
      )}
    </form>
  );
};

const Dynamicpage = () => {
  const [job, setJob] = useState({});
  const [similarJobs, setSimilarJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/admin/Jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (job.location) {
      const fakeSimilar = [
        { _id: "1", title: "Frontend Developer", location: "Hyderabad", salaryRange: "5-7 LPA" },
        { _id: "2", title: "React JS Engineer", location: "Bangalore", salaryRange: "8-10 LPA" },
        { _id: "3", title: "Angular Developer", location: "Chennai", salaryRange: "6-8 LPA" }
      ];
      setSimilarJobs(fakeSimilar);

      const fakeRecommended = [
        { _id: "4", title: "Full Stack Developer", location: "Remote", salaryRange: "6-9 LPA" },
        { _id: "5", title: "Software Engineer", location: "Pune", salaryRange: "7-11 LPA" },
        { _id: "6", title: "Node.js Backend Developer", location: "Mumbai", salaryRange: "8-12 LPA" }
      ];
      setRecommendedJobs(fakeRecommended);
    }
  }, [job.location]);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="container my-5 position-relative">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={job.companyLogo || "https://via.placeholder.com/60"}
                  className="rounded-circle border me-3"
                  width="60"
                  height="60"
                  alt="logo"
                />
                <div>
                  <h4 className="text-primary mb-0">{job.title}</h4>
                  <small className="text-muted">{job.companyName}</small>
                  {job.postedAt && (
                    <div className="text-muted small">Posted on: {new Date(job.postedAt).toLocaleDateString()}</div>
                  )}
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-secondary">{job.location}</span>
                <span className="badge bg-success">₹{job.salaryRange}</span>
                <span className="badge bg-info">{job.type}</span>
              </div>

              <p className="text-muted">{job.description}</p>

              <h6>Requirements</h6>
              <ul className="text-muted">
                {(Array.isArray(job.requirements) ? job.requirements : job.requirements?.split(","))?.map((r, i) => (
                  <li key={i}>{r.trim()}</li>
                ))}
              </ul>

              {job.location && (
                <iframe
                  className="mt-3"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(job.location)}&output=embed`}
                  height="200"
                  width="100%"
                  style={{ border: "0" }}
                  allowFullScreen
                />
              )}

              <button className="btn btn-primary btn-lg w-100 mt-4" onClick={() => setShowForm(true)}>
                Apply Now
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card p-3 mb-4">
              <h5>Recommended Jobs</h5>
              <ul className="list-unstyled recommended-jobs-box">
                {recommendedJobs.map((item) => (
                  <li key={item._id} onClick={() => router.push(`/jobs/${item._id}`)}>
                    <strong>{item.title}</strong><br />
                    <small>{item.location} • ₹{item.salaryRange}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-3">
              <h5>Similar Jobs</h5>
              <ul className="list-unstyled similar-jobs-box">
                {similarJobs.map((item) => (
                  <li key={item._id} onClick={() => router.push(`/jobs/${item._id}`)}>
                    <strong>{item.title}</strong><br />
                    <small>{item.location} • ₹{item.salaryRange}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center apply-modal-bg"
            style={{ zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card p-4 shadow-lg"
              style={{ maxWidth: "500px", width: "100%", borderRadius: "1rem" }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Apply for {job.title}</h5>
                <button className="btn-close" onClick={() => setShowForm(false)} />
              </div>
              <ApplyForm jobId={id} onSuccess={() => router.push("/status")} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        body {
          background: linear-gradient(to top left, #f9fafb, #f0f4f8);
        }
        .apply-modal-bg {
          background: linear-gradient(to bottom right, #dbeafe, #fce7f3, #e0f2fe);
          backdrop-filter: blur(8px);
        }
        .similar-jobs-box li,
        .recommended-jobs-box li {
          padding: 12px;
          margin-bottom: 8px;
          background: #f8fafc;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .similar-jobs-box li:hover,
        .recommended-jobs-box li:hover {
          background: #e0f2fe;
          color: #0c4a6e;
        }
      `}</style>
    </div>
  );
};

export default Dynamicpage;




