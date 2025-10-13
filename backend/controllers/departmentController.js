import Deparment from "../model/department.js";
import User from "../model/user.js";

// create department only superadmin
export const handleAddDepartment = async (req, res) => {
    try {
        const { name, chairmanId } = req.body;

        const chairman = await User.findById(chairmanId);

        if (!chairman || chairman.role !== 'chairman') {
            return res.status(400).json({ message: "Invalid Chairman" });
        }

        const dept = await Deparment.create({
            name,
            chairman: chairman._id
        })
        res.status(201).json({message: "Succesfully dept created", Deparment: dept});
        // res.json(dept);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all depts
export const handleGetAllDept = async (req, res) => {
    try {
        const departments = await Deparment.find().populate('chiarman', "name email");
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

        const dept = await Deparment.findById(id);

        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }

        if (name) dept.name = name;

        if (chairmanId) {
            const chairman = await User.findById(chairmanId);
            if (!chairman || chairman.role !== "chairman") {
                return res.status(400).json({ message: "Invalid chairman" });
            }
            dept.chairman = chairman;
        }

        await dept.save();
        res.json(dept);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}