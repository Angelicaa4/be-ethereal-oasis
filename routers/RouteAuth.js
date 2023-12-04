import express from 'express'
import { Login, Register } from '../controllers/AuthControllers.js'

const router = express.Router();

router.post('/create', Register);
router.post('/login', Login);


export default router;