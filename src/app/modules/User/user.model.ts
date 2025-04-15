import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,  
      },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", 
    },
    userName: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next();
    }
  
    try {
      user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
      next();
    } catch (error : any) {
      return next(error);  
    }
  });
  
// Method to find user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await this.findOne({ email }).select('+password');  
  };


// Export the user model
export const User = model<IUser, UserModel>('User', userSchema);