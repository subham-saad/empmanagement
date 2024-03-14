import { Employee } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const generateAccessAndRefereshTokens = async (adminId) => {
    try {
        const admin = await Employee.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
  
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });
  
        return { accessToken, refreshToken };
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
  };


  export const registerEmployee = asyncHandler (async (req, res) => {
    const { designnation, location, employeeName, email, password } = req.body;

    if (
        [ designnation, location, employeeName, email, password ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedEmployee = await Employee.findOne({
      $or: [{ employeeName }, { email }]
  })

  if (existedEmployee) {
    throw new ApiError(409, "User with email or username already exists")
}

     

    const post = await Employee.create({
        employeeName, 
        designnation, 
        location, 
        email, 
        password,
    })

    const registeredEmployee = await Employee.findById(post._id).select("-password -refreshToken")

    if (!registeredEmployee) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, post, "Post Successfully")
    )
 
} )

  