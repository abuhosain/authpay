import { z } from "zod";
const userValidationSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required").trim(),
    name: z.string().min(1, "Name is required").trim(),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required")
      .trim(),
    password: z
      .string()
      .min(1, "Password is required")
      .max(20, { message: "Password can not be more than 20 characters" })
      .trim(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email  is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema
};
