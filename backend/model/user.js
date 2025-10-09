import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email address must be valid"]
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['superadmin', 'chairman', 'teacher', 'student']
    }

})

export default mongoose.model('User', userSchema);