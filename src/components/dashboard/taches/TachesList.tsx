"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCheckCircle } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaSquarePlus } from "react-icons/fa6";
import Link from "next/link";
import { useQuery, useQueryClient } from "react-query";
import { format } from "date-fns";
import { useState } from "react";

import LoadingData from "../LoadingData";
import NoData from "../NoData";
import { getTaches, validateTache } from "@/actions/tahes";
import FormError from "@/components/notifications/FormError";
import FormSuccess from "@/components/notifications/FormSuccess";

const TachesList = () => {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [vehicule, setVehicule] = useState<string | undefined>();
  const [filtre, setFiltre] = useState<string | undefined>("attente");
  const { data: taches, isLoading } = useQuery(
    ["getTaches", { filtre, vehicule }],
    () => getTaches(filtre, vehicule)
  );
  const handleState = (id: string) => {
    validateTache(id).then((res) => {
      if (res.error) {
        setFormSuccess("");
        setFormError("");
        setFormError(res.error);
      }
      if (res.success) {
        setFormSuccess("");
        setFormError("");
        setFormSuccess(res.success);
        queryClient.invalidateQueries("getTaches");
      }
    });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Taches liste</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <Link href="/dashboard/taches/create">
            <Button className="flex flex-row gap-2 items-center">
              <FaSquarePlus className="size-4" />
              Nouvelle taches
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row items-center w-full justify-end gap-4">
          <Input
            placeholder="Chercher par nom du vehicule"
            className="w-[300px] bg-white"
            onChange={(e) => setVehicule(e.currentTarget.value)}
          />
          <Select onValueChange={(e) => setFiltre(e)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="Changer le filtre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tache statut</SelectLabel>
                <SelectItem value="attente">Attente</SelectItem>
                <SelectItem value="terminee">Terminee</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />
        <Table>
          {isLoading ? (
            <TableCaption>
              <LoadingData />
            </TableCaption>
          ) : !taches || taches.taches.length < 1 ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead className="min-w-[100px]">Marque</TableHead>
              <TableHead className="min-w-[150px]">Nom</TableHead>

              <TableHead className="w-full">Message</TableHead>
              <TableHead className="min-w-[150px]">Type</TableHead>
              <TableHead className="min-w-[150px]">Date limite</TableHead>
              <TableHead className="min-w-[150px]">Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taches
              ? taches.taches.map((tache) => (
                  <TableRow key={`tache-${tache.id}`}>
                    <TableCell>
                      <Image
                        src={`https://utfs.io/f/${tache.Vehicule?.images[0]}`}
                        width={35}
                        height={35}
                        alt="image"
                        className="rounded-full"
                      />
                    </TableCell>
                    <TableCell>{tache.Vehicule?.marque.name}</TableCell>
                    <TableCell>{tache.Vehicule?.name}</TableCell>
                    <TableCell>{tache.note}</TableCell>
                    <TableCell>{tache.type}</TableCell>
                    <TableCell>
                      {tache.lastDate
                        ? format(tache.lastDate, "dd/MM/yyyy")
                        : null}
                    </TableCell>

                    <TableCell>
                      {!tache.state ? (
                        <div
                          className={`flex w-fit px-4 text-white rounded-lg bg-destructive text-nowrap `}
                        >
                          En attente
                        </div>
                      ) : (
                        <div
                          className={`flex w-fit px-4 text-white rounded-lg bg-emerald-500 text-nowrap `}
                        >
                          Terminée
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                      {!tache.state ? (
                        <FaCheckCircle
                          className="text-emerald-500 cursor-pointer size-6"
                          onClick={() => handleState(tache.id)}
                        />
                      ) : null}
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

export default TachesList;
