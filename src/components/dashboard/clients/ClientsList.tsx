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
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";

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
import { getClients, updateClientState } from "@/actions/client";
import { LuClipboardList } from "react-icons/lu";

const ClientsList = () => {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [filtre, setFiltre] = useState<string | undefined>();
  const { data: clients, isLoading } = useQuery(
    ["getClients", { filtre, name }],
    () => getClients(filtre, name)
  );
  const handleState = (id: string, value: boolean) => {
    updateClientState(id, value).then((res) => {
      if (res.error) {
        setFormSuccess("");
        setFormError("");
        setFormError(res.error);
      }
      if (res.success) {
        setFormSuccess("");
        setFormError("");
        setFormSuccess(res.success);
        queryClient.invalidateQueries("getClients");
      }
    });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Clients liste</h1>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row items-center w-full justify-end gap-4">
          <Input
            placeholder="Chercher par nom ou prenom du client"
            className="w-[400px] bg-white"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Select onValueChange={(e) => setFiltre(e)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="Changer le filtre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Pas de filtre</SelectItem>
                <SelectLabel>Client statut</SelectLabel>
                <SelectItem value="active">Confirmé</SelectItem>
                <SelectItem value="inactive">Non confirmé</SelectItem>
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
          ) : !clients || clients.length < 1 ? (
            <TableCaption>
              <NoData />
            </TableCaption>
          ) : null}

          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">Nom</TableHead>
              <TableHead className="min-w-[100px]">Prenom</TableHead>
              <TableHead className="min-w-[100px]">Telephone</TableHead>
              <TableHead className="min-w-[100px]">CID</TableHead>
              <TableHead className="min-w-[100px]">Permis</TableHead>
              <TableHead className="min-w-[100px]">Passport</TableHead>
              <TableHead className="min-w-[100px]">Ville</TableHead>
              <TableHead className="min-w-[150px]">Email</TableHead>

              <TableHead className="min-w-[100px]">Reservations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients
              ? clients.map((client) => (
                  <TableRow key={`tache-${client.id}`}>
                    <TableCell>{client.lastName}</TableCell>
                    <TableCell>{client.firstName}</TableCell>
                    <TableCell>{client.mobile}</TableCell>
                    <TableCell>{client.cid}</TableCell>
                    <TableCell>{client.permis}</TableCell>
                    <TableCell>{client.passport}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="flex flex-row gap-2 items-center">
                      {client._count.reservation}{" "}
                      <Link
                        href={`/dashboard/reservation?clientId=${client.id}`}
                      >
                        <LuClipboardList className="size-6 cursor-pointer" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      {!client.confirmed ? (
                        <div
                          className={`flex w-fit px-4 text-white rounded-lg bg-destructive text-nowrap `}
                        >
                          Non confirmé
                        </div>
                      ) : (
                        <div
                          className={`flex w-fit px-4 text-white rounded-lg bg-emerald-500 text-nowrap `}
                        >
                          Confirmé
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="flex flex-row gap-2 items-center justify-end text-right">
                      {!client.confirmed ? (
                        <FaCheckCircle
                          className="text-emerald-500 cursor-pointer size-6"
                          onClick={() => handleState(client.id, true)}
                        />
                      ) : null}
                      <Link href={`/dashboard/clients/edit/${client.id}`}>
                        <FaRegEdit className="size-6 text-blue-500 cursor-pointer" />
                      </Link>
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

export default ClientsList;
