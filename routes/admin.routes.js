import { Router } from "express";
import { createAdmin} from "../controllers/admin.controller.js";

const adminRouter = Router();


adminRouter.route("/").post(createAdmin);


export { adminRouter };