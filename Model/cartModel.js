import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
      unique: [true, "this cart is allready exist"],
    },
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    products: {
      type: [
        {
          quantity: {
            type: Number,
          },
          name: {
            type: String,
          },
          price: {
            type: Number,
          },
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        },
      ],
      default: []
    },
    disConut: {

      type: {
        code: { type: String },
        percent: { type: Number, min: 0, max: 100 }
      }

    }
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.totalPrice = 0;
  if (this.products && this.products.length) {
    this.products.forEach((e) => {
      this.totalPrice += e.quantity * e.price;
    });
  }
  if (this.disConut.code) {
    this.totalPrice = this.totalPrice * ((100 - this.disConut.percent) / 100)
  }
  next();
});

cartSchema.pre("findOneAndUpdate", function (next) {
  this.totalPrice = 0;
  if (this.products && this.products.length) {
    this.products.forEach((e) => {
      this.totalPrice += e.quantity * e.price;
    });
  }
  if (this.disConut.code) {
    this.totalPrice = this.totalPrice * ((100 - this.disConut.percent) / 100)
  }
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
