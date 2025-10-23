import express from "express"
import { checkCode, createDisCount, getAllDisCount, getOneDisCount, updataDisCount } from "../Controllers/disCountCodeCn.js"
import { isAdmin } from "../Middleware/isAdmin.js"
import { checkPermission } from "../Middleware/checkPermission.js"
import { isLogin } from "../Middleware/isLogin.js"

const discountRouter = express.Router()

discountRouter.route('/').post(isAdmin, checkPermission("discount"), createDisCount).get(isAdmin, checkPermission("discount"), getAllDisCount)
discountRouter.route("/:id").get(isAdmin, checkPermission("discount"), getOneDisCount).patch(isAdmin, checkPermission("discount"), updataDisCount)
discountRouter.route("/checkCode").post(isLogin, checkCode)