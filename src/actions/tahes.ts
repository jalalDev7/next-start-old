"use server";

import { prisma } from "@/db/prisma";
import { tacheSchema } from "@/schemas";
import { z } from "zod";
import { checkRoleByAuth } from "./check-role";

export const getTaches = async (
  filtre: string | undefined,
  vehicule: string | undefined
) => {
  const getTaches = await prisma.tasks.findMany({
    where: {
      ...(vehicule
        ? {
            Vehicule: {
              name: {
                contains: vehicule,
                mode: "insensitive",
              },
            },
          }
        : {}),
      ...(filtre && filtre === "terminee"
        ? {
            state: true,
          }
        : filtre && filtre === "attente"
        ? {
            state: false,
          }
        : filtre && filtre === "all"
        ? {
            state: false,
          }
        : null),
    },
    include: {
      Vehicule: {
        include: {
          marque: true,
        },
      },
    },
  });

  if (!getTaches) return null;
  return { taches: getTaches };
};

export const validateTache = async (id: string) => {
  if (!id) return { error: "Veuillez selectioner une tache!" };
  const updateTache = await prisma.tasks.update({
    where: { id },
    data: {
      state: true,
    },
  });
  if (!updateTache)
    return { error: "Un probleme est servenu, veillez resseyer!" };
  return { success: "Le statut a ete changer avec success!" };
};

export const createTask = async (values: z.infer<typeof tacheSchema>) => {
  const validatedFields = tacheSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de modifier un vehicule!" };
  const { state, type, lastDate, note, vehiculeId } = validatedFields.data;
  const create = await prisma.tasks.create({
    data: {
      state,
      lastDate,
      type,
      vehiculeId,
      note,
    },
  });
  if (!create) return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "Tache a ete creer avec success!" };
};
