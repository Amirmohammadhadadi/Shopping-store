import express from "express"
import { createCategory, getAllCategory, updateCategory } from "../Controllers/categoryCn.js"
import { isAdmin } from "../Middleware/isSuperAdmin.js"
import upload from "../Utils/uploadFile.js"
import { checkPermission } from "../Middleware/checkPermission.js"



const categoryRouter = express.Router()

categoryRouter.route("/").get(getAllCategory).post(isAdmin, checkPermissin("category"), upload.single("file"), createCategory)
categoryRouter.route("/:id").patch(isAdmin, checkPermissin("category"), updateCategory)




export default categoryRouter
