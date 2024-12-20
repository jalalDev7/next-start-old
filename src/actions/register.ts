"use server";

import { getUserByEmail, getUserByUsername } from "@/data/user";
import { prisma } from "@/db/prisma";
import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { username, email, password, rePassword } = validatedFields.data;

  if (password !== rePassword) {
    return { error: "Please make sure both passwords are the same." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const checkUsername = await getUserByUsername(username);
  if (checkUsername) {
    return { error: "Username already existe" };
  }
  const checkEmail = await getUserByEmail(email);
  if (checkEmail) {
    return { error: "Email already existe" };
  }
  await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });
  // TODO send email verification later
  return { success: "Register success!" };
};
