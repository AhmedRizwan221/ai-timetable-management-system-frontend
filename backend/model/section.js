import mongoose from "mongoose";

const sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true
    },
    batch: {
        type: mongoose.Types.ObjectId,
        ref: "Batch",
        required: true
    }
})

export default mongoose.model("Section", sectionSchema);