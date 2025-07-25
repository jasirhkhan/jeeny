import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';  
import authRoutes from './middleware/auth.js'
import rideRoutes from './routes/rideRoutes.js';

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())
  
app.use('/', userRoutes);
app.use('/auth', authRoutes);
app.use('/rides', rideRoutes);

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

  