import TimeTable from "../model/timetable.js";

// create TimeTable
export const handleCreateTimeTable = async (req, res) => {
    try {
        const { departmentId, batch, day, subject, teacherId, startTime, endTime } = req.body;

        if (!departmentId || !teacherId || !day || !startTime || !endTime || !subject || !batch) {
            return res.status(400).json({
                message: "All fields are required: departmentId, teacherId, day, startTime, endTime, subject, batch"
            });
        }

        // time logic
        if (startTime >= endTime) {
            return res.status(400).json({
                message: "End time must be after start time"
            });
        }
        // dept conflict
        const deptConflict = await TimeTable.findOne({
            department: departmentId,
            day,
            $or: [
                {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            ]
        })

        if (deptConflict) {
            return res.status(400).json({
                message: `This department already has ${deptConflict.subject} class scheduled at this time.`
            });
        }

        // teacher conflict
        const teacherConflict = await TimeTable.findOne({
            teacher: teacherId,
            day,
            $or: [
                {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            ]
        })

        if (teacherConflict) {
            return res.status(400).json({
                message: `This teacher already has ${teacherConflict.subject} class in ${teacherConflict.department} at this time.`
            });
        }


        const entry = await TimeTable.create({
            department: departmentId,
            batch,
            day,
            subject,
            teacher: teacherId,
            startTime,
            endTime
        });

        return res.json({
            message: "Time Table created ",
            data: entry
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get time table by dept and batch
export const handleGetTimeTableBatch = async (req, res) => {
    try {
        const { deptId, batch } = req.params;

        const timeTable = await TimeTable.find({ department: deptId, batch }).populate("teacher", "user");

        if (!timeTable) return res.status(404).json({ message: "Time Table not found" });

        res.json({
            data: timeTable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get teacher time table 
export const handleGetTeacherTimeTable = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const timeTable = await TimeTable.find({ teacher: teacherId });

        res.json({
            message: "Teacher time table is here",
            data: timeTable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get time table for student 
export const handleGetTimeTableStudnet = async (req, res) => {
    try {
        const { deptId, batch } = req.params;

        const timeTable = await TimeTable.find({ department: deptId, batch });
        res.json({
            message: "Time Table for students",
            data: timeTable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}