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
    time: String
});


export default mongoose.model('TimeTable', timeTableSchema);