import { getClientsById } from "@/actions/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TableCell } from "@/components/ui/table";
import React from "react";
import { useQuery } from "react-query";
import LoadingData from "../LoadingData";

const ClientDataSheet = ({ clientId }: { clientId: string }) => {
  const { data: clientData, isLoading } = useQuery(["getClientById"], () =>
    getClientsById(clientId)
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableCell className="cursor-pointer font-semibold">
          Afficher les informations
        </TableCell>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Informations du client</SheetTitle>
          {clientData ? (
            <div className="flex flex-col w-full gap-2 text-sm pt-4">
              <div>
                <h2 className="font-semibold">Nom du client :</h2>
                <h3>
                  {clientData.firstName} {clientData.lastName}
                </h3>
              </div>
              {clientData.cid ? (
                <div>
                  <h2 className="font-semibold">CID du client :</h2>
                  <h3>{clientData.cid}</h3>
                </div>
              ) : null}
              {clientData.permis ? (
                <div>
                  <h2 className="font-semibold">Identifiant du permis :</h2>
                  <h3>{clientData.permis}</h3>
                </div>
              ) : null}
              {clientData.passport ? (
                <div>
                  <h2 className="font-semibold">Identifiant du passport :</h2>
                  <h3>{clientData.passport}</h3>
                </div>
              ) : null}
              <div>
                <h2 className="font-semibold">Email du client :</h2>
                <h3>{clientData.email}</h3>
              </div>
              <div>
                <h2 className="font-semibold">Telephone du client :</h2>
                <h3>{clientData.mobile}</h3>
              </div>
              <div>
                <h2 className="font-semibold">Addresse du client :</h2>
                <h3>{clientData.address}</h3>
              </div>
              <div>
                <h2 className="font-semibold">Ville du client :</h2>
                <h3>{clientData.city}</h3>
              </div>
              <div>
                <h2 className="font-semibold">Etat du client :</h2>
                {clientData.confirmed ? (
                  <h3 className="px-4 py-1 bg-green-500 w-fit rounded-lg text-white">
                    Confirmee
                  </h3>
                ) : (
                  <h3 className="px-4 py-1 bg-destructive w-fit rounded-lg text-white">
                    Non confirmee
                  </h3>
                )}
              </div>
            </div>
          ) : isLoading ? (
            <LoadingData />
          ) : null}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ClientDataSheet;
