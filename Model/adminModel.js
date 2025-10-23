import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
    unique: [true, "phone number is allready exist"]
  },
  fullName: {
    type: String,
    required: [true, "full name is required"]
  },
  permission: {
    type: [String],
    enum: ["product", "user", "discount", "ticket", "order", "category", "comment", "address", "cart", "admin"],
    default: []
  },
  role: {
    type: String,
    enum: ["admin", 'superAdmin'],
    default: "admin"
  },
  profile: {
    type: String
  }
}, { timestamps: true })

adminSchema.pre("save", function (next) {
  if (this.role === "superAdmin" && this.permission.length === 0) {
    this.permission = ["product", "user", "discount", "ticket", "order", "category", "comment", "address", "cart", "admin"]

  }
  next()
})


const Admin = mongoose.model("Admin", adminSchema)

export default Admin