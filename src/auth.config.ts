import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";
import { getUserByEmail, getUserByUsername } from "./data/user";
import bcrypt from "bcryptjs";
type dbUser = {
  id: string;
  email: string | null;
  image: string | null;
  username: string | null;
  password: string | null;
  emailVerified: Date | null;
} | null;

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          let user: dbUser = null;
          const { password, username } = validatedFields.data;
          const userByEmail = await getUserByEmail(username);
          if (!userByEmail) {
            const userByUsername = await getUserByUsername(username);
            if (userByUsername) {
              user = userByUsername;
            }
          } else {
            user = userByEmail;
          }
          if (!user) return null;
          if (!user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
