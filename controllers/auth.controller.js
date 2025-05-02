import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"


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

    if(!newUser){
        throw new ApiError(500, "User registration failed.");
    }

    return res.status(201).json(
        new ApiResponse(201, newUser, "User created successfully")
    );

})

export {signUP}