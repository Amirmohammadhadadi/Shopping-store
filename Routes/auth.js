import express from "express"
import { checkCode, login, register } from "../Controllers/authCn.js"


const authRouter = express.Router()

authRouter.route("/").post(login)
authRouter.route("/verify-code").post(checkCode)
authRouter.route("/register").post(register)




export default authRouter