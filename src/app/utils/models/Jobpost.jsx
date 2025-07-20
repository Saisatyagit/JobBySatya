// /models/JobPost.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
    default: "Full-Time",
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Frontend Developer", "Backend Developer", "Full Stack Developer",
      "DevOps Engineer", "Mobile App Developer", "UI/UX Designer",
      "Data Scientist", "Data Analyst", "Machine Learning Engineer",
      "Cybersecurity Specialist", "Cloud Engineer", "QA / Test Engineer",
      "IT Support", "Database Administrator", "Game Developer",
      "Software Architect",
    ],
  },
  salaryRange: { type: String, required: true },
  requirements: { type: String, required: true },
  companyLogo: { type: String },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Apply" }],
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.models.JobPost || mongoose.model("JobPost", JobSchema);










