import { getReservationById } from "@/actions/reservation";
import ReservationEditState from "@/components/dashboard/reservation/ReservationEditState";
import { redirect } from "next/navigation";
import React from "react";
interface reservationProp {
  params: { reservationId: string };
}
const page = async ({ params }: reservationProp) => {
  const { reservationId } = await params;
  const reservationData = await getReservationById(reservationId);
  if (
    !reservationData ||
    !reservationData.client ||
    !reservationData.vehicule ||
    !reservationData.reservation
  )
    redirect("/dashboard/reservation");
  return (
    <ReservationEditState
      client={reservationData.client}
      vehicule={reservationData.vehicule}
      reservation={reservationData.reservation}
    />
  );
};

export default page;
