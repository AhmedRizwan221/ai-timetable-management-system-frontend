import mongoose, { Schema } from "mongoose";

const depatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    chairman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        sparse: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        // required: true
    }
}, {timestamps: true});

export const Department = mongoose.model("Department", depatSchema);