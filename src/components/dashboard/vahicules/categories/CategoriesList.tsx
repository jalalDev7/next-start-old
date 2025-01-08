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
import NewCategorie from "./NewGategorie";
import { useQuery } from "react-query";
import { getCategories } from "@/actions/categories";
import Image from "next/image";
import NoData from "../../NoData";
import LoadingData from "../../LoadingData";
import EditCategorie from "./EditCategorie";

const CategoriesList = () => {
  const { data: categories, isLoading } = useQuery(
    "getCategories",
    getCategories
  );

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
          {isLoading ? (
            <TableCaption>
              <LoadingData />
            </TableCaption>
          ) : !categories ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead className="w-[300px]">Nom de categorie</TableHead>
              <TableHead>Nombre de vehicules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories
              ? categories.map((categories, index) => (
                  <TableRow key={`categorie-${index}`}>
                    <TableCell className="font-medium">
                      <Image
                        src={`https://utfs.io/f/${categories.image}`}
                        width={35}
                        height={35}
                        alt="image"
                        className="rounded-full "
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {categories.name}
                    </TableCell>
                    <TableCell>{categories._count.vehicules}</TableCell>

                    <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                      <EditCategorie catOnEdit={categories} />
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

export default CategoriesList;
