"use client";
import React, { useEffect, useState } from "react";

const Filter = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState({ location: "", type: "" });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("/api/admin/add-job"); // Update to your actual API route
    const data = await res.json();
    setJobs(data);
    setFilteredJobs(data);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);

    const filtered = jobs.filter((job) => {
      return (
        (newFilter.location === "" || job.location === newFilter.location) &&
        (newFilter.type === "" || job.type === newFilter.type)
      );
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Filter Jobs</h1>
      <div className="flex gap-4 mb-6">
        <select name="location" onChange={handleFilterChange} className="p-2 border">
          <option value="">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Remote">Remote</option>
        </select>

        <select name="type" onChange={handleFilterChange} className="p-2 border">
          <option value="">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location} - {job.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
