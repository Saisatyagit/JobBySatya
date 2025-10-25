"use client";
import React, { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", education: "", skills: "",
    projects: "", experience: "", summary: "", certifications: "",
    github: "", linkedin: "", portfolio: "", profileImage: "", jobDescription: ""
  });
  const [template, setTemplate] = useState("template1");
  const [darkMode, setDarkMode] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  const [atsScore, setAtsScore] = useState(0);
  const [showAts, setShowAts] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set(Object.keys(formData)));
  const [loadingSummary, setLoadingSummary] = useState(false);
  const previewRef = useRef(null);

  const templates = ["template1", "template2", "template3", "template4", "template5"];
  const backgroundColors = ["white", "#f5f5f5", "#e0f7fa", "#fff3e0", "#f3e5f5", "#ede7f6"];

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
    setAtsScore(calculateAtsScore());
  }, [formData]);

  useEffect(() => {
    setBgColor(darkMode ? "#1e1e1e" : "white");
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, [name]: reader.result }));
      if (files[0]) reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleSectionVisibility = (field) => {
    const updated = new Set(visibleSections);
    if (updated.has(field)) updated.delete(field);
    else updated.add(field);
    setVisibleSections(updated);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Name, Email, and Phone are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const calculateAtsScore = () => {
    let score = 0;
    const keywords = ['JavaScript', 'React', 'Node', 'HTML', 'CSS', 'MongoDB', 'Git'];
    const fields = ['summary', 'skills', 'projects', 'experience', 'certifications'];
    fields.forEach((field) => {
      if (formData[field]?.length > 20) score += 10;
    });
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "i");
      if (regex.test(formData.skills) || regex.test(formData.summary)) score += 5;
    });
    return Math.min(score, 100);
  };

  const handleDownload = async () => {
    if (!validateForm()) return;
    setShowAts(false);
    const html2pdf = (await import("html2pdf.js")).default;
    const opt = {
      margin: 0,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] }
    };
    await html2pdf().set(opt).from(previewRef.current).save();
    setTimeout(() => setShowAts(true), 1000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form?")) {
      const emptyForm = Object.fromEntries(Object.keys(formData).map(key => [key, ""]));
      setFormData(emptyForm);
      localStorage.removeItem("resumeData");
      setVisibleSections(new Set(Object.keys(formData)));
    }
  };

  const generateSummary = async () => {
    try {
      setLoadingSummary(true);
      const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: formData.skills, projects: formData.projects }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, summary: data.summary }));
      } else {
        alert("Error generating summary.");
      }
    } catch (err) {
      alert("Error generating summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const renderFormatted = (text) =>
    text?.split("\n").map((line, i) => (
      <div key={i} style={{ marginBottom: "4px", whiteSpace: "pre-wrap" }}>
        {line.trim()}
      </div>
    ));

  const renderSection = (title, field) => {
    const content = formData[field];
    if (!visibleSections.has(field) || !content?.trim()) return null;
    return (
      <div className="mb-2">
        <strong>{title}:</strong>
        <div>{renderFormatted(content)}</div>
        <hr />
      </div>
    );
  };

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ padding: "40px", minHeight: "100vh" }}>
      <div className="container">
        <h2 className="text-center mb-4">📄 Resume Builder</h2>

        <div className="row">
          <div className="col-md-6">
            {Object.keys(formData).filter(f => f !== "profileImage").map((field) => (
              <div className="mb-2" key={field}>
                <label className="form-label text-capitalize">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={visibleSections.has(field)}
                    onChange={() => toggleSectionVisibility(field)}
                  />
                  {field}
                </label>
                <textarea
                  name={field}
                  className="form-control"
                  onChange={handleChange}
                  value={formData[field] || ""}
                  rows={field === 'summary' || field === 'experience' || field === 'projects' ? 3 : 1}
                />
                {field === "summary" && (
                  <button onClick={generateSummary} className="btn btn-sm btn-outline-primary mt-1" disabled={loadingSummary}>
                    {loadingSummary ? "Generating..." : "✨ Auto Generate Summary"}
                  </button>
                )}
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input type="file" accept="image/*" name="profileImage" className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-3 d-flex flex-wrap gap-2">
              <label className="form-label me-2">🎨 Background:</label>
              {backgroundColors.map((color, i) => (
                <button key={i} onClick={() => setBgColor(color)} className="btn btn-sm" style={{ backgroundColor: color, width: 30, height: 30 }} />
              ))}
            </div>

            <div className="mb-3 d-flex flex-wrap gap-2">
              <label className="form-label me-2">🖋 Template:</label>
              {templates.map((t, i) => (
                <button key={i} onClick={() => setTemplate(t)} className="btn btn-outline-secondary btn-sm">
                  {t}
                </button>
              ))}
            </div>

            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" onChange={() => setDarkMode(!darkMode)} />
              <label className="form-check-label">🌗 Dark Mode</label>
            </div>
          </div>

          <div className="col-md-6">
            <div ref={previewRef} className={`p-4 rounded ${template}`} style={{ backgroundColor: bgColor, border: "1px solid #ccc", minHeight: "1122px" }}>
              {showAts && <div><strong>ATS Score:</strong> {atsScore} / 100</div>}
              {formData.profileImage && <div className="text-center"><img src={formData.profileImage} alt="Profile" style={{ width: "80px", borderRadius: "50%" }} /></div>}
              <h4 className="text-center mt-2">{formData.name}</h4>
              <p className="text-center">{formData.email} | {formData.phone}</p>
              <p className="text-center">
                {formData.github && <span>{formData.github} | </span>}
                {formData.linkedin && <span>{formData.linkedin} | </span>}
                {formData.portfolio && <span>{formData.portfolio}</span>}
              </p>
              <hr />
              {renderSection("Summary", "summary")}
              {renderSection("Education", "education")}
              {renderSection("Skills", "skills")}
              {renderSection("Projects", "projects")}
              {renderSection("Experience", "experience")}
              {renderSection("Certifications", "certifications")}
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button onClick={handleDownload} className="btn btn-primary me-2">⬇️ Download PDF</button>
          <button onClick={handleReset} className="btn btn-danger">🗑️ Reset</button>
        </div>

        <style jsx global>{`
          .template1 { font-family: Arial, sans-serif; }
          .template2 { font-family: Georgia, serif; color: #3e3e3e; }
          .template3 { font-family: 'Courier New', monospace; font-size: 13px; }
          .template4 { font-family: 'Segoe UI', Tahoma; line-height: 1.4; }
          .template5 { font-family: Verdana; font-size: 14px; border-left: 5px solid #007bff; padding-left: 15px; }
        `}</style>
      </div>
    </div>
  );
}
