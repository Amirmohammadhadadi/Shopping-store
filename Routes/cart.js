import express from "express"
import { isLogin } from "../Middleware/isLogin"
import { addCart, clearCart, removeCart, userCart } from "../Controllers/cartCn.js"

const cartRoter = express.Router()

cartRoter.route('/').post(isLogin, addCart).patch(isLogin, removeCart).get(isLogin, userCart).delete(isLogin, clearCart)


export default cartRoter