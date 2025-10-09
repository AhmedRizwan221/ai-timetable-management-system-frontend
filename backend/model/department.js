import mongoose from "mongoose";

const depatSchema = new mongoose.Schema({
    name: String,
    chairman:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

export default mongoose.model('Department', depatSchema);