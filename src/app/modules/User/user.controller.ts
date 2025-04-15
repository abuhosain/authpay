import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import config from "../../config";

const singupUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.signUpUserIntoDb(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { accessToken, needsPasswordChange, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged succesfully",
    data: { needsPasswordChange, accessToken, refreshToken },
  });
});

export const UserControllers = {
  singupUser,
  loginUser,
};
