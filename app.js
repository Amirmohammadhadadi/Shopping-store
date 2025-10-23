import express from "express"
import morgan from "morgan"
import cors from "cors"
import path from 'path'
import { catchAsync } from "vanta-api"
import authRouter from "./Routes/auth.js"
import userRouter from "./Routes/user.js"

export const __dirname = path.resolve()

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors({ origin: "*" }))




app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
















app.use(catchAsync)


export default app