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


  export const assignDepartment = asyncHandler(async (req, res) => {
    const { employeeName, departmentName } = req.body;
  
    try {
      if (!req.admin) {
        throw new ApiError(403, 'Unauthorized: Only managers can assign departments');
      }
  
  
      const department = await Department.findOne({ name: departmentName });
      if (!department) {
        throw new ApiError(404, 'Department not found');
      }
  

      const employee = await Employee.findOne({ employeeName });
      if (!employee) {
        throw new ApiError(404, 'Employee not found');
      }
  
      employee.departments.push(department._id); // Assuming departments is an array of department IDs in the employee schema
      await employee.save();
  
      res.status(200).json(new ApiResponse(200, { employeeName, departmentName }, 'Department assigned successfully'));
    } catch (error) {
      console.error('Error in assignDepartment:', error);
      res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message));
    }
  });
  
  

export const createDepartment = async (req, res) => {
  try {
  
    const { name, description } = req.body;

  
    const newDepartment = new Department({
      name,
      description
    });

    const savedDepartment = await newDepartment.save();

    res.status(201).json(new ApiResponse(201, savedDepartment, 'Department created successfully'));
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
      const employee = await Employee.findById(id).populate('departments'); // Populate the departments field
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(employee);
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

export const updateEmployeeDeparment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {  employeeName, departments } = req.body;
 
  if (
      [ employeeName, departments].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "All fields are required");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
          departments,
          employeeName
        
        
      },
      { new: true }
  );

  if (!updatedEmployee) {
      throw new ApiError(404, "Employee not found");
  }

  return res.status(200).json(
      new ApiResponse(200, updatedEmployee, "Employee department updated successfully")
  );
});




export const deletePost = asyncHandler(async (req, res) => {
    
  const { id } = req.params;

  const deletedPost = await Employee.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new ApiError(404, "Post not found");
  }

  return res.status(200).json(
    new ApiResponse(200, deletedPost, "Post deleted successfully")
  );
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

  