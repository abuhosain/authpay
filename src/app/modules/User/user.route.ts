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

export const UserRoutes = router;
