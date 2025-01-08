"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import NoData from "../../NoData";
import Image from "next/image";
import { format } from "date-fns";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { deleteBusyDay, getVehiculeById } from "@/actions/vehicules";
import LoadingData from "../../LoadingData";
import FormError from "@/components/notifications/FormError";
import FormSuccess from "@/components/notifications/FormSuccess";

const VehiculeCalander = ({ vehiculeId }: { vehiculeId: string }) => {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const { data: vehicule, isLoading } = useQuery(
    ["getVehiculeById", { vehiculeId }],
    () => getVehiculeById(vehiculeId)
  );

  const filtredDays = vehicule?.vehicule.busyDays.filter((d) => d > new Date());
  const handleDelete = (day: Date) => {
    deleteBusyDay(day, vehiculeId).then((res) => {
      if (res.error) {
        setFormError("");
        setFormSuccess("");
        setFormError(res.error);
      }
      if (res.success) {
        setFormError("");
        setFormSuccess("");
        setFormSuccess(res.success);
        queryClient.invalidateQueries("getVehiculeById");
      }
    });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-xl font-semibold">Liste des jours reservee</h1>
        <p className="text-xs">
          Cette page est destinée à la gestion des erreurs liées aux jours de
          réservation des véhicules. Il est préférable de gérer les réservations
          directement sur la page dédiée aux réservations.
        </p>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />
        <Table>
          {isLoading ? (
            <TableCaption>
              <LoadingData />
            </TableCaption>
          ) : !vehicule?.vehicule ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : !filtredDays || filtredDays.length < 1 ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Marque</TableHead>
              <TableHead>Nom</TableHead>

              <TableHead>Date</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtredDays && vehicule && vehicule.vehicule && vehicule.marque
              ? filtredDays.map((date, index) => (
                  <TableRow key={`date-${index}`}>
                    <TableCell>
                      <Image
                        src={`https://utfs.io/f/${vehicule.vehicule.images[0]}`}
                        width={35}
                        height={35}
                        alt="image"
                        className="rounded-full"
                      />
                    </TableCell>
                    <TableCell>{vehicule.marque?.name}</TableCell>
                    <TableCell>{vehicule.vehicule.name}</TableCell>

                    <TableCell>{format(date, "dd/MM/yyyy")}</TableCell>

                    <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                      <MdOutlineDeleteSweep
                        className="size-6 text-destructive cursor-pointer"
                        onClick={() => handleDelete(date)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehiculeCalander;
