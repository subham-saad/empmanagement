import  Express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = Express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// middlewares
app.use(Express.json({limit: "16kb"}))
app.use(Express.urlencoded({extended: true, limit: "16kb"}))
app.use(Express.static("public"))
app.use(cookieParser())

// routes
import EmployeeRouter from './routes/employee.route.js';
import ManagerRouter from './routes/manager.route.js'

app.use("/api/v1/employeemangement", EmployeeRouter)
app.use("/api/v1/managersignup", ManagerRouter)

export { app }