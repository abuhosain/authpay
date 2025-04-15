import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const singupUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.signUpUserIntoDb(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is registered successfully",
    data: result,
  });
});


export const UserControllers = {
singupUser
}