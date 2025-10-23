import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { __dirname } from "./app.js";
configDotenv({ path: `${__dirname}/.env` })
mongoose.connect(process.env.DATA_BASE).then(() => {
    console.log("db is connected");

})

app.listen(process.env.PORT, () => {
    console.log('server is run ');

})