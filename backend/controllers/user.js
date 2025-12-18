import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";
import ApiRespond from "../utils/ApiRespond.js";

// signup 
export const handleRegister = async (req, res) => {

    const { name, email, password, role } = req.body;

    if (
        [name, email, password, role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { role }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists")
    }


    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    res.status(200).json(
        new ApiRespond(201, createdUser, "User registered successfully")
    )

}

// login
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            [email, password].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "Invalid redentials")
        }

        const user = await User.findOne({ email });

        if (!user) {
           throw new ApiError(401, "User not found")
        }
        // next time start from here 
        // console.log(user);
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
            token: token,
            isAuthenticated: true,
        })

    } catch (error) {
        // console.log('User Login Error', error.message);
        res.status(500).json({ message: "Server error" });
    }

}

export const handleGetAllChairmen = async (req, res) => {
    try {
        // Fetch all users with role = chairman
        const chairmen = await User.find({ role: "chairman" }).select("name email role");

        if (!chairmen || chairmen.length === 0) {
            return res.status(404).json({ message: "No chairmen found" });
        }

        res.status(200).json(chairmen);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chairmen", error: error.message });
    }
};



// logout 
export const handleLogout = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}