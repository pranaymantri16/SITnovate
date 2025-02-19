import express from "express";
import cors from "cors"
import morgan from "morgan";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
connectDb();


const app=express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth',authRoutes);


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})