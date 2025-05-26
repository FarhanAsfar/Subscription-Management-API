import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getUserById = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    )
});

const updateUserAccount = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {username, email} = req.body;
    const user = await User.findById(userId).select("-password");

    if(!user){
        throw new ApiError(404, "User not found")
    }

    if(!username && !email){
        throw new ApiError(400, "Nothing was changed")
    }

    if(username){
        user.username = username;
    }
    if(email){
        user.email = email;
    }
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, user, "User account updated successfully")
    )
})

const changeUserPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user?._id);
    const isPassword = await user.isPassword(oldPassword);

    if(!isPassword){
        throw new ApiError(400, "Password is not correct")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
})


export {
    getUserById,
    updateUserAccount,
    changeUserPassword,
}
