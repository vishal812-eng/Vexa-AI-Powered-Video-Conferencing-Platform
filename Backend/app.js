import "dotenv/config";
import express from "express";
import {createServer} from "node:http" ;

import mongoose from "mongoose";
import { connectToSocket } from "./src/Controllers/socketManger.js";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js"
import aiRoutes from "./src/routes/ai.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set('port',(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

app.get('/',(req,res)=>{
  return res.json({"hello":"world"});
})


const start = async ()=>{
  const mongoDBconnect = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
  server.listen(app.get("port"),()=>{
    console.log("LISTENING ON PORT 8000");
  });
}

start();