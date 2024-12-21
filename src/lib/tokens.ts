import { getVerificationTokenByEmail } from "@/data/verification-token";
import { prisma } from "@/db/prisma";
import { v4 as uuidv4 } from "uuid";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1H

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken },
    });
  }

  await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return { email: email, token: token };
};
