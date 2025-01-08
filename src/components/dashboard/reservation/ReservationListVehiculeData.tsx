"use client";
import { getVehiculeById } from "@/actions/vehicules";
import { TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useQuery } from "react-query";

const ReservationListVehiculeData = ({
  vehiculeId,
}: {
  vehiculeId: string;
}) => {
  const { data: vehiculeData, isLoading } = useQuery(
    ["getVehiculeById", vehiculeId],
    () => getVehiculeById(vehiculeId)
  );
  return (
    <>
      {vehiculeData ? (
        <>
          <TableCell className="font-medium">
            {vehiculeData.vehicule.name}
          </TableCell>
          <TableCell>{vehiculeData.vehicule.plate}</TableCell>
          <TableCell>{vehiculeData.vehicule.color}</TableCell>
        </>
      ) : isLoading ? (
        <>
          <TableCell className="font-medium">
            <Loader2 className="size-4 animate-spin" />
          </TableCell>
          <TableCell>
            <Loader2 className="size-4 animate-spin" />
          </TableCell>
          <TableCell>
            <Loader2 className="size-4 animate-spin" />
          </TableCell>
        </>
      ) : null}
    </>
  );
};

export default ReservationListVehiculeData;
