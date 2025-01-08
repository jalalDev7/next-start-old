import { getReservationById } from "@/actions/reservation";
import ReceptionForm from "@/components/dashboard/reception/ReceptionForm";

import { redirect } from "next/navigation";
import React from "react";
interface reservationProp {
  params: { reservationId: string };
}
const page = async ({ params }: reservationProp) => {
  const { reservationId } = await params;
  if (!reservationId) redirect(`/dashboard/reservation`);

  const reservation = await getReservationById(reservationId);
  if (
    !reservation ||
    !reservation.client ||
    !reservation.vehicule ||
    !reservation.reservation
  )
    redirect(`/dashboard/reservation`);
  return (
    <ReceptionForm
      vehicule={reservation.vehicule}
      client={reservation.client}
      reservation={reservation.reservation}
    />
  );
};

export default page;
