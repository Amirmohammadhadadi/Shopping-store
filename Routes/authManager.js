import express from "express"
import { adminLogin, adminVerify } from "../Controllers/managerAuthCn.js"


 const managerAuthRouter = express.Router()


managerAuthRouter.route("/").post(adminLogin)
managerAuthRouter.route("/check-code").post(adminVerify)



 export default managerAuthRouter