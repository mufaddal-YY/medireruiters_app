import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },

  qualification: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  equipment: {
    type: String,
    required: true,
  },

  opd: {
    type: String,
    required: true,
  },

  occupancy: {
    type: String,
    required: true,
  },

  salary: {
    type: String,
    required: true,
  },

  holidays: {
    type: String,
    required: true,
  },

  conference: {
    type: String,
    required: true,
  },

  accommodation: {
    type: String,
    required: true,
  },

  lang: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model("Job", JobSchema);

export default JobModel;
