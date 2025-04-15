import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

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


// Export the user model
export const User = model<IUser, UserModel>('User', userSchema);