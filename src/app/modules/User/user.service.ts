import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ILoginUser, IUser } from "./user.interface";
import { User } from "./user.model";
import { createToken, verifyToken } from "./user.utils";
import config from "../../config";

const signUpUserIntoDb = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email is already taken");
  }
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const user: any = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is deleted");
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is blocked");
  }

  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, "Incorrect password");
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
    name: user?.name,
    username: user?.username,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refrsh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const getUserWithAuth = async (email: string) => {
  const user = await User.findOne({ email: email });
  return user;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { email, iat } = decoded
  // checking if the user is exist
  const user : any = await User.isUserExistsByEmail(email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
    name: user?.name,
    username: user?.username, 
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  )

  return {
    accessToken,
  }
}

export const UserServices = {
  signUpUserIntoDb,
  loginUser,
  getUserWithAuth,
  refreshToken
};
