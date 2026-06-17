import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "title is required"]
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    min: 0,
    default: 0
  },
  weight: {
    type: Number,
    required: [true, "weight is required"],
    min: 0,
    default: 0,
  },
  image: {
    type: String,
  },
  gallery: {
    type: [String]
  },
  desc: {
    type: String
  },
  discount: {
    type: String,
    min: 0,
    max: 100,
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)


export default Product