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
import NewMarque from "./NewMarque";
import Image from "next/image";

const MarquesList = () => {
  const invoices = [
    {
      name: "Kia",
      image: "/kia_logo.webp",
      totalVehicules: "5",
    },
    {
      name: "Mercedes",
      image: "/kia_logo.webp",
      totalVehicules: "3",
    },
    {
      name: "BMW",
      image: "/kia_logo.webp",
      totalVehicules: "2",
    },
    {
      name: "Dacia",
      image: "/kia_logo.webp",
      totalVehicules: "10",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Marques liste</h1>
        <div className="flex flex-row gap-4 text-nowrap">
          <NewMarque />
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
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead className="w-[200px]">Nom de la marque</TableHead>
              <TableHead>Totale vehicules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((marque, index) => (
              <TableRow key={`marque-${index}`}>
                <TableCell>
                  <Image
                    src={marque.image}
                    width={35}
                    height={35}
                    alt="image"
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{marque.name}</TableCell>
                <TableCell>{marque.totalVehicules}</TableCell>

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

export default MarquesList;
