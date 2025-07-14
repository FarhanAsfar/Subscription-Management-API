import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"

const generateAccessAndRefreshToken = async(userID) => {
    try {
        const user = await User.findById(userID);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Acess/Refresh token generation failed!")
    }
}

const signUP = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {username, email, password} = req.body;    

    if(!username || !email || !password || [username, email, password].some((field) => field?.trim() === "")){
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(existedUser){
        throw new ApiError(409, "Username or Email already exists");
    }

    const newUser = await User.create({
        username: username.toString().toLowerCase(),
        email,
        password,
    });

    const createdUser = await User.findById(newUser._id).select(
        "-password"
    );
    
    if(!createdUser){
        throw new ApiError(500, "User registration failed.");
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    );

})

const signIN = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Email and Password are required");
    }

    const user = await User.findOne({
        $or:[
            {email}
        ]
    })

    if(!user){
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPassword(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {user: loggedInUser, accessToken,},
            "user logged in successfully"
        )
    );

})

const signOUT = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, `${req.user.username} logged out`)
    )
})

export {
    signUP,
    signIN,
    signOUT,
}