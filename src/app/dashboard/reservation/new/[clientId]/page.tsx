import { getClientsById } from "@/actions/client";
import SelectVehicule from "@/components/dashboard/reservation/SelectVehicule";
import { redirect } from "next/navigation";
import React from "react";
interface clientProp {
  params: { clientId: string };
}
const page = async ({ params }: clientProp) => {
  const { clientId } = await params;
  const clientData = await getClientsById(clientId);
  if (!clientData) redirect("/dashboard/reservation/new");
  return <SelectVehicule client={clientData} />;
};

export default page;
