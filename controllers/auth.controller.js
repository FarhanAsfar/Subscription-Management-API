import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const signUP = asyncHandler(async (req, res) => {
    //const session = await mongoose.startSession();
    //session.startTransaction();

    const {username, email, password} = req.body;    

    if([username, email, password].some((field) => field?.trim() === "")){
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

    return res.status(200).json({
        message: "user logged in"
    });

})

export {
    signUP,
    signIN,
}