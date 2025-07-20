"use client";
import React from 'react'
import { useState } from 'react';

function Addjob() {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-Time');
  const [category, setCategory] = useState('Frontend Developer');
  const [salaryRange, setSalaryRange] = useState('');
  const [requirements, setRequirements] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const formhandler = async(e)=>{
    e.preventDefault();
    const formDetails = {jobTitle, description, companyName, location, type, category, salaryRange, requirements, companyLogo};
    console.log("formDetails", formDetails);
    const formData = new FormData();
    formData.append('jobTitle', jobTitle);
    formData.append('description', description);
    formData.append('companyName', companyName);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('category', category);
    formData.append('salaryRange', salaryRange);
    formData.append('requirements', requirements);
    formData.append('companyLogo', companyLogo);
    try {
      const response = await fetch('/api/admin/add-job', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add job');
      }

      const data = await response.json();
      console.log("Job added successfully:", data);
      alert("Job added successfully!");
      // Reset form fields
      setJobTitle('');
      setDescription('');
      setCompanyName('');
      setLocation('');
      setType('Full-Time');
      setCategory('Frontend Developer');
      setSalaryRange('');
      setRequirements('');
      setCompanyLogo(" ");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please try again.");
    }

  }

  return (
    <div>
      <form className="container my-4" onSubmit={formhandler}>
        <h1 className="text-center mb-4">Add New Job</h1>
        
        {/* Job Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Job Title</label>
          <input type="text" className="form-control" id="title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Enter job title" />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Job Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter job description"></textarea>
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input type="text" className="form-control" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter job location" />
        </div>

        {/* Job Type */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Job Type</label>
          <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Cybersecurity Specialist">Cybersecurity Specialist</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="QA / Test Engineer">QA / Test Engineer</option>
            <option value="IT Support">IT Support</option>
            <option value="Database Administrator">Database Administrator</option>
            <option value="Game Developer">Game Developer</option>
            <option value="Software Architect">Software Architect</option>
          </select>
        </div>

        {/* Salary Range */}
        <div className="mb-3">
          <label htmlFor="salaryRange" className="form-label">Salary Range</label>
          <input type="text" className="form-control" id="salaryRange" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="Enter salary range" />
        </div>

        {/* Requirements */}
        <div className="mb-3">
          <label htmlFor="requirements" className="form-label">Requirements</label>
          <textarea className="form-control" id="requirements" rows="3" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Enter job requirements"></textarea>
        </div>

        {/* Company Logo */}
        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">Company Logo (optional)</label>
          <input type="file" className="form-control" id="companyLogo"  accept='image/*' onChange={(e) => setCompanyLogo(e.target.files[0])} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Add Job</button>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <p>By adding a job, you agree to our <a href="/terms" className="text-primary">Terms of Service</a>.</p>
          <p>Need help? <a href="/contact" className="text-primary">Contact us</a>.</p>
        </div>
      </form>
    </div>
  )
}

export default Addjob;






