import express from "express";
import {handleAddDepartment, handleGetAllDept} from "../controllers/departmentController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {verifyRole} from "../middleware/verifyRole.js";

const router = express.Router();

// router.post('/create', handleAddDepartment);
router.post('/create', authMiddleware, verifyRole(['superadmin']) , handleAddDepartment);
router.get('/appdepartments', authMiddleware, handleGetAllDept);

export default router;