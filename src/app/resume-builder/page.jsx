"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", education: "", skills: "",
    projects: "", experience: "", summary: "", github: "",
    linkedin: "", portfolio: "", profileImage: "", jobDescription: ""
  });

  const [editField, setEditField] = useState(null);
  const [template, setTemplate] = useState("classic");
  const [darkMode, setDarkMode] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  const [atsScore, setAtsScore] = useState(0);
  const [showAts, setShowAts] = useState(true);
  const [excludedSections, setExcludedSections] = useState([]);
  const previewRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      setBgColor("#1e1e1e");
    } else {
      setBgColor("white");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

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
    const fields = ['summary', 'skills', 'projects', 'experience'];
    fields.forEach((field) => {
      if (formData[field]?.length > 20) score += 10;
    });
    keywords.forEach((kw) => {
      if (formData.skills.includes(kw) || formData.summary.includes(kw)) score += 5;
    });
    return Math.min(score, 100);
  };

  useEffect(() => {
    setAtsScore(calculateAtsScore());
  }, [formData]);

  const handleDownload = async () => {
    if (!validateForm()) return;
    setShowAts(false);
    const html2pdf = (await import("html2pdf.js")).default;
    const opt = {
      margin: 0,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };
    await html2pdf().set(opt).from(previewRef.current).save();
    setTimeout(() => setShowAts(true), 1000);
  };

  const handleReset = () => {
    const emptyForm = Object.fromEntries(Object.keys(formData).map(key => [key, ""]));
    setFormData(emptyForm);
    localStorage.removeItem("resumeData");
  };

  const toggleSection = (section) => {
    setExcludedSections((prev) =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const fontClass = {
    classic: "",
    modern: "fst-italic text-secondary",
    elegant: "fw-light fst-italic",
    compact: "small",
    bold: "fw-bold fs-6",
    creative: "text-primary fw-semibold border-start border-5 ps-3",
    clean: "text-dark fw-normal"
  }[template] || "";

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ padding: "40px", minHeight: "100vh" }}>
      <div className="container">
        <h2 className="text-center mb-4">📄 Resume Builder</h2>

        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="btn btn-outline-secondary">
            {darkMode ? <Sun color="white" /> : <Moon color="black" />}
          </button>

          <select value={template} onChange={(e) => setTemplate(e.target.value)} className="form-select w-auto">
            {["classic", "modern", "elegant", "compact", "bold", "creative", "clean"].map((style) => (
              <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
            ))}
          </select>

          <select value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="form-select w-auto">
            {[{ name: "White", value: "white" }, { name: "Light Gray", value: "#f8f9fa" }, { name: "Cool Blue", value: "#f0f4f8" }, { name: "Soft Yellow", value: "#fffbe6" }].map((color, i) => (
              <option key={i} value={color.value}>{color.name}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-6">
            {["name", "email", "phone", "education", "skills", "projects", "experience", "summary", "github", "linkedin", "portfolio"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  className="form-control"
                  onChange={handleChange}
                  value={formData[field] || ""}
                />
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input type="file" name="profileImage" className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Exclude Sections</label>
              {["summary", "education", "skills", "projects", "experience"].map((section) => (
                <div key={section}>
                  <input
                    type="checkbox"
                    checked={!excludedSections.includes(section)}
                    onChange={() => toggleSection(section)}
                  /> <label className="ms-1 text-capitalize">{section}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={`col-md-6 ${fontClass}`} ref={previewRef} style={{ border: "1px solid #dee2e6", padding: "40px", borderRadius: "10px", backgroundColor: bgColor, minHeight: "1122px", width: "794px", color: darkMode ? "white" : "black" }}>
            {showAts && <div className="mb-3"><strong>ATS Score:</strong> {atsScore} / 100</div>}
            <div className="d-flex flex-column align-items-center gap-3 mb-3">
              {formData.profileImage && <img src={formData.profileImage} alt="Profile" className="rounded-circle" style={{ width: "80px" }} />}
              <div className="text-center">
                <h4>{formData.name}</h4>
                <p className="small mb-1">📧 {formData.email} | 📞 {formData.phone}</p>
                <p className="small mb-0">
                  {formData.github && <span>{formData.github} | </span>}
                  {formData.linkedin && <span>{formData.linkedin} | </span>}
                  {formData.portfolio && <span>{formData.portfolio}</span>}
                </p>
              </div>
            </div>
            {!excludedSections.includes("summary") && <><hr /><div><strong>Summary:</strong> {formData.summary}</div></>}
            {!excludedSections.includes("education") && <><hr /><div><strong>Education:</strong> {formData.education}</div></>}
            {!excludedSections.includes("skills") && <><hr /><div><strong>Skills:</strong> {formData.skills}</div></>}
            {!excludedSections.includes("projects") && <><hr /><div><strong>Projects:</strong> {formData.projects}</div></>}
            {!excludedSections.includes("experience") && <><hr /><div><strong>Experience:</strong> {formData.experience}</div></>}
          </div>
        </div>

        <div className="text-center mt-4 d-flex justify-content-center gap-3">
          <button onClick={handleDownload} className="btn btn-primary">⬇️ Download PDF</button>
          <button onClick={handleReset} className="btn btn-danger">🗑️ Reset Form</button>
        </div>

        <style jsx global>{`
          @media print {
            .page-break {
              page-break-after: always;
            }
          }
        `}</style>
      </div>
    </div>
  );
}






























// (Remaining components unchanged: Input, TextArea, Section, etc.)






