import express from "express"
import { isLogin } from "../Middleware/isLogin"
import { isAdmin } from "../Middleware/isSuperAdmin"
import { checkPermissin } from "../Middleware/checkPermission.js"
import { createComment, getAllComment, getOneComment, updateComment, deleteComment } from "../Controllers/coomentCn"


const commentRouter = express.Router()

commentRouter.route("/").get(isLogin, getAllComment).post(isLogin, createComment)
commentRouter.route("/:id").get(isLogin, getOneComment).patch(isAdmin, checkPermissin("comment"), updateComment).delete(isAdmin, checkPermissin("comment"), deleteComment)

export default commentRouter
