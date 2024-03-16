import { Employee, Department } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Manager } from '../models/manager.model.js';


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

 
export const assignDepartment = async (req, res) => {
  const { employeeId, departmentId } = req.body;

  try {
   
    const manager = await Manager.findById(req.user.id);
    if (!manager) {
      throw new ApiError(403, 'Unauthorized: Only managers can assign departments');
    }


    const department = await Department.findById(departmentId);
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }

 
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $addToSet: { departments: departmentId } }, 
      { new: true }
    );

    if (!updatedEmployee) {
      throw new ApiError(404, 'Employee not found');
    }

    res.status(200).json(new ApiResponse(200, updatedEmployee, 'Department assigned successfully'));
  } catch (error) {
    res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};



export const registerEmployee = asyncHandler(async (req, res) => {
  const { designnation, location, employeeName, email, password, role, departments } = req.body;

  if (
      [ designnation, location, employeeName, email, password, role ].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "All fields are required");
  }

  const existedEmployee = await Employee.findOne({
      $or: [{ employeeName }, { email }]
  });

  if (existedEmployee) {
      throw new ApiError(409, "User with email or username already exists");
  }

  const employee = await Employee.create({
      employeeName,
      designnation,
      location,
      email,
      password,
      role,
      departments
  });

  const registeredEmployee = await Employee.findById(employee._id).select("-password -refreshToken");

  if (!registeredEmployee) {
      throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
      new ApiResponse(200, registeredEmployee, "Employee registered successfully")
  );
});

export const getEmployee = async (req, res) => {
    const { search, sortBy } = req.query;
  
    try {
      let query = {};

    
      const sortOrder = sortBy === 'desc' ? -1 : 1;

      if (search) {
      
        query = {
          $or: [
            { employeeName: { $regex: new RegExp(search, 'i') } },
            { designnation: { $regex: new RegExp(search, 'i') } },
            { location: { $regex: new RegExp(search, 'i') } },
          ],
        };
      }
  
      const posts = await Employee.find(query).sort({ location: sortOrder, employeeName: sortOrder });
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};



  export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Employee.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




  export const updateEmployeeData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { designnation, location, employeeName, email } = req.body;

    if (
        [designnation, location, employeeName, email].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
            designnation,
            location,
            employeeName,
            email
          
        },
        { new: true }
    );

    if (!updatedEmployee) {
        throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedEmployee, "Employee info updated successfully")
    );
});
  


export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

 try {
    const manager = await Manager.findById(req.user.id);
    if (!manager) {
      throw new ApiError(403, 'Unauthorized: Only managers can delete');
    }
    const deletedEmp = await Employee.findByIdAndDelete(id);
  
    if (!deletedEmp) {
      throw new ApiError(404, "Employee not found");
    }
  
    return res.status(200).json(
      new ApiResponse(200, deletedEmp, "Employee deleted successfully")
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



  export const LoginEmployee = asyncHandler(async (req, res) =>{
     const {email, password} = req.body
   
    
    if (!email) {
        throw new ApiError(400, "username or email is required")
    }
    
    const admin = await Employee.findOne({
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
  

    const loggedInUser = await Employee.findById(admin._id).select("-password -refreshToken")
    
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

export const logoutEmployee = asyncHandler(async(req, res) => {
  console.log(req.admin._id)
  await Employee.findByIdAndUpdate(req.admin._id,
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

  