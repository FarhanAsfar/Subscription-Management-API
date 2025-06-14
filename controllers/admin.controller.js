import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { startSession } from "mongoose";


const createAdmin = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

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
        new ApiResponse(201, createAdmin, "New Admin created!")
    )
})

export {
    createAdmin,
}