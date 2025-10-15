import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// signup 
export const handleRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log(name, email, role);
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "superadmin") {
            const adminExists = await User.findOne({ role: "superadmin" });
            if (adminExists) {
                return res.status(400).json({ message: "Super admin already exists" });
            }
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        res.json({ _id: user._id, email: user.email, role: user.role });
    } catch (error) {
        console.log("Register error", error.message);
        res.status(500).json({ message: "Server error " });
    }

}

// login
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user._id, user.role);

        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token: token
        })

    } catch (error) {
        // console.log('User Login Error', error.message);
        res.status(500).json({ message: "Server error" });
    }

}

// logout 
export const handleLogout = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}