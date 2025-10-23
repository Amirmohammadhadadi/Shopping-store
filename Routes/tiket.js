import express from "express"
import { isLogin } from "../Middleware/isLogin.js"
import { createTiket, getAllTiket, getOneTiket, updataTiket } from "../Controllers/TiketCn.js"


const tiketRouter = express.Router()
tiketRouter.route("/").post(isLogin, createTiket).get(isLogin, getAllTiket)
tiketRouter.route("/:id").patch(isLogin, updataTiket).get(isLogin, getOneTiket)

