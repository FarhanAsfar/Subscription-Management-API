import { Router } from "express";
import { signUP } from "../controllers/auth.controller.js";

const userRouter = Router();


userRouter.route("/").get(getUsers);

userRouter.route("/:id").get(getUserById);

userRouter.route("/:id").put(updateUser);

userRouter.route("/:id").delete(deleteUser);

export {userRouter}