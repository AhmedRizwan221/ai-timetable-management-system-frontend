import { Department } from "../model/department.js";
import User from "../model/user.js";
import ApiError from "../utils/ApiError.js";
import ApiRespond from "../utils/ApiRespond.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// create department only superadmin
export const handleAddDepartment = async (req, res) => {
    try {
        const { name, chairmanId, facultyId } = req.body;

        // check existing Department name
        const existingDeptName = await Department.findOne({ name });
        if (existingDeptName) {
            return res.status(400).json({
                message: `${existingDeptName.name} is already exists`
            })
        }
        // Check if chairman exists and has correct role
        const chairman = await User.findById(chairmanId);
        if (!chairman) {
            return res.status(400).json({
                message: " Chiarman not found"
            });
        }

        if (chairman.role !== "chairman") {
            return res.status(400).json({
                message: "Selected user is not a chairman"
            });
        }

        // check if Chiarman is already assigned to a dept
        const existingDeptWithChairman = await Department.findOne({ chairman: chairmanId });
        if (existingDeptWithChairman) {
            return res.status(400).json({
                message: `${chairman.name} chiarman is already assigned to ${existingDeptWithChairman.name} department`
            })
        }


        // create dept
        const dept = await Department.create({
            name,
            chairman: chairman._id,
            facultyId
        })
        res.status(201).json({
            message: "Succesfully dept created",
            Deparment: dept
        });
        // res.json(dept);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const handleAddDepartment = AsyncHandler(async (req, res) => {
//     const { deptName, chairmanId, facultyId } = req.body;

//     if (
//         [deptName, chairmanId, facultyId].some((field) => field === "")
//     ) {
//         throw new ApiError(400, "All fields are required")
//     }

//     console.log(facultyId)
//     const existingDept = await Department.findOne({
//         deptName
//     })

//     if (existingDept) {
//         throw new ApiError(409, "Department or chairman is already exists")
//     }

//     const createdDept = await Department.create(
//         name,
//         chairmanId,
//         facultyId
//     ).select();

//     if (!createdDept) {
//         throw new ApiError(500, "Error while creating department")
//     }

//     return res
//         .status(200)
//         .json(
//             new ApiRespond(
//                 200,
//                 createdDept,
//                 "Department created successfully"
//             )
//         )


// })



// get all depts

export const handleGetAllDept = async (req, res) => {
    try {
        const departments = await Department.find().populate('chairman', "name email");
        res.json(departments);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// update dept
export const handleUpdateDept = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, chairmanId } = req.body;

        // find dept
        const dept = await Department.findById(id);
        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }

        // check dept name already exists
        if (name && name !== dept.name) {
            const existingDept = await Department.findOne({ name });
            if (existingDept) {
                return res.status(400).json({
                    message: `${name} department already exists`
                });
            }
            dept.name = name;
        }


        if (chairmanId) {
            const chairman = await User.findById(chairmanId);
            if (!chairman || chairman.role !== "chairman") {
                return res.status(400).json({ message: " Chairman not found" });
            }
            dept.chairman = chairman;

            if (chairmanId !== dept.chairman?.toString()) {
                const existingDeptWithChairman = await Department.findOne({
                    chairman: chairmanId,
                    _id: { $ne: id }
                })

                if (existingDeptWithChairman) {
                    return res.status(400).json({
                        message: `${chairman.name} is already chairman of ${existingDeptWithChairman.name} department`
                    })
                }
            }
            dept.chairman = chairmanId;
        }

        await dept.save();
        res.json(dept);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get single dept
export const handleGetSingleDept = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findById(id).populate(
            "chairman",
            "name email"
        );


        if (!department) {
            return res.status(404).json({ message: "Department not found!" });
        }

        res.status(200).json(department);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}