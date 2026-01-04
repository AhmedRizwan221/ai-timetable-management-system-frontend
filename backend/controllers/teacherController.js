import User from "../model/user.js";
import Teacher from "../model/teacher.js";
import {Department} from "../model/department.js";

//  use time format for time here 
// add teacher
export const handleAddTeacher = async (req, res) => {
    try {
        const { userId, departmentId, subjects, schedule } = req.body;

        // Validate required fields
        if (!userId || !departmentId || !subjects || !Array.isArray(subjects)) {
            return res.status(400).json({
                message: "userId, departmentId, and subjects array are required"
            });
        }

        // check user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User is not found"
            })
        }

        // check if user is not a teacher  
        if (user.role !== "teacher") {
            return res.status(400).json({
                message: `${user.name} is not a teacher`
            })
        }

        // check dept is exists
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(400).json({
                message: "Department not found"
            })
        }

        // check schedule
        if (schedule) {
            const { day, startTime, endTime } = schedule;

            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
                return res.status(400).json({
                    message: "Time must be in HH:MM format"
                })
            }

            if (startTime >= endTime) {
                return res.status(400).json({
                    message: "End time must be after start time"
                });
            }

            // check teacher is assigned 
            const timeConflict = await Teacher.findOne({
                user: userId,
                'schedule.day': day,
                $or: [
                    {
                        'schedule.startTime': { $lt: endTime },
                        'schedule.endTime': { $gt: startTime }
                    }
                ]
            });

            if (timeConflict) {
                const conflictDept = await Department.findById(timeConflict.department);
                return res.status(400).json({
                    message: `${user.name} already has a class in ${conflictDept.name} department at this time`
                });
            }
        }


        // create teacher 
        const teacher = await Teacher.create({
            user: userId,
            department: departmentId,
            subjects: subjects,
            schedule: schedule
        });

        // Populate the response
        await teacher.populate('user', 'name email');
        await teacher.populate('department', 'name');

        res.status(201).json({
            message: "Teacher assigned to a dept",
            data: teacher
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get all teachers
export const handleGetAllTeachers = async (req, res) => {
    try {
        const { deptId } = req.params;
        const teachers = await Teacher.find({ department: deptId }).populate('user', "name email");
        res.json({
            message: "All teachers in a dept",
            data: teachers
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}