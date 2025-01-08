"use server";

import { auth } from "@/auth";

export const checkRoleByAuth = async () => {
  const result = { isUser: false, isTeam: false, isAdmin: false };
  const session = await auth();
  if (!session || !session.user || !session.user.role) return result;
  if (session.user.role === "ADMIN") result.isAdmin = true;
  if (session.user.role === "TEAM") result.isTeam = true;
  if (session.user.role === "USER") result.isUser = true;
  return result;
};
