import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const departmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },

});

export const Department = mongoose.model("Department", departmentSchema);

const employeeSchema = new Schema({
  designation: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  departments: [{
    type: Schema.Types.ObjectId,
    ref: 'Department'
  }],
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'Manager'
  }
}, { timestamps: true });



employeeSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
    
  } catch (error) {
    return next(error);
  }
});

employeeSchema.methods.isPasswordCorrect = async function(password){
  return bcrypt.compare(password, this.password)
}

employeeSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      employeeName: this.employeeName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
    }
  )
}

employeeSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}



export const Employee = mongoose.model("Employee", employeeSchema)