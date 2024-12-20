import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username or email is required"),
  password: z.string().min(6, "Password is required"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
  rePassword: z
    .string()
    .min(6, "Please make sure both passwords are the same."),
});
