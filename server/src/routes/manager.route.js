import { Router } from "express";
import  { verifyManagerJWT } from "../middlewares/authformanager.middleware.js"
import  { registerManager, LoginManager}  from "../controllers/manager.controller.js"
// import {  deleteEmployee } from "../controllers/employee.controller.js";


const router = Router()

router.route('/registermanager').post(registerManager);
router.route('/logimanager').post(verifyManagerJWT, LoginManager);
// router.route('/deleteemployee/:id').delete(verifyManagerJWT, deleteEmployee);

export default router;