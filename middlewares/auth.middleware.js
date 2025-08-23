import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim()

    if(!token){
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if(!user){
        throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();

    if(!token){
        throw new ApiError(401, "Unauthorized request/ Token expired");
    }

    const decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    
    const admin = await Admin.findById(decodedToken?._id);

    if(!admin || decodedToken.role != "Admin"){
        throw new ApiError(403, "Access Denied! You are not an Admin");
    }

    req.admin = admin; //admin can be accessed as: req.admin._id
    next();
})

export {
    verifyJWT,
    isAdmin,
}