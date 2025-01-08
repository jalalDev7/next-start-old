import { getClientsById } from "@/actions/client";
import { getVehiculeById } from "@/actions/vehicules";
import NewReservationForm from "@/components/dashboard/reservation/NewReservationForm";

import { redirect } from "next/navigation";
import React from "react";
interface vehiculeProp {
  params: { vehiculeId: string; clientId: string };
}
const page = async ({ params }: vehiculeProp) => {
  const { vehiculeId, clientId } = await params;
  if (!vehiculeId || !clientId) redirect(`/dashboard/reservation/new`);
  const clientData = await getClientsById(clientId);
  if (!clientData) redirect(`/dashboard/reservation/new`);
  const vehiculeData = await getVehiculeById(vehiculeId);
  if (!vehiculeData) redirect(`/dashboard/reservation/new/${clientId}`);
  return (
    <NewReservationForm client={clientData} vehicule={vehiculeData.vehicule} />
  );
};

export default page;
