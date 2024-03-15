import { Router } from "express";
import  { verifyManagerJWT } from "../middlewares/authformanager.middleware.js"
import  { registerManager, LoginManager}  from "../controllers/manager.controller.js"



const router = Router()

router.route('/registermanager').post(registerManager);
router.route('/logimanager').post(LoginManager);


export default router;