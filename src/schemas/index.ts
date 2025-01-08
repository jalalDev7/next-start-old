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
  nextVidange: z.coerce
    .number()
    .min(
      1,
      "Veuillez entrer le killometrage naiccessaire pour le prochain vidange!"
    ),
  images: z.array(z.string()).min(1, "Une/Des photos est obligatoire!"),
  assurance: z.date(),
  tax: z.date(),
  passengers: z.coerce
    .number()
    .min(1, "Le nombre de voageurs est obligatoire!"),
  coffre: z.string().optional(),
  finish: z.array(z.string()).optional(),
  available: z.boolean(),
  price: z.coerce.number().min(1, "Le prix initial est obligatoire!"),
});

export const categorySchema = z.object({
  name: z.string().min(3, "Le nom est obligatoire!"),
  description: z.string().optional(),
  image: z.string().min(1, "La photo/L'icone de categorie est obligatoire!"),
});

export const marqueSchema = z.object({
  name: z.string().min(3, "Le nom est obligatoire!"),
  image: z.string().min(3, "La photo est obligatoire!"),
});

export const reservationSchema = z.object({
  vehiculeId: z.string().min(1, "Veuillez selectionner un vehicule!"),
  clientId: z.string().min(1, "Veuillez selectionner un client!"),
  startDate: z.date(),
  endDate: z.date(),
  state: z.enum(["ANNULEE", "TERMINEE", "ATTENTE", "ENCOURS"]),
  paymentStatut: z.boolean(),
  totalPrice: z.coerce.number(),
  pickup: z.string(),
  dropOff: z.string(),
  pickupTime: z.string(),
  dropOffTime: z.string(),
  note: z.string().optional(),
  couponId: z.string().optional(),
  assurance: z.string().optional(),
  limitKm: z.coerce.number().optional(),
});

export const clientSchema = z.object({
  email: z.string().min(5, "L'email est obligatoire!"),
  firstName: z.string().min(1, "Le nom est obligatoire!"),
  lastName: z.string().min(1, "Le prenom est obligatoire!"),
  address: z.string().min(3, "L'addresse est obligatoire!"),
  city: z.string().min(1, "La ville est obligatoire!"),
  mobile: z.string().min(1, "Le telephone est obligatoire!"),
  cid: z.string().optional(),
  permis: z.string().optional(),
  passport: z.string().optional(),
  confirmed: z.boolean().default(false),
});

export const receptionSchema = z.object({
  vehiculeId: z.string().min(1, "Veuillez selectioner un un vehicule!"),
  clientId: z.string().min(1, "Veuillez selectioner un client!"),
  reservationId: z.string().min(1, "veuillez selectioner une reservation!"),
  kilo: z.coerce.number(),
  carrosserieCheck: z.boolean().default(true),
  carrosserie: z.string().optional(),
  batterieCheck: z.boolean().default(true),
  batterie: z.string().optional(),
  amortisseurCheck: z.boolean().default(true),
  amortisseur: z.string().optional(),
  freinsCheck: z.boolean().default(true),
  freins: z.string().optional(),
  chassierCheck: z.boolean().default(true),
  chassier: z.string().optional(),
  pneuxCheck: z.boolean().default(true),
  pneux: z.string().optional(),
  feuxCheck: z.boolean().default(true),
  feux: z.string().optional(),
  swiglassCheck: z.boolean().default(true),
  swiglass: z.string().optional(),
  salonCheck: z.boolean().default(true),
  salon: z.string().optional(),
  tableauCheck: z.boolean().default(true),
  tableau: z.string().optional(),
  climatiseurCheck: z.boolean().default(true),
  climatiseur: z.string().optional(),
});

export const tacheSchema = z.object({
  type: z.enum(["MAINTENANCE", "PEINTURE", "VIDANGE", "VIGNETTE"]),
  state: z.boolean().default(false),
  lastDate: z.date().optional(),
  note: z.string().optional(),
  vehiculeId: z.string().optional(),
});
