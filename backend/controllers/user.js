import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const handleRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        res.json({ _id: user._id, email: user.email, role: user.role });
    } catch (error) {
        console.log("Register error", error.message);
        res.status(500).json({ message: "Server error" });
    }

}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {


            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            })
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    }catch(error) {
        console.log('User Login Error', error.message);
        res.status(500).json({ message: "Server error" });
    }
    
}