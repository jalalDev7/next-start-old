import { DiscountType, reservationState } from "@prisma/client";

export interface vehiculeType {
  id: string;
  name: string;
  color: string;
  plate: string;
  motor: string;
  gear: string;
  kilo: number;
  nextVidange: number;
  images: string[];
  assurance: Date;
  tax: Date;
  passengers: number;
  coffre: string | null;
  finish: string[];
  createdAt: Date;
  updatedAt: Date | null;
  available: boolean;
  cateId: string;
  marqueId: string;
  price: number;
  busyDays: Date[];
}
export interface categorieType {
  id: string;
  name: string;
  description: string | null;
  image: string;
}
export interface marqueType {
  id: string;
  name: string;
  image: string;
}

export interface clientData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  mobile: string;
  cid: string | null;
  permis: string | null;
  passport: string | null;
  confirmed: boolean;
  userId: string | null;
}

export interface coupnType {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  maxUsage: number | null;
  usedCount: number;
  expirationDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  users: string | null;
}

export interface reservationType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  vehiculeId: string;
  clientId: string;
  startDate: Date;
  endDate: Date;
  daysList: Date[];
  state: reservationState;
  paymentStatut: boolean;
  totalPrice: number;
  pickup: string | null;
  dropOff: string | null;
  pickupTime: string | null;
  dropOffTime: string | null;
  note: string | null;
  couponId: string | null;
  assurance: string | null;
  limitKm: number | null;
}
