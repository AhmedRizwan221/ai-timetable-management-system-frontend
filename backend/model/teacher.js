import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },
        subjects: [String],
        schedule: {
            day: String,
            startTime: String,
            endTime: String
        }
    }, {timestamps: true}
)

export default mongoose.model('Teacher', teacherSchema)