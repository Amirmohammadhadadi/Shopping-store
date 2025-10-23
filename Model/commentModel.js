import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"]
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "product is required"]
  },
  desc: {
    type: String,
    required: [true, "desc is required"]
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});



const Comment = mongoose.model("Comment", commentSchema)
export default Comment