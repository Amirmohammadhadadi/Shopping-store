import express from "express"
import { createProduct, getAllProduct, getoneProduct, updateProduct } from "../Controllers/productCn.js"
import { isAdmin } from "../Middleware/isAdmin.js"
import { checkPermission } from "../Middleware/checkPermission.js"
import upload from "../Utils/Utils/uploadFile.js"

const productRouter = express.Router()

productRouter.route("/").get(getAllProduct).post(isAdmin, checkPermission("product"), upload.single("file"), createProduct)
productRouter.route("/:id").get(getoneProduct).patch(isAdmin, checkPermission("product"), updateProduct)