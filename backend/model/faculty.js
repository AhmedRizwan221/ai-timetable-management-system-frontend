import mongoose, { Schema } from "mongoose";

const facultSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    dean: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Faculty = mongoose.model("Faculty", facultSchema);