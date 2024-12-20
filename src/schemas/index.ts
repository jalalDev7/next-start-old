import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username or email is required"),
  password: z.string().min(6, "Password is required"),
});
