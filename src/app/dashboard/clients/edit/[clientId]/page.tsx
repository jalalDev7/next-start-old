import { getClientsById } from "@/actions/client";
import EditClient from "@/components/dashboard/clients/EditClient";
import { redirect } from "next/navigation";
import React from "react";

interface clientProp {
  params: { clientId: string };
}

const page = async ({ params }: clientProp) => {
  const { clientId } = await params;
  if (!clientId) redirect(`/dashboard/clients`);

  const client = await getClientsById(clientId);
  if (!client) redirect(`/dashboard/clients`);
  return <EditClient client={client} />;
};

export default page;
