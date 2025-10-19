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
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

export default mongoose.model('Teacher', teacherSchema);