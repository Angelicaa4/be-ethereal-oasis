import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./configs/Database.js";
import ModelUser from './models/ModelUser.js'
import ModelRoom from './models/ModelRoom.js'
import ModelReservation from './models/ModelReservation.js'
dotenv.config()

// Router
import RouteAuth from './routers/RouteAuth.js';
import Routereservation from './routers/RouteReservation.js'


const app = express()

try {
    await db.authenticate();
    console.log("Database connected....");
    await ModelUser.sync();
    await ModelRoom.sync();
    await ModelReservation.sync();
} catch (error) {
    console.log(error);
}
app.use(express.json());
app.use(cors());
app.use(cookieParser());   

app.use('/auth', RouteAuth);
app.use ('/', Routereservation);

app.listen(5001,() => console.log("Server running at port 5001...."));