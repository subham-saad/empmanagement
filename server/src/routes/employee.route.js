import { Router } from "express";
import { registerEmployee, getEmployee, updateEmployeeData, deleteEmployee, getEmployeeById } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/registeremployee').post(registerEmployee);
router.route('/getemployee').get(getEmployee )
router.route('/getemployee/:id').get(getEmployeeById)
router.route('/updateemployeeinfo/:id').patch(updateEmployeeData);
router.route('/deleteemployee/:id').delete(deleteEmployee);

export default router