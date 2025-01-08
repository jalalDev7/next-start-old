"use server";

import { prisma } from "@/db/prisma";

export const getCouponbyCode = async (code: string) => {
  if (!code) return null;
  const checkCoupon = await prisma.coupon.findUnique({
    where: { code, isActive: true },
  });
  if (!checkCoupon) return null;
  return checkCoupon;
};
