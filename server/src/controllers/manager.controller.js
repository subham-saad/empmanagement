import {  Department } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Manager } from '../models/manager.model.js';


const generateAccessAndRefereshTokens = async (adminId) => {
    try {
        const admin = await Manager.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
  
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });
  
        return { accessToken, refreshToken };
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
  };




  export const registerManager = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
  
    if (
        [ email, password, role ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
  
    const existedManager = await Manager.findOne({
        $or: [ { email }]
    });
  
    if (existedManager) {
        throw new ApiError(409, "User with email or username already exists");
    }
  
    const manager = await Manager.create({
       
        email,
        password,
        role,
       
    });
  
    const registeredManager = await Manager.findById(manager._id).select("-password -refreshToken");
  
    if (!registeredManager) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    return res.status(201).json(
        new ApiResponse(200, registeredManager, "Manager registered successfully")
    );
  });


  
  export const LoginManager = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
  
   
   if (!email) {
       throw new ApiError(400, "username or email is required")
   }
   
   const admin = await Manager.findOne({
       $or: [{email}]
   })

   if (!admin) {
       throw new ApiError(404, "User does not exist")
   }

 const isPasswordValid = await admin.isPasswordCorrect(password)
 
  if (!isPasswordValid) {
   throw new ApiError(401, "Invalid user credentials")
   }

  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(admin._id)
 console.log(accessToken, refreshToken)

   const loggedInUser = await Manager.findById(admin._id).select("-password -refreshToken")
   
   const options = {
       httpOnly: true,
       secure: true,
      
   }
 
   return res
   .status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
     new ApiResponse(
       200, 
       {
         admin: loggedInUser, accessToken, refreshToken
       },
       "User logged In Successfully"
     )
   );

})

export const logoutManager = asyncHandler(async(req, res) => {
 console.log(req.admin._id)
 await Manager.findByIdAndUpdate(req.admin._id,
   {
     $unset: {
       refreshToken: 1
     }
   },
   {
     new: true
   }
 )

 const options = {
   httpOnly: true,
   secure: true
 }

 return res
 .status(200)
 .clearCookie("accessToken", options)
 .clearCookie("refreshToken", options)
 .json(new ApiResponse(200, {}, "User logged out"))
})

 
  

  
