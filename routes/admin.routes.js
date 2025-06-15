import { Router } from "express";
import { createAdmin, loginAdmin} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const adminRouter = Router();


adminRouter.route("/create-admin").post(isAdmin, createAdmin);
adminRouter.route("/login-admin").post(loginAdmin);


export { adminRouter };