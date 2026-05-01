import express from "express"
import dotenv from "dotenv"
dotenv.config() 
import helmet from "helmet"
import cors from "cors" 
import connectDB from "./config/db.js"
import queryRoutes from "./routes/queryRoutes.js"


const app = express()
app.use(helmet())
app.use(cors())


connectDB() // db connected
app.use(express.json())
app.use("/api", queryRoutes)


app.get("/", (req, res, next) => {
    res.send("<h1>Curalink Assignment</h1>")
})

export default app