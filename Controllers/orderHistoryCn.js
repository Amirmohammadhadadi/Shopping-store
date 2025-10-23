import mongoose from "mongoose";
import { catchAsync } from "vanta-api";
import Cart from "../Model/cartModel";

export const createOrder = catchAsync(async (req, res, next) => {
    const session = await mongoose.startSession()
    return session()
        .withTransaction(async () => {
            const { decs } = req?.body
            const { id } = req
            const cart = await Cart.findOne({ userId: id })
            totalPrice = cart?.totalPrice


        })

})

export const getAll = catchAsync(async (req, res, next) => {

})

export const changeStatus = catchAsync(async (req, res, next) => {

})

export const getOneOrder = catchAsync(async (req, res, next) => {

})
