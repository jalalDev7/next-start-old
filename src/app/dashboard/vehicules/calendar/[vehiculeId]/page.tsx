import VehiculeCalander from "@/components/dashboard/vahicules/vehicules/VehiculeCalander";
import { redirect } from "next/navigation";
import React from "react";
interface VehiculeProps {
  params: { vehiculeId: string };
}
const page = async ({ params }: VehiculeProps) => {
  const { vehiculeId } = await params;
  if (!vehiculeId) redirect("/dashboard/vehicules");

  return <VehiculeCalander vehiculeId={vehiculeId} />;
};
export default page;
