import { Router } from "express";
import { signIN, signUP, signOUT } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route("/signup").post(signUP);
authRouter.route("/signin").post(signIN);
authRouter.route("/signout").post(verifyJWT, signOUT);



export {authRouter}