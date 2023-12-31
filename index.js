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

app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins
    credentials: true,
    methods: ['GET', 'POST'], // Add the necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Add the necessary headers
}));

// Use cookie-parser middleware
app.use(cookieParser());

app.options('/logout', cors());
app.options('/auth/create', cors());
app.options('/auth/login', cors());
app.options('/reservation', cors());
app.options('/add-reservation', cors());
app.use('/auth', RouteAuth);
app.use('/', Routereservation);

app.listen(5001 || process.env.MYSQL_PORT, () => console.log("Server running...."));
