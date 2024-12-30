"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { FaRegEdit } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

const ReservationList = () => {
  const [date, setDate] = useState<DateRange>();
  const invoices = [
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "En cours",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "Terminer",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "Annuler",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "En cours",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "Terminer",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "Annuler",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "En cours",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "Terminer",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
    {
      carName: "Kia picanto",
      plate: "A 60066",
      color: "Red",
      statut: "Annuler",
      DateDebut: "10/08/2024",
      DateEnd: "15/08/2024",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Reservation list</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <Button className="flex flex-row gap-2 items-center">
            <FaSquarePlus className="size-4" />
            Nouvelle reservation
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row items-center w-full justify-end gap-4">
          <Input
            placeholder="Chercher par nom du vehicule"
            className="w-[300px] bg-white"
          />
          <Input
            placeholder="Chercher par nom du client"
            className="w-[300px] bg-white"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Selectioner une periode</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="Changer le filtre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Statut</SelectLabel>
                <SelectItem value="apple">En cours</SelectItem>
                <SelectItem value="banana">Terminer</SelectItem>
                <SelectItem value="blueberry">Annuler</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableCaption>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Vehicule</TableHead>
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
            {invoices.map((reservation, index) => (
              <TableRow key={`reseravtion-${index}`}>
                <TableCell className="font-medium">
                  {reservation.carName}
                </TableCell>
                <TableCell>{reservation.plate}</TableCell>
                <TableCell>{reservation.color}</TableCell>
                <TableCell>{reservation.DateDebut}</TableCell>
                <TableCell>{reservation.DateEnd}</TableCell>
                <TableCell>
                  <div
                    className={`px-4 w-fit text-white rounded-lg ${
                      reservation.statut === "En cours"
                        ? "bg-green-500"
                        : reservation.statut === "Annuler"
                        ? "bg-destructive"
                        : "bg-blue-500"
                    }`}
                  >
                    {reservation.statut}
                  </div>
                </TableCell>
                <TableCell>Afficher informations</TableCell>
                <TableCell className="flex flex-row gap-3 items-center justify-end text-right">
                  {reservation.statut === "En cours" ? (
                    <TbTruckReturn className="size-6 text-emerald-500 cursor-pointer " />
                  ) : null}

                  <FaRegEdit className="size-6 text-blue-500 cursor-pointer" />
                  <MdOutlineDeleteSweep className="size-6 text-destructive cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReservationList;
