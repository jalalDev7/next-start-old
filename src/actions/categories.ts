"use server";

import { categorySchema } from "@/schemas";
import { z } from "zod";
import { checkRoleByAuth } from "./check-role";
import { prisma } from "@/db/prisma";

export const createCategorie = async (
  values: z.infer<typeof categorySchema>
) => {
  const validatedFields = categorySchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de creer une categorie!" };
  const { image, name, description } = validatedFields.data;
  const createCat = await prisma.categories.create({
    data: {
      name,
      description,
      image,
    },
  });
  if (!createCat)
    return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "La categorie a ete creer avec success!" };
};

export const updateCategorie = async (
  values: z.infer<typeof categorySchema>,
  id: string
) => {
  if (!id) return { error: "Veillez selectioner une categorie!" };
  const validatedFields = categorySchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de modifier une categorie!" };
  const { image, name, description } = validatedFields.data;
  const updateCat = await prisma.categories.update({
    where: { id },
    data: {
      name,
      description,
      image,
    },
  });
  if (!updateCat)
    return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "La categorie a ete modifier avec success!" };
};

export const getCategories = async () => {
  const cats = await prisma.categories.findMany({
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

  return cats;
};
