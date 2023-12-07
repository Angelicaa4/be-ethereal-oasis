import express from 'express'
import { Login, Register, Logout} from '../controllers/AuthControllers.js'

const router = express.Router();

router.post('/create', Register);
router.post('/login', Login);
router.post('/logout', Logout);



export default router;