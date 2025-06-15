import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "Name is required"],
        lowercase: true,
        trim: true,
    },
    adminEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    adminPassword: {
        type: String,
        required: [true, "Password is required"],
    }
}, {timestamps: true})

adminSchema.pre("save", async function(next){
    if(!this.isModified("adminPassword")){
        return next();
    }

    this.adminPassword = await bcryptjs.hash(this.adminPassword, 5);
    next();
})

adminSchema.methods.isPasswordValid = async function(password) {
    if(!password || this.adminPassword){
        throw new ApiError(400, "Can not match password");
    }

    return await bcryptjs.compare(password, this.adminPassword);
}

adminSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            role: "Admin",
        },
        process.env.ADMIN_ACCESS_TOKEN_SECRET,
        {expiresIn: "2d"}
    )
}


const Admin = mongoose.model("Admin", adminSchema);

export { Admin };