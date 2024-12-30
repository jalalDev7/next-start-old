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
import NewCategorie from "./NewGategorie";

const CategoriesList = () => {
  const invoices = [
    {
      name: "Voitures de luxe",
      totalVehicules: "5",
    },
    {
      name: "Voitures economique",
      totalVehicules: "10",
    },
    {
      name: "Motos",
      totalVehicules: "8",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Categories liste</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <NewCategorie />
        </div>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
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
              <TableHead className="w-[300px]">Nom de categorie</TableHead>
              <TableHead>Totale vehicules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((categories, index) => (
              <TableRow key={`categorie-${index}`}>
                <TableCell className="font-medium">{categories.name}</TableCell>
                <TableCell>{categories.totalVehicules}</TableCell>

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

export default CategoriesList;
