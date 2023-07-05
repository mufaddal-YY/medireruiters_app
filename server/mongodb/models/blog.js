import mongoose, { Schema } from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cover: {
    data: Buffer, // Image data stored as a Buffer
    contentType: String, // MIME type of the image
  },
  publish: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    required: true,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: [String],
  },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const blogModel = mongoose.model("Blog", BlogSchema);

export default blogModel;
