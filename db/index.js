import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config();

const connectDatabase = async() =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected...HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`Database connection failed`, error);
        process.exit(1);
    }
}

export {connectDatabase};