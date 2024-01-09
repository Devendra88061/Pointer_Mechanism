import express from "express";
// import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cors from "cors"
import router from "./src/modules";
import * as dotenv from 'dotenv';
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000');
const MONGO_URL: string = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/lesson_points_tracker';

export const app = express();

// parsing the request data
app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// dataBase connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL).then(()=>{
  console.log("\n*************MONGODB connected**************\n");
}).catch(error =>{
  console.log("unable to connect with database:", error);
});
 
// App testing
app.get('/ping', (req,res)=>{
  res.status(200).json({
      status: true,
      message : "App is working",
  })
});

// router 
app.use("/api", router);


