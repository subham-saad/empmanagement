import { Router } from "express";
import  { verifyManagerJWT } from "../middlewares/authformanager.middleware.js"
import  { registerManager, LoginManager}  from "../controllers/manager.controller.js"
import { registerEmployee, getEmployee, updateEmployeeData, deleteEmployee, getEmployeeById, LoginEmployee, logoutEmployee, assignDepartment } from "../controllers/employee.controller.js";


const router = Router()

router.route('/registermanager').post(registerManager);
router.route('/logimanager').post(LoginManager);
router.route('/deleteemployee/:id').delete(deleteEmployee);

export default router;