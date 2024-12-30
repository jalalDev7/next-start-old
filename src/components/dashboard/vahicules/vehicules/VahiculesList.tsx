"use client";
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
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaSquarePlus } from "react-icons/fa6";
import Link from "next/link";

const VehiculesList = () => {
  const invoices = [
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
    {
      name: "Kia picanto",
      image: "/kia_logo.webp",
      color: "Red",
      plate: "A 66006",
      marque: "KIA",
      category: "Voiture economique",
      motor: "Diesel",
      gear: "Manuel",
      kilo: "250000",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Vehicules liste</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <Link href="/dashboard/vehicules/new">
            <Button className="flex flex-row gap-2 items-center">
              <FaSquarePlus className="size-4" />
              Nouvelle vehicule
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row items-center w-full justify-end gap-4">
          <Input
            placeholder="Chercher par nom du vehicule"
            className="w-[300px] bg-white"
          />
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
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Marque</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Couleur</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>Moteur</TableHead>
              <TableHead>Gear</TableHead>
              <TableHead>Kilometrage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((car, index) => (
              <TableRow key={`car-${index}`}>
                <TableCell>
                  <Image
                    src={car.image}
                    width={40}
                    height={40}
                    alt="image"
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.marque}</TableCell>
                <TableCell>{car.category}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell>{car.plate}</TableCell>
                <TableCell>{car.motor}</TableCell>
                <TableCell>{car.gear}</TableCell>
                <TableCell>{car.kilo} Km</TableCell>

                <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                  <FaRegEdit className="size-6 text-blue-500" />
                  <MdOutlineDeleteSweep className="size-6 text-destructive" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehiculesList;
