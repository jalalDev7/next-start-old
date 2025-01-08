import { Input } from "@/components/ui/input";
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
import NoData from "../NoData";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useQuery } from "react-query";
import { getClientsByfiltre } from "@/actions/client";
import LoadingData from "../LoadingData";
import { TbShoppingBagPlus } from "react-icons/tb";
import Link from "next/link";

const SelectClient = () => {
  const [name, setName] = useState<string | undefined>();
  const [cid, setCid] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const { data: clients, isLoading } = useQuery(
    ["getClientsByFiltre", { email, cid, name }],
    () => getClientsByfiltre(email, cid, name)
  );
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Selectioner un client</h1>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-row items-center justify-end gap-2">
            <Input
              type="text"
              placeholder="Chercher par email"
              className="w-[300px]"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Input
              type="text"
              placeholder="Chercher par nom ou prenom"
              className="w-[300px]"
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <Input
              type="text"
              placeholder="Chercher par CID (Recommender)"
              className="w-[300px]"
              onChange={(e) => setCid(e.currentTarget.value)}
            />
          </div>
          <Table>
            <TableCaption>
              {!clients ? (
                <NoData message="Veuillez chercher par Nom / CID / Email" />
              ) : isLoading ? (
                <LoadingData />
              ) : null}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nom de client</TableHead>
                <TableHead>CID</TableHead>
                <TableHead>Permis</TableHead>
                <TableHead>Passport</TableHead>
                <TableHead>Telephone</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Total reservation</TableHead>
                <TableHead>Confirme</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients?.map((client) => (
                <TableRow key={`reseravtion-${client.id}`}>
                  <TableCell>
                    {client.firstName} {client.lastName}
                  </TableCell>
                  <TableCell>{client.cid}</TableCell>
                  <TableCell>{client.permis}</TableCell>
                  <TableCell>{client.passport}</TableCell>
                  <TableCell>{client.mobile}</TableCell>
                  <TableCell>{client.city}</TableCell>
                  <TableCell>{client._count.reservation}</TableCell>

                  <TableCell>
                    <div
                      className={`px-4 w-fit text-white rounded-lg ${
                        client.confirmed ? "bg-green-500" : "bg-destructive"
                      } `}
                    >
                      {client.confirmed ? "Confirmée" : "Non confirmée"}
                    </div>
                  </TableCell>
                  <TableCell className="flex flex-row gap-3 items-center justify-end text-right">
                    <Link href={`/dashboard/reservation/new/${client.id}`}>
                      <TbShoppingBagPlus className="size-6 text-emerald-500 cursor-pointer" />
                    </Link>
                    <FaRegEdit className="size-6 text-blue-500 cursor-pointer" />
                    <MdOutlineDeleteSweep className="size-6 text-destructive cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SelectClient;
