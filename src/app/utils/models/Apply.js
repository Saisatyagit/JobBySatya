import mongoose from "mongoose";


const ApplySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
  apply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apply" // Reference to the Apply model
  }
});


export default mongoose.models.Apply || mongoose.model("Apply", ApplySchema);








