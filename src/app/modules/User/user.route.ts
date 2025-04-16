import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { USER_ROLE } from "./auth.constance";
import auth from "../../middleware/auth";

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

router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserControllers.getUserWithAuth,
  )

  // refrsh token
router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken,
)


export const UserRoutes = router;
