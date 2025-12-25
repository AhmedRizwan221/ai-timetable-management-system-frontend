import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email address must be valid"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ['superadmin', 'Dean', 'chairman', 'teacher']
        },
        refreshToken: {
            type: String
        }

    }, { timestamps: true }
)

userSchema.index(
    { role: 1 },
    { unique: true, partialFilterExpression: { role: "superadmin" } }
)


// here gonna add some jwt and bcrypt code
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password =  await bcrypt.hash(this.password, 10)
})



// compare password
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generate access and refresh tokens
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            role: this.role,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export default mongoose.model('User', userSchema);