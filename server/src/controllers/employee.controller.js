import { Employee, Department } from "../models/employee.model.js";
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

  export const assignDepartment = asyncHandler(async (req, res) => {
    const { employeeId, departmentId } = req.body;

    // Check if the current user is a manager
    if (req.user.role !== 'manager') {
        throw new ApiError(403, "Only managers can assign departments");
    }

    // Check if the department exists
    const department = await Department.findById(departmentId);
    if (!department) {
        throw new ApiError(404, "Department not found");
    }

    // Update the employee's departments array with the new department
    const employee = await Employee.findByIdAndUpdate(
        employeeId,
        { $addToSet: { departments: departmentId } }, // Add the departmentId to the departments array if it doesn't already exist
        { new: true }
    );

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json(new ApiResponse(200, employee, "Department assigned successfully"));
});


//   export const registerEmployee = asyncHandler (async (req, res) => {
//     const { designnation, location, employeeName, email, password } = req.body;

//     if (
//         [ designnation, location, employeeName, email, password ].some((field) => field?.trim() === "")
//     ) {
//         throw new ApiError(400, "All fields are required")
//     }
//     const existedEmployee = await Employee.findOne({
//       $or: [{ employeeName }, { email }]
//   })

//   if (existedEmployee) {
//     throw new ApiError(409, "User with email or username already exists")
// }

     

//     const post = await Employee.create({
//         employeeName, 
//         designnation, 
//         location, 
//         email, 
//         password,
//     })

//     const registeredEmployee = await Employee.findById(post._id).select("-password -refreshToken")

//     if (!registeredEmployee) {
//         throw new ApiError(500, "Something went wrong while registering the user")
//     }


//     return res.status(201).json(
//         new ApiResponse(200, post, "Post Successfully")
//     )
 
// } )

// export const getEmployee = async (req, res) => {
//     const { search, sortBy } = req.query;
  
//     try {
//       let query = {};
  
//       if (search) {
//         // If search term is provided, add a case-insensitive regex search to the query
//         query = {
//           $or: [
//             { employeeName: { $regex: new RegExp(search, 'i') } },
//             { designnation: { $regex: new RegExp(search, 'i') } },
//             { location: { $regex: new RegExp(search, 'i') } },
//           ],
//         };
//       }
  
//       const posts = await Employee.find(query).sort({ location: sortBy === 'asc' ? 1 : -1 });
  
//       res.status(200).json(posts);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

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

      // Check if sortBy is provided and set default value to 'asc'
      const sortOrder = sortBy === 'desc' ? -1 : 1;

      if (search) {
        // If search term is provided, add a case-insensitive regex search to the query
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


  // export const updateEmployeeData = asyncHandler(async (req, res) => {
  //   const { id } = req.params;
  //   const { designnation, location, employeeName } = req.body;
  
  //   if (
  //     [designnation, location, employeeName].some(
  //       (field) => field?.trim() === ""
  //     )
  //   ) {
  //     throw new ApiError(400, "All fields are required");
  //   }
  
  //   const updatedEmployee = await Employee.findByIdAndUpdate(
  //     id,
  //     {
  //       designnation, 
  //       location, 
  //       employeeName

  //     },
  //     { new: true }
  //   );
  
  //   if (!updatedEmployee) {
  //     throw new ApiError(404, "Post not found");
  //   }
  
  //   return res.status(200).json(
  //     new ApiResponse(200, updatedEmployee, "Employee info updated successfully")
  //   );
  // });


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
  
    const deletedEmp = await Employee.findByIdAndDelete(id);
  
    if (!deletedEmp) {
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

  