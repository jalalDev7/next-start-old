import { getReservationById } from "@/actions/reservation";
import ReservationEditForm from "@/components/dashboard/reservation/ReservationEditForm";
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
    <ReservationEditForm
      reservation={reservation.reservation}
      client={reservation.client}
      vehicule={reservation.vehicule}
    />
  );
};

export default page;
