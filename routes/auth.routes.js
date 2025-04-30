import { Router } from "express";

const authRouter = Router();


authRouter.route("/sign-up").post(signUP);

authRouter.route("/sign-in").post(signIN);


export {authRouter}