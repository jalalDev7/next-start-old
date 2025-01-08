"use server";

import { marqueSchema } from "@/schemas";
import { z } from "zod";
import { checkRoleByAuth } from "./check-role";
import { prisma } from "@/db/prisma";

export const createMarque = async (values: z.infer<typeof marqueSchema>) => {
  const validatedFields = marqueSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de creer une marque!" };
  const { image, name } = validatedFields.data;
  const createMarque = await prisma.marques.create({
    data: {
      name,
      image,
    },
  });
  if (!createMarque)
    return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "La marque a ete creer avec success!" };
};

export const updtaeMarque = async (
  values: z.infer<typeof marqueSchema>,
  id: string
) => {
  if (!id) return { error: "Veillez selectionner une marque" };
  const validatedFields = marqueSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de modifier une marque!" };
  const { image, name } = validatedFields.data;
  const updateMarque = await prisma.marques.update({
    where: { id },
    data: {
      name,
      image,
    },
  });
  if (!updateMarque)
    return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "La marque a ete modifier avec success!" };
};

export const getMaruqes = async () => {
  const marques = await prisma.marques.findMany({
    include: {
      _count: {
        select: {
          vehicules: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return marques;
};
