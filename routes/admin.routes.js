import { Router } from "express";
import { createAdmin, loginAdmin} from "../controllers/admin.controller.js";

const adminRouter = Router();


adminRouter.route("/create-admin").post(isAdmin, createAdmin);
adminRouter.route("/login-admin").post(isAdmin, loginAdmin);


export { adminRouter };