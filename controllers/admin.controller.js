import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";


const generateAccessToken = async function(adminID){
    try {
        const admin = await Admin.findById(adminID);

        const accessToken = admin.generateAccessToken();

        await admin.save({validateBeforeSave: false})

        return accessToken;
    } catch (error) {
        throw new ApiError(400, "Token generation failed");
    }

}

const createAdmin = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    //console.log(req.body);
    const {adminName, adminEmail, adminPassword} = req.body;

    if([adminName, adminEmail, adminPassword].some(field => field?.trim() == "")){
        throw new ApiError(400, "All fields are required");
    }

    const existAdmin = await Admin.findOne({
        $or: [
            {adminName},
            {adminEmail}
        ]
    })

    if(existAdmin){
        throw new ApiError(400, "Admin already exists");
    }

    const newAdmin = await Admin.create({
        adminName,
        adminEmail,
        adminPassword,
        role: "Admin",
    });

    const createdAdmin = await Admin.findById(newAdmin._id).select("-password");

    if(!createdAdmin){
        throw new ApiError(404, "Admin not found");
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(
        new ApiResponse(201, createdAdmin, "New Admin created!")
    )
})

const loginAdmin = asyncHandler(async (req, res) => {
    const {adminName, adminPassword, adminEmail} = req.body;

    if(!adminEmail || !adminPassword){
        throw new ApiError(400, "Name, Email, and Password are required");
    }
    
    const admin = await Admin.findOne({
        $or: [
            {adminName},
            {adminEmail},
        ]
    })

    if(!admin){
        throw new ApiError(404, "Admin not found");
    }

    const isPasswordValid = await admin.isPasswordValid(adminPassword);

    if(!isPasswordValid){
        throw new ApiError(401, "Password is not correct");
    }

    const accessToken = await generateAccessToken(admin._id);

    const loggedInAdmin = await Admin.findById(admin._id).select("-adminPassword");

    if(!loggedInAdmin){
        throw new ApiError(400, "Log in failed");
    }

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, {Admin: loggedInAdmin, accessToken}, `${admin.adminName} logged in successfully`)
    );
})

const usersInfo = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    return res.status(200).json(
        new ApiResponse(200, users, "Fetched all users")
    )
})

export {
    createAdmin,
    loginAdmin,
    usersInfo,
}