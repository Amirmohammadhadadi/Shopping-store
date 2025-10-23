import express from "express"
import { isAdmin } from "../Middleware/isAdmin.js"
import { checkPermission } from "../Middleware/checkPermission.js"
import { isLogin } from "../Middleware/isLogin.js"
import { getAllUser, getOneUser, updateUser } from "../Controllers/userCn.js"



const userRouter = express.Router()


userRouter.route("/").get(isAdmin, checkPermission("user"), getAllUser)
userRouter.route("/:id").get(isLogin, getOneUser).patch(isLogin, updateUser)


export default userRouter