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

import { MdOutlineDeleteSweep } from "react-icons/md";
import NewMarque from "./NewMarque";
import Image from "next/image";
import { useQuery } from "react-query";
import { getMaruqes } from "@/actions/marques";
import LoadingData from "../../LoadingData";
import NoData from "../../NoData";
import EditMarque from "./EditMarque";

const MarquesList = () => {
  const { data: marques, isLoading } = useQuery("getMarques", getMaruqes);
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
          {isLoading ? (
            <TableCaption>
              <LoadingData />
            </TableCaption>
          ) : !marques ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead className="w-[200px]">Nom de la marque</TableHead>
              <TableHead>Nombre de vehicules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marques
              ? marques.map((marque, index) => (
                  <TableRow key={`marque-${index}`}>
                    <TableCell>
                      <Image
                        src={`https://utfs.io/f/${marque.image}`}
                        width={35}
                        height={35}
                        alt="image"
                        className="rounded-full"
                      />
                    </TableCell>
                    <TableCell>{marque.name}</TableCell>
                    <TableCell>{marque._count.vehicules}</TableCell>

                    <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                      <EditMarque marqueOnEdit={marque} />
                      <MdOutlineDeleteSweep className="size-6 text-destructive" />
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

export default MarquesList;
