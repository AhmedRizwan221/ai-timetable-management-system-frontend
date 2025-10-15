import express from "express";
import {handleAddTeacher, handleGetAllTeachers} from "../controllers/teacherController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {verifyRole} from "../middleware/verifyRole.js";

const router = express.Router();

router.post('/create', authMiddleware,  verifyRole(['chairman']), handleAddTeacher);
router.get('/allteachers', handleGetAllTeachers);

export default router;