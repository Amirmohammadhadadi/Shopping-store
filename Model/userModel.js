import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
    unique: [true, "phone number is allready exist"],
  },
  fullName: {
    type: String
  },
  popularProduct: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    default: []
  },
  lastSeenProduct: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    default: []
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User