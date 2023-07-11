import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
});

const JobApplicationModel = mongoose.model("JobApplication", JobApplicationSchema);
// const JobApplication = models.JobApplication || model("JobApplication", JobApplicationSchema);

export default JobApplicationModel;
