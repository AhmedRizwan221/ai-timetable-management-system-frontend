import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema({
    department: {
        type: mongoose.Types.ObjectId, ref: "Department"
    },
    batch: String,
    day: String,
    subject: String,
    teacher: {
        type: mongoose.Types.ObjectId, ref: "Teacher"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
}, {timestamps: true});


export default mongoose.model('TimeTable', timeTableSchema);