"use server";

import { clientSchema } from "@/schemas";
import { z } from "zod";
import { checkRoleByAuth } from "./check-role";
import { prisma } from "@/db/prisma";

export const createClient = async (
  values: z.infer<typeof clientSchema>,
  redirect: string
) => {
  const validatedFields = clientSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de creer un client!" };
  const {
    address,
    cid,
    city,
    confirmed,
    email,
    firstName,
    lastName,
    mobile,
    passport,
    permis,
  } = validatedFields.data;
  const checkExistingClient = await prisma.client.findFirst({
    where: {
      OR: [{ cid }, { email }, { permis }, { passport }],
    },
  });
  if (checkExistingClient) {
    if (checkExistingClient.email === email)
      return { error: "Client deja exist, veillez verifier l'email!" };
    if (checkExistingClient.cid === cid)
      return { error: "Client deja exist, veillez verifier CID!" };
    if (checkExistingClient.permis === permis)
      return {
        error: "Client deja exist, veillez verifier identifiant du permis!",
      };
    if (checkExistingClient.passport === passport)
      return {
        error: "Client deja exist, veillez verifier identifiant du passport!",
      };
  }

  const create = await prisma.client.create({
    data: {
      address,
      cid,
      permis,
      passport,
      city,
      email,
      firstName,
      lastName,
      mobile,
      confirmed,
    },
  });
  if (!create) return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "Le clienta ete creer avec success!", redirect };
};

export const getClientsByfiltre = async (
  email?: string,
  cid?: string,
  name?: string
) => {
  if (!email && !cid && !name) return null;
  const clients = await prisma.client.findMany({
    where: {
      ...(name
        ? {
            OR: [
              {
                firstName: {
                  contains: name,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: name,
                  mode: "insensitive",
                },
              },
            ],
          }
        : email
        ? {
            email: {
              contains: email,
              mode: "insensitive",
            },
          }
        : cid
        ? {
            cid: {
              contains: cid,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: {
      _count: {
        select: {
          reservation: true,
        },
      },
    },
    orderBy: {
      firstName: "asc",
    },
  });

  return clients;
};

export const getClientsById = async (id: string) => {
  if (!id) return null;
  const clients = await prisma.client.findFirst({
    where: {
      id,
    },
  });

  return clients;
};

export const getClients = async (
  filtre: string | undefined,
  name: string | undefined
) => {
  const getClients = await prisma.client.findMany({
    where: {
      ...(name
        ? {
            OR: [
              {
                firstName: {
                  contains: name,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: name,
                  mode: "insensitive",
                },
              },
            ],
          }
        : null),
      ...(filtre === "active"
        ? {
            confirmed: true,
          }
        : filtre === "inactive"
        ? {
            confirmed: false,
          }
        : null),
    },
    orderBy: {
      firstName: "desc",
    },
    include: {
      _count: {
        select: {
          reservation: true,
        },
      },
    },
  });
  return getClients;
};

export const updateClientState = async (id: string, state: boolean) => {
  const update = await prisma.client.update({
    data: {
      confirmed: state,
    },
    where: {
      id,
    },
  });
  if (!update) return { error: "Un probleme est servenu, veillez resseyer!" };
  return { success: "Le statut a ete changer avec success!" };
};

export const updateClient = async (
  values: z.infer<typeof clientSchema>,
  id: string
) => {
  if (!id) return { error: "Veuillez selectioner un client!" };
  const validatedFields = clientSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "Veillez completer la formulaire!" };
  const checkRole = await checkRoleByAuth();
  if (!checkRole.isAdmin && !checkRole.isTeam)
    return { error: "Vous n'avez pas le droit de modifier un client!" };
  const {
    address,
    cid,
    city,
    confirmed,
    email,
    firstName,
    lastName,
    mobile,
    passport,
    permis,
  } = validatedFields.data;

  const update = await prisma.client.update({
    where: { id },
    data: {
      address,
      cid,
      permis,
      passport,
      city,
      email,
      firstName,
      lastName,
      mobile,
      confirmed,
    },
  });
  if (!update) return { error: "Un probleme est survenu, veillez resseyer!" };
  return { success: "Le clienta ete modifier avec success!" };
};
