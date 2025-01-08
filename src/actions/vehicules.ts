"use server";
import { vehiculeSchema } from "@/schemas";
import { z } from "zod";
import { checkRoleByAuth } from "./check-role";
import { prisma } from "@/db/prisma";
import { addDays } from "date-fns";

// create vehicule
export const createVehicule = async (
  values: z.infer<typeof vehiculeSchema>
) => {
  const validatedFields = vehiculeSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();

  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de creer un vehicule!" };
  const {
    images,
    name,
    assurance,
    available,
    category,
    color,
    gear,
    kilo,
    marque,
    motor,
    passengers,
    plate,
    tax,
    coffre,
    finish,
    price,
    nextVidange,
  } = validatedFields.data;
  const create = await prisma.vehicule.create({
    data: {
      name,
      images,
      assurance,
      coffre,
      color,
      gear,
      kilo,
      nextVidange,
      motor,
      passengers,
      plate,
      tax,
      available,
      finish,
      createdAt: new Date(),
      cateId: category,
      marqueId: marque,
      price,
    },
  });
  if (!create) return { error: "Un probleme est survenu, veillez resseyer!" };

  return { success: "Vehicule a ete creer avec success!" };
};

// Update vehicule
export const updateVehicule = async (
  values: z.infer<typeof vehiculeSchema>,
  id: string
) => {
  if (!id) return { error: "Aucun vehicule selectione" };
  const validatedFields = vehiculeSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de modifier un vehicule!" };
  const {
    images,
    name,
    assurance,
    available,
    category,
    color,
    gear,
    kilo,
    nextVidange,
    marque,
    motor,
    passengers,
    plate,
    tax,
    coffre,
    finish,
    price,
  } = validatedFields.data;
  const create = await prisma.vehicule.update({
    where: { id: id },
    data: {
      name,
      images,
      assurance,
      coffre,
      color,
      gear,
      kilo,
      nextVidange,
      motor,
      passengers,
      plate,
      tax,
      available,
      finish,
      updatedAt: new Date(),
      cateId: category,
      marqueId: marque,
      price,
    },
  });
  if (!create) return { error: "Un probleme est survenu, veillez resseyer!" };

  return { success: "Vehicule a ete modifier avec success!" };
};

// get all vehicules
export const getVehicules = async (
  queryName: string | undefined,
  filtre: string | undefined
) => {
  if (filtre === "5001") {
  } else {
  }
  const vehicules = await prisma.vehicule.findMany({
    where: {
      ...(queryName
        ? {
            name: {
              contains: queryName,
              mode: "insensitive",
            },
          }
        : {}),
      ...(filtre === "indisponible"
        ? {
            available: false,
          }
        : filtre === "disponible"
        ? {
            available: true,
          }
        : filtre === "taxPlus"
        ? {
            tax: {
              gte: addDays(new Date(), 31),
            },
          }
        : filtre === "taxMoin"
        ? {
            tax: {
              lte: addDays(new Date(), 31),
            },
          }
        : filtre === "taxExpire"
        ? {
            tax: {
              lte: new Date(),
            },
          }
        : filtre === "assurancePlus"
        ? {
            assurance: {
              gte: addDays(new Date(), 31),
            },
          }
        : filtre === "assuranceMoin"
        ? {
            assurance: {
              lte: addDays(new Date(), 31),
            },
          }
        : filtre === "assuranceExpire"
        ? {
            assurance: {
              lte: new Date(),
            },
          }
        : filtre === "5001"
        ? {
            nextVidange: {
              gte: 5001,
            },
          }
        : filtre === "5000"
        ? {
            nextVidange: {
              lte: 5000,
            },
          }
        : filtre === "1000"
        ? {
            nextVidange: {
              lte: 1000,
            },
          }
        : filtre === "1"
        ? {
            nextVidange: {
              lte: 0,
            },
          }
        : {}),
    },

    include: {
      categorie: {
        select: {
          name: true,
        },
      },
      marque: {
        select: {
          name: true,
        },
      },
    },
  });
  return vehicules;
};

export const getVehiculeById = async (id: string) => {
  if (!id) return null;
  const getVehicule = await prisma.vehicule.findFirst({
    where: { id },
  });
  if (!getVehicule) return null;
  const categorie = await prisma.categories.findUnique({
    where: { id: getVehicule.cateId },
  });
  const marque = await prisma.marques.findUnique({
    where: { id: getVehicule.marqueId },
  });
  return { vehicule: getVehicule, categorie: categorie, marque: marque };
};

export const deleteBusyDay = async (day: Date, id: string) => {
  if (!id) return { error: "Veuillez selectioner un vehicule!" };
  if (!day) return { error: "Veuillez selectioner une date!" };
  const checkExistingVehicule = await prisma.vehicule.findUnique({
    where: { id },
    select: { busyDays: true },
  });
  if (!checkExistingVehicule) return { error: "Vehicule introuvable" };
  const oldDaysString = checkExistingVehicule.busyDays.map((d) => d.toString());
  const newDays = oldDaysString
    .filter((d) => d.toString() !== day.toString())
    .map((d) => new Date(d));
  const updateVehiculeDays = await prisma.vehicule.update({
    where: { id },
    data: {
      busyDays: newDays,
    },
  });
  if (!updateVehiculeDays)
    return { error: "Un probleme est survenu, veuillez réessayer!" };
  return { success: "Vehicule modifier avec success!" };
};
