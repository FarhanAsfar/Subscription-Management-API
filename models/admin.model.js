import mongoose from "mongoose";

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


const Admin = mongoose.model("Admin", adminSchema);

export { Admin };