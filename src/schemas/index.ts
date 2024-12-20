import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Please enter your name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
  rePassword: z
    .string()
    .min(6, "Please make sure both passwords are the same."),
});
