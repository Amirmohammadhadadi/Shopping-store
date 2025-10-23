import mongoose from "mongoose";

const discountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "discount code is required"],
        unique: [true, "this discount code is allready exist"]
    },
    persentage: {
        type: Number,
        required: [true, "discount persentage is required"],
        min: 0,
        max: 100
    },
    expire: {
        type: Date,
        required: [true, "expire time is required"]
    },
    startTime: {
        type: Date,
        required: [true, "start  time is required"]

    }
    ,
    isActive: {
        type: Boolean,
        default: true
    },
    userUse: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: {}

    }
}, { timestamps: true })


const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema)


export default DiscountCode