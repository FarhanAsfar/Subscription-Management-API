import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserById } from "../controllers/user.controller.js";

const userRouter = Router();
//route: api/v1/user

// userRouter.route("/:id").get(getUserSubscriptions);

userRouter.route("/:id").get(verifyJWT, getUserById);

// userRouter.route("/:id").put(updateUser);


export {userRouter}