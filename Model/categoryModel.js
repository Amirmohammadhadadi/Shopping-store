import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: [true, "title is allready exist"]
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },

}, { timestamps: true }
)
const Category = mongoose.model("Category", categorySchema);

export default Category;
