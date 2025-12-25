import express from "express";
import {handleRegister, handleLogin, handleGetAllChairmen, refreshAccessToken, handleLogout} from "../controllers/user.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";


const router = express.Router();
const upload = multer();


router.post('/register', upload.none() ,handleRegister);
router.post('/login', upload.none() ,handleLogin);
router.post('/logout', authMiddleware, handleLogout);
router.get('/getchairman', authMiddleware, verifyRole(['superadmin']), handleGetAllChairmen);

router.post('/refresh-Token', refreshAccessToken)

export default router;