import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


const signUP = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        if([username, email, password].some((field) => field?.trim() == "")){
            console.log("All fields are required");
        }

        const userExist = await User.findOne({email});

        if(userExist){
            console.log("User already exists");
        }
    } catch (error) {
        console.error("Signup Failed", error);
    }
}