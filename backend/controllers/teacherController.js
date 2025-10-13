import User from "../model/user.js";
import Teacher from "../model/teacher.js";

// add teacher
export const handleAddTeacher = async (req, res) => {
    try {
        const {userId, departmentId, subjects} = req.body;
        
        const user = await User.findById(userId);

        if(!user || user.role !== 'teacher') {
            return res.status(400).json({message: "Invalid Teacher"});
        }

        const teacher  = await Teacher.create({
            user: userId,
            department: departmentId,
            subjects: subjects
        });
        res.status(201).json(teacher);
    }catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// get all teachers
export const handleGetAllTeachers = async (req, res) => {
    try {
        const {deptId} = req.params;
        const teachers = await Teacher.find({department: deptId}).populate('user', "name email");
        res.json(teachers);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}