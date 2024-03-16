import { Router } from "express";
import { registerEmployee, getEmployee, updateEmployeeData, deleteEmployee, getEmployeeById, LoginEmployee, logoutEmployee, assignDepartment } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import  { verifyManagerJWT } from "../middlewares/authformanager.middleware.js"

const router = Router()

router.route('/registeremployee').post(registerEmployee);
router.route('/getemployee').get(getEmployee)
router.route('/getemployee/:id').get(getEmployeeById)
router.route('/updateemployeeinfo/:id').patch(updateEmployeeData);
 router.route('/deleteemployee/:id').delete(deleteEmployee);
router.route('/loginemployee').post(LoginEmployee);
router.route('/logout').post(verifyJWT, logoutEmployee)
router.route('/assignderpartment').post(verifyManagerJWT, assignDepartment)

export default router