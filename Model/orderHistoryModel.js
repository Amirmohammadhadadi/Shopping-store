import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "pending",

  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  address: {
    type: String
  },
  products: {
    type: [
      {
        quantity: {
          type: String
        },
        name: {
          type: String
        },
        price: {
          type: Number
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ]
  }
}, { timestamps: true })

const orderHistory = mongoose.model("orderHistory", orderHistorySchema)

export default orderHistory