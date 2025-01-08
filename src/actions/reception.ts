"use server";

import { receptionSchema } from "@/schemas";
import { z } from "zod";
import { checkRoleByAuth } from "./check-role";
import { prisma } from "@/db/prisma";

export const createReception = async (
  values: z.infer<typeof receptionSchema>,
  vehiculeNewState: boolean
) => {
  const validatedFields = receptionSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de gerer les receptions!" };
  const {
    amortisseurCheck,
    batterieCheck,
    carrosserieCheck,
    chassierCheck,
    clientId,
    climatiseurCheck,
    feuxCheck,
    freinsCheck,
    kilo,
    pneuxCheck,
    reservationId,
    salonCheck,
    swiglassCheck,
    tableauCheck,
    vehiculeId,
    amortisseur,
    batterie,
    carrosserie,
    chassier,
    climatiseur,
    feux,
    freins,
    pneux,
    salon,
    swiglass,
    tableau,
  } = validatedFields.data;
  const createReception = await prisma.reception.create({
    data: {
      kilo,
      amortisseur,
      amortisseurCheck,
      batterie,
      batterieCheck,
      carrosserie,
      carrosserieCheck,
      chassier,
      chassierCheck,
      clientId,
      reservationId,
      vehiculeId,
      climatiseur,
      climatiseurCheck,
      feux,
      feuxCheck,
      freins,
      freinsCheck,
      pneux,
      pneuxCheck,
      salon,
      salonCheck,
      swiglass,
      swiglassCheck,
      tableau,
      tableauCheck,
    },
  });
  if (!createReception) return { error: "Une erreur a ete survenue!" };
  await prisma.reservation.update({
    where: { id: reservationId },
    data: {
      state: "TERMINEE",
    },
  });
  const updateVehicule = await prisma.vehicule.update({
    where: { id: vehiculeId },
    data: {
      nextVidange: {
        decrement: kilo,
      },
    },
  });
  if (vehiculeNewState) {
    await prisma.vehicule.update({
      where: { id: vehiculeId },
      data: {
        available: false,
      },
    });
  }
  if (updateVehicule.nextVidange < 0) {
    await prisma.tasks.create({
      data: {
        type: "VIDANGE",
        note: "Le vehicule est besoin de vidange",
        vehiculeId,
      },
    });
  }
  if (!carrosserieCheck && carrosserie) {
    await prisma.tasks.create({
      data: {
        type: "PEINTURE",
        note: carrosserie,
        vehiculeId,
      },
    });
  }
  if (!batterieCheck && batterie) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: batterie,
        vehiculeId,
      },
    });
  }
  if (!amortisseurCheck && amortisseur) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: amortisseur,
        vehiculeId,
      },
    });
  }
  if (!freinsCheck && freins) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: freins,
        vehiculeId,
      },
    });
  }
  if (!chassierCheck && chassier) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: chassier,
        vehiculeId,
      },
    });
  }
  if (!pneuxCheck && pneux) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: pneux,
        vehiculeId,
      },
    });
  }
  if (!feuxCheck && feux) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: feux,
        vehiculeId,
      },
    });
  }
  if (!swiglassCheck && swiglass) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: swiglass,
        vehiculeId,
      },
    });
  }
  if (!salonCheck && salon) {
    await prisma.tasks.create({
      data: {
        type: "PEINTURE",
        note: salon,
        vehiculeId,
      },
    });
  }
  if (!tableauCheck && tableau) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: tableau,
        vehiculeId,
      },
    });
  }
  if (!climatiseurCheck && climatiseur) {
    await prisma.tasks.create({
      data: {
        type: "MAINTENANCE",
        note: climatiseur,
        vehiculeId,
      },
    });
  }

  return { success: "Reception a ete creer avec success!" };
};
