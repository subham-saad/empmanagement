import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const managerSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['employee', 'manager']
   
  }
});


managerSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
  
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
      
    } catch (error) {
      return next(error);
    }
  });
  
  managerSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password, this.password)
  }
  
  managerSchema.methods.generateAccessToken = function() {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
 
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
      }
    )
  }
  
  managerSchema.methods.generateRefreshToken = function(){
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
  


export const Manager = mongoose.model('Manager', managerSchema)