import express from "express";
import {handleRegister, handleLogin, handleGetAllChairmen} from "../controllers/user.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/getchairman', authMiddleware, verifyRole(['superadmin']), handleGetAllChairmen);


export default router;