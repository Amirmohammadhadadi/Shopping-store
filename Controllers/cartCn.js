import { catchAsync, HandleERROR } from "vanta-api";
import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";

export const addCart = catchAsync(async (req, res, next) => {
    const { id } = req
    const { productId } = req?.body
    const cart = await Cart.findOne({ userId: id })
    const product = cart.products.find(e => e.id == productId)
    if (product) {
        product.quantity += 1
    } else {
        const newProduct = await Product.findOne({ _id: productId })
        cart.products.push([{ name: newProduct.title, price: newProduct.price, productId, quantity: 1 }])
    }
    await cart.save()
    return res.status(200).json({
        success: true,
        message: "create cart success",
        cart
    })

})


export const removeCart = catchAsync(async (req, res, next) => {
    const { id } = req
    const { productId } = req?.body
    const cart = await Cart.findOne({ userId: id })
    cart?.products = cart?.products?.filter((item) => {
        if (item?.id == productId) {
            item?.quantity = item?.quantity - 1
            if (item?.quantity == 0) {
                return false
            }

        }
        return item
    })

    await cart.save()
    return res.status(200).json({
        success: true,
        message: "remove cart success",
        cart
    })
})


export const userCart = catchAsync(async (req, res, next) => {
    const { id } = req
    const userCart = await Cart.findOne({ userId: id })
    if (userCart) {
        return res.status(200).json({
            success: true,
            message: "find cart success",
            userCart
        })
    } else {
        return next(new HandleERROR("cart not a found", 400))
    }


})


export const clearCart = catchAsync(async (req, res, next) => {
    const { id } = req
    const cart = await Cart.findOne({ userId: id })
    if (cart) {
        const newCart = await Cart.create({
            userId: id,
            totalPrice: 0,
            products: [],
            disConut: 0,
        })
        return res.status(200).json({
            success: true,
            message: "clear cart is successfuly",
            newCart
        })
    } else {
        return next(new HandleERROR("cart not a found", 400))
    }


})