import User from "../model/user.js";

export const handleRegister = async (req, res) => {
    const {name, email, password, role} = req.body;

    // JWT will be here 

   const user = await User.create({
        name,
        email,
        // add hash code in password
        password,
        role
    })
    res.json({_id: user._id, email: user.email, role: user.role });
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    const user = User.findOne({email});
    // if(user)
}