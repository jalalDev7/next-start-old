"use server";

import { prisma } from "@/db/prisma";
import { reservationSchema } from "@/schemas";
import { eachDayOfInterval, format } from "date-fns";
import { checkRoleByAuth } from "./check-role";
import { z } from "zod";
import { DateRange } from "react-day-picker";
import { reservationState } from "@prisma/client";

export const checkDisponibilte = async (
  id: string,
  days: Date[],
  oldDays: Date[] | undefined
) => {
  if (!id) return { error: "Veillez selectioner un vehicule!" };
  if (!days || days.length === 0) return null;
  const datesTocheck = days.map((date) => date.toString());
  const vehicule = await prisma.vehicule.findUnique({
    where: { id },
    select: {
      busyDays: true,
    },
  });
  if (!vehicule) return { error: "Vehicule introuvable!" };
  let vehiculeBusyDaysStrings = vehicule.busyDays.map((d) => d.toString());

  if (oldDays) {
    const datesTocheckOld = oldDays.map((date) => date.toString());
    const sameReservationDay = vehicule.busyDays
      .filter((d) => datesTocheckOld.includes(d.toString()))
      .map((d) => d.toString());

    vehiculeBusyDaysStrings = vehiculeBusyDaysStrings.filter(
      (d) => !sameReservationDay.includes(d)
    );
  }

  const filteredDays = vehiculeBusyDaysStrings.filter((dbDay) =>
    datesTocheck.includes(dbDay)
  );
  if (filteredDays.length > 0)
    return {
      error: `Le vehicule ne sera pas disponible durant ces jours : ${filteredDays.map(
        (d) => `${format(d, "dd/MM/yyyy")} `
      )}`,
    };
  return null;
};

export const createReservation = async (
  values: z.infer<typeof reservationSchema>
) => {
  const validatedFields = reservationSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };

  const {
    clientId,
    dropOff,
    endDate,
    paymentStatut,
    pickup,
    startDate,
    state,
    totalPrice,
    vehiculeId,
    assurance,
    couponId,
    limitKm,
    note,
    dropOffTime,
    pickupTime,
  } = validatedFields.data;
  const create = await prisma.reservation.create({
    data: {
      endDate,
      startDate,
      state,
      totalPrice,
      assurance,
      couponId,
      clientId,
      vehiculeId,
      dropOff,
      limitKm,
      note,
      paymentStatut,
      pickup,
      dropOffTime,
      pickupTime,
      daysList: eachDayOfInterval({ start: startDate, end: endDate }),
    },
  });
  if (!create) return { error: "Un probleme est survenu, veillez resseyer!" };
  const updateVehiculeDays = await prisma.vehicule.update({
    where: { id: vehiculeId },
    data: {
      busyDays: {
        push: eachDayOfInterval({ start: startDate, end: endDate }),
      },
    },
  });
  if (!updateVehiculeDays) {
    await prisma.reservation.delete({
      where: {
        id: create.id,
      },
    });
    return { error: "Un probleme est survenu, veillez resseyer!" };
  }

  return { success: "Reservation a ete creer avec success!", resId: create.id };
};

export const updateReservation = async (
  values: z.infer<typeof reservationSchema>,
  id: string
) => {
  if (!id) return { error: "Veillez selectioner une reservation" };
  const validatedFields = reservationSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };

  const {
    clientId,
    dropOff,
    endDate,
    paymentStatut,
    pickup,
    startDate,
    state,
    totalPrice,
    vehiculeId,
    assurance,
    couponId,
    limitKm,
    note,
    dropOffTime,
    pickupTime,
  } = validatedFields.data;

  const existingReservation = await prisma.reservation.findUnique({
    where: { id },
  });
  if (!existingReservation) return { error: "Reservation introuvable!" };

  const oldDays = existingReservation.daysList.map((d) => d.toString());

  const getVehiuleDays = await prisma.vehicule.findUnique({
    where: { id: vehiculeId },
    select: { busyDays: true },
  });
  if (!getVehiuleDays) return { error: "Un probleme est survenue!" };

  const NewDates = eachDayOfInterval({ start: startDate, end: endDate });

  const update = await prisma.reservation.update({
    where: { id },
    data: {
      endDate,
      startDate,
      state,
      totalPrice,
      assurance,
      couponId,
      clientId,
      vehiculeId,
      dropOff,
      limitKm,
      note,
      paymentStatut,
      pickup,
      daysList: NewDates,
      dropOffTime,
      pickupTime,
    },
  });
  if (!update) return { error: "Un probleme est survenu, veillez resseyer!" };

  const newDays = getVehiuleDays.busyDays
    .filter((d) => !oldDays.includes(d.toString()))
    .map((d) => new Date(d));
  console.log("new", newDays);
  NewDates.map((d) => newDays.push(d));

  await prisma.vehicule.update({
    where: { id: vehiculeId },
    data: {
      busyDays: newDays,
    },
  });

  return {
    success: "Reservation a ete modifier avec success!",
    resId: update.id,
  };
};
export const getReservation = async (
  clientName: string | undefined,
  vehiculeName: string | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  filtre: string | undefined,
  clientId: string | null
) => {
  const reservations = await prisma.reservation.findMany({
    where: {
      ...(startDate
        ? {
            startDate,
          }
        : endDate
        ? { endDate }
        : {}),
      ...(clientName
        ? {
            client: {
              OR: [
                {
                  firstName: {
                    contains: clientName,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: clientName,
                    mode: "insensitive",
                  },
                },
              ],
            },
          }
        : {}),
      ...(vehiculeName
        ? {
            vehicule: {
              name: {
                contains: vehiculeName,
                mode: "insensitive",
              },
            },
          }
        : {}),
      ...(filtre === "ATTENTE"
        ? {
            state: filtre,
          }
        : filtre === "ANNULEE"
        ? {
            state: filtre,
          }
        : filtre === "ENCOURS"
        ? {
            state: filtre,
          }
        : filtre === "TERMINEE"
        ? {
            state: filtre,
          }
        : {}),
      ...(clientId
        ? {
            clientId: clientId,
          }
        : null),
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return reservations;
};
export const getReservationById = async (id: string) => {
  if (!id) return null;
  const getReservation = await prisma.reservation.findFirst({
    where: { id },
  });
  if (!getReservation) return null;
  const client = await prisma.client.findUnique({
    where: { id: getReservation.clientId },
  });
  const vehicule = await prisma.vehicule.findUnique({
    where: { id: getReservation.vehiculeId },
  });
  return { reservation: getReservation, client: client, vehicule: vehicule };
};

export const reservationEditState = async (
  id: string,
  state: reservationState
) => {
  if (!id) return { error: "Veillez selectioner une reservation!" };
  if (!state) return { error: "Veillez selectioner le nouveau statut!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de modifier la reservation!" };

  const existingReservation = await prisma.reservation.findUnique({
    where: { id },
  });

  if (!existingReservation) return { error: "La reservation est introuvable!" };

  if (state === "ANNULEE") {
    const getVehiculeBusyDays = await prisma.vehicule.findUnique({
      where: { id: existingReservation.vehiculeId },
      select: { busyDays: true },
    });
    if (!getVehiculeBusyDays)
      return { error: "Un probleme est servenu, Vehicule introuvable!" };

    // Stringfy old dates
    const oldDays = existingReservation.daysList.map((d) => d.toString());
    // Filtring old days
    const filtredDays = getVehiculeBusyDays.busyDays.filter(
      (d) => !oldDays.includes(d.toString())
    );
    // Format new days
    const resolveDate = filtredDays.map((d) => new Date(d));
    const deleteVehiculeDays = await prisma.vehicule.update({
      where: { id: existingReservation.vehiculeId },
      data: {
        busyDays: resolveDate,
      },
    });
    if (!deleteVehiculeDays)
      return { error: "Un probleme est servenu, veillez resseyer!" };
  }

  const update = await prisma.reservation.update({
    where: { id },
    data: {
      state,
    },
  });
  if (!update) return { error: "Un probleme est servenu, veillez resseyer!" };

  return { success: "Le statut a ete changer avec success!" };
};
