import { Router } from "express";
import { registerEmployee } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/registeremployee').post(registerEmployee);


export default router