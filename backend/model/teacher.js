import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref:"User",
    },
    department: {
        type: mongoose.Types.ObjectId, ref:"Department",
    },
    subjects: [String],
    schedule: [ {
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        startTime: {
            type: String,
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format']
        },
        endTime: {
            type: String,
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format']
        }
    }]
});

export default mongoose.model('Teacher', teacherSchema);