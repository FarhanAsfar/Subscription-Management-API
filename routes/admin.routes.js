import { Router } from "express";
import { createAdmin, loginAdmin, usersInfo} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.route("/create-admin").post(isAdmin, createAdmin);
adminRouter.route("/login-admin").post(loginAdmin);
adminRouter.route("/get-all-users").get(isAdmin, usersInfo);

// Initial admin info
// adminName: admin me
// adminEmail: adminme@gmail.com
// adminPassword: adminme123

export { adminRouter };