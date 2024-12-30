"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
export const deleteImageByKey = async (key: string) => {
  try {
    await utapi.deleteFiles(key);

    return { success: "Le fichier a ete supprime" };
  } catch {
    return { error: "Fichier non supprime!" };
  }
};
