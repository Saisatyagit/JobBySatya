import React from "react";

function Footer() {
  return (
    <div style={{ background: "#111", color: "#fff", padding: "20px 40px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // makes it responsive
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Quick Links */}
        <div style={{ flex: "1 1 200px" }}>
          <h3>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/jobs" style={linkStyle}>Jobs</a></li>
            <li><a href="/apply" style={linkStyle}>Apply</a></li>
            <li><a href="/profile" style={linkStyle}>Profile</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div style={{ flex: "1 1 200px" }}>
          <h3>Resources</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><a href="/resume-builder" style={linkStyle}>Resume Builder</a></li>
            <li><a href="/ats-checker" style={linkStyle}>ATS Checker</a></li>
            <li><a href="/guides" style={linkStyle}>Guides</a></li>
            <li><a href="/contact" style={linkStyle}>Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div style={{ flex: "1 1 200px" }}>
          <h3>Contact</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <a href="mailto:support@jobify.com" style={linkStyle}>
                support@jobify.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" style={linkStyle}>
                +91 98765 43210
              </a>
            </li>
            <li>Hyderabad, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "14px",
          borderTop: "1px solid #333",
          paddingTop: "10px",
        }}
      >
        © {new Date().getFullYear()} Jobify · All rights reserved.
      </div>
    </div>
  );
}

// Simple hover effect for links
const linkStyle = {
  color: "#aaa",
  textDecoration: "none",
  transition: "color 0.3s",
};
linkStyle[":hover"] = { color: "#4da6ff" };

export default Footer;
