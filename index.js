// index.js (or your main server file)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser
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

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
}));
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

app.options('/logout', cors()); // Handle preflight for /auth/logout
app.use('/auth', RouteAuth);
app.use('/', Routereservation);

app.listen(5001, () => console.log("Server running at port 5001...."));
