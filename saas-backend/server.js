import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"


dotenv.config()
connectDB()

const app = express()

app.get('/',(req,res)=>{
    res.send('hi from the server side')
})
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)


const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})