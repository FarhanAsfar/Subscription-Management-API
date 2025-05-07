import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));


app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Subscription Management Api");
});





export {app};