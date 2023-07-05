import mongoose from "mongoose";

const DatabaseSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  hrName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DatabaseModel = mongoose.model("Database", DatabaseSchema);

export default DatabaseModel;
