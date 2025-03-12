import dotenv from "dotenv"
dotenv.config();
import express from "express"
import { connectDatabase } from "./db/index.js";

const app = express();

connectDatabase()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`)
    });
})
.catch(error => {
    console.error('Database connection failed', error);
})