import express from "express";
import {handleAddDepartment, handleGetAllDept} from "../controllers/departmentController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {verifyRole} from "../middleware/verifyRole.js";

const router = express.Router();

// router.post('/create', handleAddDepartment);
router.post('/create', authMiddleware, verifyRole(['chairman']) , handleAddDepartment);
router.get('/alldepartments', authMiddleware, handleGetAllDept);

export default router;