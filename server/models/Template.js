import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String
});

export default mongoose.model("Template", templateSchema);