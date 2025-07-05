import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';  

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())
  
app.use('/', userRoutes);


mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

  