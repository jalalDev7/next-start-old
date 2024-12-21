import { prisma } from "@/db/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
};
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const getToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return getToken;
  } catch {
    return null;
  }
};
