import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
},{timestamps:true});


const Address = mongoose.model("Address" , addressSchema)

export default Address
