import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Please enter your name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum of 6 characters required!"),
  rePassword: z
    .string()
    .min(6, "Please make sure both passwords are the same."),
});

export const resetSchema = z.object({
  email: z.string().min(3, "Email is required"),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Minimum of 6 characters required!"),
});

export const vehiculeSchema = z.object({
  name: z.string().min(3, "Le nom est obligatoire!"),
  color: z.string().min(3, "La couleur est obligatoire!"),
  plate: z.string().min(3, "La plaque est obligatoire!"),
  marque: z.string().min(3, "La marque est obligatoire!"),
  category: z.string().min(3, "La categorie est obligatoire!"),
  motor: z.string().min(3, "Le type de carburant est obligatoire!"),
  gear: z.string().min(3, "Le type de moteur est obligatoire!"),
  kilo: z.coerce.number().min(1, "Le kilometrage est obligatoire!"),
  images: z.array(z.string()).min(1, "Une/Des photos est obligatoire!"),
  assurance: z.date(),
  tax: z.date(),
  passengers: z.coerce.number().min(1, "Le nombre de voageurs est obligatoir!"),
  coffre: z.string().optional(),
  finish: z.array(z.string()).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(3, "Le nom est obligatoire!"),
  description: z.string().optional(),
});

export const marqueSchema = z.object({
  name: z.string().min(3, "Le nom est obligatoire!"),
  image: z.string().min(3, "La photo est obligatoire!"),
});
