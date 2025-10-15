import express from "express";
import {handleCreateTimeTable, handleGetTimeTableBatch, handleGetTeacherTimeTable} from "../controllers/timetableController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/verifyRole.js";


const router = express.Router();

router.post('/create', authMiddleware, verifyRole(['chairman']), handleCreateTimeTable);
router.get('/teacher/:teacherId', authMiddleware ,handleGetTeacherTimeTable);
router.get('/:deptId/:batch', authMiddleware, handleGetTimeTableBatch);

export default router;