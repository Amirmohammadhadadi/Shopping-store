import express from "express"
import { isLogin } from "../Middleware/isLogin"
import { changeStatus, createOrder, getAll, getOneOrder } from "../Controllers/orderHistoryCn"

const orderRouter = express.Router()

orderRouter.route("/").post(isLogin, createOrder).get(isLogin, getAll)
orderRouter.route('/change-status').post(isLogin, changeStatus)
orderRouter.route('/:id').get(isLogin, getOneOrder)