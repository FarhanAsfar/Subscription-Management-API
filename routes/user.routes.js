import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

const userRouter = Router();


userRouter.route("/").get(getUsers);

userRouter.route("/:id").get(getUserById);

userRouter.route("/:id").put(updateUser);

userRouter.route("/:id").delete(deleteUser);

export {userRouter}