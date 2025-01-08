"use client";
import { getReservation } from "@/actions/reservation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { useQuery } from "react-query";
import ReservationListVehiculeData from "./ReservationListVehiculeData";
import LoadingData from "../LoadingData";
import NoData from "../NoData";
import ClientDataSheet from "./ClientDataSheet";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParams } from "next/navigation";

const ReservationList = () => {
  const searchParam = useSearchParams();
  const clientId = searchParam.get("clientId");
  console.log(clientId);
  const [clientName, setClientName] = useState<string | undefined>();
  const [vehiculeName, setVehiculeName] = useState<string | undefined>();
  const [filtre, setFiltre] = useState<string | undefined>("ENCOURS");
  const [startDate, setStartdate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const { data: reservations, isLoading } = useQuery(
    [
      "getReservation",
      { clientName, vehiculeName, startDate, endDate, filtre, clientId },
    ],
    () =>
      getReservation(
        clientName,
        vehiculeName,
        startDate,
        endDate,
        filtre,
        clientId
      )
  );
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Reservations liste</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <Link href="/dashboard/reservation/new">
            <Button className="flex flex-row gap-2 items-center">
              <FaSquarePlus className="size-4" />
              Nouvelle reservation
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row items-center w-full justify-end gap-4">
          <Input
            placeholder="Nom du vehicule"
            className="w-[200px] bg-white"
            onChange={(e) => setVehiculeName(e.currentTarget.value)}
          />
          <Input
            placeholder="Nom du client"
            className="w-[200px] bg-white"
            onChange={(e) => setClientName(e.currentTarget.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Selectionez une date de depart</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartdate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span>Selectionez une date de fin</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select onValueChange={(e) => setFiltre(e)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder={`Filtre: ${filtre}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">Pas de filtre</SelectItem>
                <SelectLabel>Statut</SelectLabel>
                <SelectItem value="ATTENTE">En attente</SelectItem>
                <SelectItem value="ENCOURS">En cours</SelectItem>
                <SelectItem value="TERMINEE">Terminer</SelectItem>
                <SelectItem value="ANNULEE">Annuler</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table>
          {isLoading ? (
            <TableCaption>
              <LoadingData />
            </TableCaption>
          ) : !reservations || reservations.length < 1 ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Vehicule</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>Couleur</TableHead>
              <TableHead>Debut</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations
              ? reservations.map((reservation) => (
                  <TableRow key={`reseravtion-${reservation.id}`}>
                    <ReservationListVehiculeData
                      vehiculeId={reservation.vehiculeId}
                    />
                    <TableCell>
                      {format(reservation.startDate, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(reservation.endDate, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex flex-row items-center gap-2 ${
                          reservation.state === "TERMINEE"
                            ? "text-green-500"
                            : reservation.state === "ANNULEE"
                            ? "text-destructive"
                            : reservation.state === "ENCOURS"
                            ? "text-blue-500"
                            : reservation.state === "ATTENTE"
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        <div
                          className={`px-4 w-fit text-white rounded-lg ${
                            reservation.state === "TERMINEE"
                              ? "bg-green-500"
                              : reservation.state === "ANNULEE"
                              ? "bg-destructive"
                              : reservation.state === "ENCOURS"
                              ? "bg-blue-500"
                              : reservation.state === "ATTENTE"
                              ? "bg-zinc-500"
                              : ""
                          }`}
                        >
                          {reservation.state}
                        </div>
                        {reservation.state !== "ANNULEE" &&
                        reservation.state !== "TERMINEE" ? (
                          <Link
                            href={`/dashboard/reservation/editState/${reservation.id}`}
                          >
                            <RiEdit2Fill className="size-6  cursor-pointer" />
                          </Link>
                        ) : null}
                        {reservation.endDate < new Date() &&
                        reservation.state === "ENCOURS" ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <IoIosWarning className="size-6 text-destructive" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Le véhicule doit être récupéré!</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : null}
                      </div>
                    </TableCell>
                    <ClientDataSheet clientId={reservation.clientId} />
                    <TableCell className="flex flex-row gap-3 items-center justify-end text-right">
                      {reservation.state === "ENCOURS" ? (
                        <Link href={`/dashboard/reception/${reservation.id}`}>
                          <TbTruckReturn className="size-6 text-emerald-500 cursor-pointer " />
                        </Link>
                      ) : null}
                      {reservation.state !== "ANNULEE" ? (
                        <Link
                          href={`/dashboard/reservation/edit/${reservation.id}`}
                        >
                          <FaRegEdit className="size-6 text-blue-500 cursor-pointer" />
                        </Link>
                      ) : null}
                      <MdOutlineDeleteSweep className="size-6 text-destructive cursor-pointer" />
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

export default ReservationList;
