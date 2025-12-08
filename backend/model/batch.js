import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    batch: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Batch", batchSchema);