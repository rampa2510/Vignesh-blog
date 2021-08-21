import mongoose from "mongoose";
import IBlog from "./interface/Blog";

const BlogSchema = new mongoose.Schema({
  html: String,
  createdAt: { type: Date, default: Date.now },
  author: { type: String, default: "Vignesh Nayak" },
  updatedAt: Date,
  isDeleted: { type: Boolean, default: false },
  blogPhotoUrl: String,
  description: String,
  title: String,
});

export default mongoose.model<IBlog>("blog", BlogSchema);
