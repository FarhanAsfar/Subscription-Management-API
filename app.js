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

app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/user", userRouter);

app.post("/test-post", (req, res) => {
    console.log("Test route hit", req.body);
    res.json({ message: "Post request received", body: req.body });
  });


export {app};