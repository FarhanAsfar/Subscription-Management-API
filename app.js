import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));


// import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully",
    status: "active"
  });
});

app.use("/api/v1/auth", authRouter);



export {app};