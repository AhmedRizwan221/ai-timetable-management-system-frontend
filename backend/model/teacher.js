import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref:"User",
    },
    department: {
        type: mongoose.Types.ObjectId, ref:"Department",
    },
    subjects: [String]
});

export default mongoose.model('Teacher', teacherSchema);