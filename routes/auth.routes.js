import { Router } from "express";
import { signIN, signUP } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/signup").post(signUP);
authRouter.route("/signin").post(signIN);

//authRouter.route("/signin").post(signIN);


export {authRouter}