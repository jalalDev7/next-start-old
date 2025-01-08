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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaSquarePlus } from "react-icons/fa6";
import Link from "next/link";
import { useQuery } from "react-query";
import { getVehicules } from "@/actions/vehicules";
import { differenceInDays } from "date-fns";
import { useState } from "react";
import LoadingData from "../LoadingData";
import NoData from "../NoData";
import { clientData } from "@/types/types";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

const SelectVehicule = ({ client }: { client: clientData }) => {
  const [queryName, setQueryName] = useState<string | undefined>();
  const [filtre, setFiltre] = useState<string | undefined>();
  const { data: vehicules, isLoading } = useQuery(
    ["getVehicules", { queryName, filtre }],
    () => getVehicules(queryName, filtre)
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Vehicules liste</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <Link href="/dashboard/vehicules/new">
            <Button className="flex flex-row gap-2 items-center">
              <FaSquarePlus className="size-4" />
              Nouveau vehicule
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row items-center w-full justify-end gap-4">
          <Input
            placeholder="Chercher par nom du vehicule"
            className="w-[300px] bg-white"
            onChange={(e) => setQueryName(e.currentTarget.value)}
          />
          <Select onValueChange={(e) => setFiltre(e)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="Changer le filtre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Pas de filtre</SelectItem>
                <SelectLabel>Disponibilte</SelectLabel>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="indisponible">Indisponible</SelectItem>
                <SelectLabel>Vignette</SelectLabel>
                <SelectItem value="taxPlus">Plus d&apos;un mois</SelectItem>
                <SelectItem value="taxMoin">Moins d&apos;un mois</SelectItem>
                <SelectItem value="taxExpire">Expirer</SelectItem>
                <SelectLabel>Assurance</SelectLabel>
                <SelectItem value="assurancePlus">
                  Plus d&apos;un mois
                </SelectItem>
                <SelectItem value="assuranceMoin">
                  Moins d&apos;un mois
                </SelectItem>
                <SelectItem value="assuranceExpire">Expirer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table>
          {isLoading ? (
            <TableCaption>
              <LoadingData />
            </TableCaption>
          ) : !vehicules ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Marque</TableHead>
              <TableHead>Nom</TableHead>

              <TableHead>Couleur</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>Moteur</TableHead>
              <TableHead>Gear</TableHead>
              <TableHead>Kilometrage</TableHead>
              <TableHead>Voyageurs</TableHead>
              <TableHead>Assurance</TableHead>
              <TableHead>Vignette</TableHead>
              <TableHead>Disponibilte</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicules
              ? vehicules.map((car, index) => (
                  <TableRow key={`car-${index}`}>
                    <TableCell>
                      <Image
                        src={`https://utfs.io/f/${car.images[0]}`}
                        width={35}
                        height={35}
                        alt="image"
                        className="rounded-full"
                      />
                    </TableCell>
                    <TableCell>{car.marque.name}</TableCell>
                    <TableCell>{car.name}</TableCell>

                    <TableCell>{car.color}</TableCell>
                    <TableCell>{car.plate}</TableCell>
                    <TableCell>{car.motor}</TableCell>
                    <TableCell>{car.gear}</TableCell>
                    <TableCell>{car.kilo} Km</TableCell>
                    <TableCell>{car.passengers} personnes</TableCell>
                    <TableCell>
                      <div
                        className={`flex w-fit px-4 text-white rounded-lg ${
                          differenceInDays(car.assurance, new Date()) <= 0
                            ? "bg-destructive"
                            : differenceInDays(car.assurance, new Date()) < 31
                            ? "bg-destructive/65"
                            : "bg-emerald-500"
                        }`}
                      >
                        {differenceInDays(car.assurance, new Date())} jours
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex w-fit px-4 text-white rounded-lg ${
                          differenceInDays(car.tax, new Date()) <= 0
                            ? "bg-destructive"
                            : differenceInDays(car.tax, new Date()) < 31
                            ? "bg-destructive/65"
                            : "bg-emerald-500"
                        }`}
                      >
                        {differenceInDays(car.tax, new Date())} jours
                      </div>
                    </TableCell>

                    <TableCell>
                      <div
                        className={`flex w-fit px-4 text-white rounded-lg ${
                          !car.available ? "bg-destructive" : "bg-blue-500"
                        }`}
                      >
                        {car.available ? "Disponible" : "Non disponible"}
                      </div>
                    </TableCell>
                    <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                      {car.available ? (
                        <Link
                          href={`/dashboard/reservation/new/${client.id}/${car.id}`}
                        >
                          <TbPlayerTrackNextFilled className="size-6 text-emerald-500 cursor-pointer" />
                        </Link>
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

export default SelectVehicule;
