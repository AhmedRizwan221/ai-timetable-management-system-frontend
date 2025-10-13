import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const handleRegister = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log(name, email, role);
        const hashedPassword = await bcrypt.hash(password, 10);

        if(role === "superadmin") {
            const adminExists = await User.findOne({role: "superadmin"});
            if(adminExists) {
                return res.status(400).json({message: "Super admin already exists"});
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
        res.status(500).json({ message: "Server error" });
    }

}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (bcrypt.compare(password, user.password))) {

            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            })
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log('User Login Error', error.message);
        res.status(500).json({ message: "Server error" });
    }

}
