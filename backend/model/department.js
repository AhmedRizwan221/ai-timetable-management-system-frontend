import mongoose from "mongoose";

const depatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chairman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        sparse: true
    }
}, {timestamps: true});

export default mongoose.model('Department', depatSchema);