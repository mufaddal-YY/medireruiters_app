import { Schema, model, models } from "mongoose";

const JobApplicationSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  job: { type: Schema.Types.ObjectId, ref: "Job" },
});

const JobApplication = models.JobApplication || model("JobApplication", JobApplicationSchema);

export default JobApplication;
