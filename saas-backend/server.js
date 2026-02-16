import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"


dotenv.config()
connectDB()

const app = express()

app.get('/',(req,res)=>{
    res.send('hi from the server side')
})
app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})