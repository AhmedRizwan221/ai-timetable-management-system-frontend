import User from "../model/user.js";
import ApiError from "../utils/ApiError.js";
import ApiRespond from "../utils/ApiRespond.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // console.log(accessToken, "Access token",  refreshToken , "refresh token here ");
        // console.log(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access and refresh token")
    }
}

// signup 
export const handleRegister = AsyncHandler(async (req, res) => {

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

})

// login
export const handleLogin = AsyncHandler(async (req, res) => {

    const { email, password } = req.body;
    // console.log(email, password);

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    // console.log(user);

    const isPasswordValid = await user.isCorrectPassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    // console.log(accessToken, refreshToken)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // console.log(loggedInUser);
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiRespond(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )
})


export const handleGetAllChairmen = AsyncHandler(async (req, res) => {
    // Fetch all users with role = chairman
    const chairmen = await User.find({ role: "chairman" }).select("name -email role");

    if (!chairmen || chairmen.length === 0) {
        throw new ApiError(404, "No chiarman found")
    }
    res.status(200).json(
        new ApiRespond(
            200,
            chairmen,
            "All chairmans"
        )
    )
});


export const handleGetCurrentUser = AsyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiRespond(
                200,
                req.user,
                "current user fetched successfully"
            )
        )
})


// logout 
export const handleLogout = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }

    )

    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiRespond(200, {}, "user successfully logout")
        )
})


export const refreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Invalid refresh token")
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
        throw new ApiError(401, "Expired refresh token")
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(401, "Invalid refresh Token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Token is expired")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiRespond(
                200,
                { accessToken, newRefreshToken },
                "Token created successfully"
            )
        )

})


export const handleChangeCurrentPassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User found Not")
    }

    const checkedPassowed = await user.isCorrectPassword(oldPassword);

    if (!checkedPassowed) {
        throw new ApiError(401, "Invalid user Password")
    }

    user.password = newPassword;
    await save.User({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiRespond(
                200,
                {},
                "Password changed successfully"
            )
        )
})

export const handleUpdateUserDetails = AsyncHandler(async (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name,
                email,
                role
            }
        }
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiRespond(
                200,
                user,
                "User details updated successfully"
            )
        )
})