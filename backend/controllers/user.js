import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// signup 
export const handleRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if(!name || !email || !password || !role) {
            return res.json({message: "All fields are required"});
        }

        const emailAlreadyExists = await User.findOne({email});
        if(emailAlreadyExists) {
            return res.status(400).json({message: `${emailAlreadyExists} is already exists`})
        };
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
        res.status(500).json({ message: "Server error"});
    }

}

// login
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email && !password) {
            return res.status(400).json({message: "All fields are required!"})
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
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