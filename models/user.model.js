import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
        minLength: 4,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 4,
    },
}, {timestamps: true});


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    
    this.password = await bcryptjs.hash(this.password, 5);
    next();
});

userSchema.methods.isPassword = async function (password) {
    if(!password || !this.password){
        console.log("Invalid password");
    }
    return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export {User}