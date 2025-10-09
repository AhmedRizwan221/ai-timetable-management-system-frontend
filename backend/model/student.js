import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: "User",
    },
    department: {
        type: mongoose.Types.ObjectId, ref: "Department"
    },
    batch: String 
})

export default mongoose.model('Student', studentSchema);