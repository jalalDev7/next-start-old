"use client";
import { reservationEditState } from "@/actions/reservation";
import FormError from "@/components/notifications/FormError";
import FormSuccess from "@/components/notifications/FormSuccess";
import { Button } from "@/components/ui/button";
import { clientData, reservationType, vehiculeType } from "@/types/types";
import { reservationState } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoPrint } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import BackLink from "../BackLink";

const ReservationEditState = ({
  vehicule,
  client,
  reservation,
}: {
  vehicule: vehiculeType;
  client: clientData;
  reservation: reservationType;
}) => {
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const handleState = (state: reservationState) => {
    reservationEditState(reservation.id, state).then((res) => {
      setFormError("");
      setFormSuccess("");
      if (res && res.error) setFormError(res.error);
      if (res && res.success) {
        setFormSuccess(res.success);
        redirect("/dashboard/reservation");
      }
    });
  };
  return (
    <div className="flex flex-col w-full">
      <FormError message={formError} />
      <FormSuccess message={formSuccess} />

      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-row justify-between items-start w-full pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-lg font-semibold text-nowrap ">
                Resumee de la reservation :
              </h2>
              {reservation.state !== "ANNULEE" ? (
                <Link href={`/dashboard/reservation/edit/${reservation.id}`}>
                  <Button>
                    <RiEdit2Fill className="size-6  cursor-pointer" />
                    Modifier
                  </Button>
                </Link>
              ) : null}
              <Link href={`/dashboard/reservation/edit/${reservation.id}`}>
                <Button>
                  <IoPrint className="size-6  cursor-pointer" />
                  Imprimer
                </Button>
              </Link>
            </div>

            <h3 className="text-sm">
              <span className="font-semibold">Periode du reservation : </span>
              {format(reservation.startDate, "dd/MM/yyyy")} -{" "}
              {format(reservation.endDate, "dd/MM/yyyy")}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Statut du paiement : </span>
              <span
                className={`rounded-lg px-4 text-white ${
                  reservation.paymentStatut ? "bg-green-500" : "bg-destructive"
                }`}
              >
                {reservation.paymentStatut ? "Payer" : "Non payer"}
              </span>
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Prix total : </span>
              {reservation.totalPrice} Dhs
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Lieu et heure du pick-up : </span>
              {reservation.pickup} {reservation.pickupTime}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">
                Lieu et heure du recuperation :{" "}
              </span>
              {reservation.dropOff} {reservation.dropOffTime}
            </h3>
            {reservation.assurance ? (
              <h3 className="text-sm">
                <span className="font-semibold">
                  Assurance supplementaire :{" "}
                </span>
                {reservation.assurance}
              </h3>
            ) : null}
            {reservation.limitKm ? (
              <h3 className="text-sm">
                <span className="font-semibold">Limite de kilometrage : </span>
                {reservation.limitKm} Km
              </h3>
            ) : null}
            {reservation.note ? (
              <h3 className="text-sm">
                <span className="font-semibold">
                  Informations supplementaire :{" "}
                </span>
                {reservation.note}
              </h3>
            ) : null}
            <div className="flex flex-col max-w-[400px] text-sm border-b border-primary/15 pb-4">
              <h3 className="font-semibold">Liste des jours : </h3>
              <div className="flex flex-row gap-1">
                {reservation.daysList.map((day, index) => (
                  <div
                    key={`day-${index}`}
                    className="px-2 border border-primary rounded-lg"
                  >
                    {format(day, "dd/MM/yyyy")}
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-sm mt-2">
              <span className="font-semibold">Nom du vehicule : </span>
              {vehicule.name}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Plaque du vehicule : </span>
              {vehicule.plate}
            </h3>
            <h3 className="text-sm border-b border-primary/15 pb-2">
              <span className="font-semibold">Couleur du vehicule : </span>
              {vehicule.color}
            </h3>

            <h3 className="text-sm mt-2">
              <span className="font-semibold">Nom du client : </span>
              {client.firstName} {client.lastName}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Telephone du client : </span>
              {client.mobile}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Email du client : </span>
              {client.email}
            </h3>
            {client.cid ? (
              <h3 className="text-sm">
                <span className="font-semibold">CID du client : </span>
                {client.cid}
              </h3>
            ) : null}
            {client.permis ? (
              <h3 className="text-sm">
                <span className="font-semibold">Identifiant du permis : </span>
                {client.permis}
              </h3>
            ) : null}
            {client.passport ? (
              <h3 className="text-sm">
                <span className="font-semibold">Passport : </span>
                {client.passport}
              </h3>
            ) : null}
            <h3 className="text-sm">
              <span className="font-semibold">Addrese du client : </span>
              {client.address} {client.city}
            </h3>
          </div>
          <Image
            src={`https://utfs.io/f/${vehicule.images[0]}`}
            width={450}
            height={450}
            alt="Vehicule image"
            className="rounded-lg aspect-square object-cover"
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full border-t pt-4 border-primary/15">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-lg font-semibold text-nowrap">
              Modifier la statut :
            </h2>

            <div className="flex flex-row w-full items-center justify-end gap-2">
              {reservation.state !== "ANNULEE" ? (
                <>
                  {reservation.state !== "TERMINEE" ? (
                    <div
                      className="px-4 py-1 w-fit text-white rounded-lg bg-green-500 cursor-pointer"
                      onClick={() => handleState("TERMINEE")}
                    >
                      TERMINEE
                    </div>
                  ) : null}
                  {reservation.state !== "ENCOURS" ? (
                    <div
                      className="px-4 py-1 w-fit text-white rounded-lg bg-blue-500 cursor-pointer"
                      onClick={() => handleState("ENCOURS")}
                    >
                      ENCOURS
                    </div>
                  ) : null}
                  {reservation.state !== "ATTENTE" ? (
                    <div
                      className="px-4 py-1 w-fit text-white rounded-lg bg-zinc-500 cursor-pointer"
                      onClick={() => handleState("ATTENTE")}
                    >
                      ATTENTE
                    </div>
                  ) : null}
                </>
              ) : null}

              {reservation.state !== "ANNULEE" ? (
                <div
                  className="px-4 py-1 w-fit text-white rounded-lg bg-destructive cursor-pointer"
                  onClick={() => handleState("ANNULEE")}
                >
                  ANNULEE
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="font-semibold">Statut actual :</h1>
            <div
              className={`px-4 py-1 w-fit text-white rounded-lg ${
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
          </div>
        </div>
      </div>
      <BackLink
        link="/dashboard/reservation"
        text="Retourner vers la liste des reservations"
      />
    </div>
  );
};

export default ReservationEditState;
