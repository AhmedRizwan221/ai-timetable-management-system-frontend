import express from "express";
import {handleAddDepartment, handleGetAllDept, handleUpdateDept, handleGetSingleDept} from "../controllers/departmentController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {verifyRole} from "../middleware/verifyRole.js";

const router = express.Router();

// router.post('/create', handleAddDepartment);
router.post('/create', authMiddleware, verifyRole(['superadmin']) , handleAddDepartment);
router.put('/update/:id', authMiddleware, verifyRole(['superadmin']), handleUpdateDept);
router.get('/alldepartments', handleGetAllDept);
router.get('/:id', handleGetSingleDept);

export default router;