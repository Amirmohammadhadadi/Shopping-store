
import express from "express"
import { isLogin } from "../Middleware/isLogin"
import { createAddress, getAllAddress, updateAddress } from "../Controllers/addressCn"


const addressRouter = express.Router()

addressRouter.route("/").post(isLogin,createAddress).get(isLogin,getAllAddress)
addressRouter.route("/:id").patch(isLogin,updateAddress)




export default addressRouter
