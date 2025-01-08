import { getVehiculeById } from "@/actions/vehicules";
import { EditVehicule } from "@/components/dashboard/vahicules/vehicules/EditVehicule";
import { redirect } from "next/navigation";
import React from "react";
interface VehiculeProps {
  params: { vehicule: string };
}
const page = async ({ params }: VehiculeProps) => {
  const { vehicule } = await params;
  const vehiculeData = await getVehiculeById(vehicule);
  if (!vehiculeData) redirect("/dashboard/vehicules");
  return (
    <EditVehicule
      vehicule={vehiculeData.vehicule}
      categorie={vehiculeData.categorie}
      marque={vehiculeData.marque}
    />
  );
};
export default page;
