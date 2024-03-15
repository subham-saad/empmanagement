import { Router } from "express";
import { registerEmployee, getEmployee, updateEmployeeData, deleteEmployee, getEmployeeById, LoginEmployee, logoutEmployee } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/registeremployee').post(registerEmployee);
router.route('/getemployee').get(getEmployee )
router.route('/getemployee/:id').get(getEmployeeById)
router.route('/updateemployeeinfo/:id').patch(updateEmployeeData);
router.route('/deleteemployee/:id').delete(deleteEmployee);
router.route('/loginemployee').post(LoginEmployee);
router.route('/logout').post(verifyJWT, logoutEmployee)

export default router