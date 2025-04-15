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


export const UserValidation = {
    userValidationSchema
}