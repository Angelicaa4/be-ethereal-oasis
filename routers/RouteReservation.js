import express from 'express';
import {addReservation, getReservation} from '../controllers/ReservationController.js';
import { Authentication } from '../middleware/Authentication.js';



const router = express.Router();

router.post("/reservation",  Authentication, addReservation);
router.get("/get-reservation",  Authentication, getReservation);


export default router;

