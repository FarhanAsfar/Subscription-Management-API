import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeUserPassword, getUserById, updateUserAccount } from "../controllers/user.controller.js";

const userRouter = Router();
//route: api/v1/user


userRouter.route("/profile").get(verifyJWT, getUserById);

userRouter.route("/update-account/").put(verifyJWT, updateUserAccount);

userRouter.route("/change-password").put(verifyJWT, changeUserPassword);


export {userRouter}