import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  UserControllers.singupUser,
  validateRequest(UserValidation.userValidationSchema)
);

router.post(
  "/login",
  UserControllers.loginUser,
  validateRequest(UserValidation.loginValidationSchema)
);

export const UserRoutes = router;
