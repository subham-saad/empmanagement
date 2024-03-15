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


  export const updateEmployeeData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { designnation, location, employeeName } = req.body;
  
    if (
      [designnation, location, employeeName].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        designnation, 
        location, 
        employeeName

      },
      { new: true }
    );
  
    if (!updatedEmployee) {
      throw new ApiError(404, "Post not found");
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

  