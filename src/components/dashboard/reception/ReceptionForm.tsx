"use client";
import { receptionSchema } from "@/schemas";
import { clientData, reservationType, vehiculeType } from "@/types/types";
import { format } from "date-fns";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import FormError from "@/components/notifications/FormError";
import FormSuccess from "@/components/notifications/FormSuccess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoMdCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { createReception } from "@/actions/reception";
import { redirect } from "next/navigation";
import { useQueryClient } from "react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ReceptionForm = ({
  reservation,
  client,
  vehicule,
}: {
  reservation: reservationType;
  client: clientData;
  vehicule: vehiculeType;
}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [kilo, setKilo] = useState(true);
  const [kiloActual, setKiloActual] = useState<number | undefined>();
  const [carrosserie, setCarrosserie] = useState(true);
  const [chassier, setChassier] = useState(true);
  const [feux, setFeux] = useState(true);
  const [pneux, setPneux] = useState(true);
  const [salon, setSalon] = useState(true);
  const [batterie, setBatterie] = useState(true);
  const [amortisseur, setAmortisseur] = useState(true);
  const [climatiseur, setClimatiseur] = useState(true);
  const [freins, setFreins] = useState(true);
  const [swiglass, setSwiglass] = useState(true);
  const [tableau, setTableau] = useState(true);
  const [vehiculeNewState, setVehiculeNewState] = useState(false);

  const form = useForm<z.infer<typeof receptionSchema>>({
    resolver: zodResolver(receptionSchema),
    defaultValues: {
      vehiculeId: vehicule.id,
      clientId: client.id,
      reservationId: reservation.id,
      amortisseurCheck: amortisseur,
      amortisseur: undefined,
      batterieCheck: batterie,
      batterie: undefined,
      carrosserieCheck: carrosserie,
      carrosserie: undefined,
      chassierCheck: chassier,
      chassier: undefined,
      climatiseurCheck: climatiseur,
      climatiseur: undefined,
      feuxCheck: feux,
      feux: undefined,
      freinsCheck: freins,
      freins: undefined,
      pneuxCheck: pneux,
      pneux: undefined,
      salonCheck: salon,
      salon: undefined,
      tableauCheck: tableau,
      tableau: undefined,
      swiglassCheck: swiglass,
      swiglass: undefined,
      kilo: undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof receptionSchema>) => {
    startTransition(() => {
      createReception(values, vehiculeNewState).then((res) => {
        if (res.error) {
          setFormSuccess(undefined);
          setFormError(res.error);
        }
        if (res.success) {
          setFormError(undefined);
          setFormSuccess(res.success);

          queryClient.invalidateQueries("getReservations");
          redirect(`/dashboard/reservation`);
        }
      });
    });
  };
  useEffect(() => {
    if (kiloActual) {
      if (vehicule.nextVidange - kiloActual < 0) {
        setVehiculeNewState(false);
        setKilo(false);
      }
    }
    if (kiloActual) form.setValue("kilo", kiloActual);

    form.setValue("carrosserieCheck", carrosserie);
    form.setValue("chassierCheck", chassier);
    form.setValue("feuxCheck", feux);
    form.setValue("pneuxCheck", pneux);
    form.setValue("salonCheck", salon);
    form.setValue("amortisseurCheck", amortisseur);
    form.setValue("batterieCheck", batterie);
    form.setValue("freinsCheck", freins);
    form.setValue("swiglassCheck", swiglass);
    form.setValue("tableauCheck", tableau);
    form.setValue("climatiseurCheck", climatiseur);
  }, [
    carrosserie,
    kiloActual,
    chassier,
    feux,
    pneux,
    salon,
    amortisseur,
    batterie,
    climatiseur,
    freins,
    swiglass,
    tableau,
    form,
    vehicule.nextVidange,
  ]);
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Reception du vehicule</h1>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-4">
        <div className="flex flex-row justify-between items-start w-full pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-lg font-semibold text-nowrap ">
                Resumee de la reservation :
              </h2>
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
        <FormError message={formError} />
        <FormSuccess message={formSuccess} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="kilo"
                        render={() => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Kilometrage actual :
                            </FormLabel>
                            <FormControl>
                              <Input
                                onChange={(e) =>
                                  setKiloActual(Number(e.currentTarget.value))
                                }
                                disabled={isPending}
                                type="number"
                                placeholder="120000"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 ${
                            !kilo ? "bg-destructive/45" : null
                          }`}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap ">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2  ${
                            kilo ? "bg-emerald-500/45" : null
                          }`}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 " />
                          <FormLabel className="text-nowrap ">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="carrosserie"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat du carrosserie :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || carrosserie}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !carrosserie ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setCarrosserie(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            carrosserie ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setCarrosserie(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="chassier"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat du chassier :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || chassier}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !chassier ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setChassier(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            chassier ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setChassier(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="feux"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat des feux :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || feux}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !feux ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setFeux(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            feux ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setFeux(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="pneux"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat des pneux :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || pneux}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !pneux ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setPneux(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            pneux ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setPneux(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="amortisseur"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat des amortisseurs :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || amortisseur}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !amortisseur ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setAmortisseur(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            amortisseur ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setAmortisseur(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="tableau"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat du tableau de bord :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || tableau}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !tableau ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setTableau(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            tableau ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setTableau(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="salon"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat du salon interieur :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || salon}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !salon ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setSalon(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            salon ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setSalon(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="batterie"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat du batterie :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || batterie}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !batterie ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setBatterie(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            batterie ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setBatterie(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="climatiseur"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat du climatiseur :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || climatiseur}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !climatiseur ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setClimatiseur(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            climatiseur ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setClimatiseur(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="swiglass"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat des swiglass :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || swiglass}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !swiglass ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setSwiglass(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            swiglass ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setSwiglass(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-start w-full gap-4">
                      <FormField
                        control={form.control}
                        name="freins"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold">
                              Etat des freins :
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending || freins}
                                type="text"
                                className="w-full"
                                placeholder="En cas de probleme, creer une tache ici"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2  pt-3">
                      <FormLabel className="text-nowrap font-semibold">
                        Etat :
                      </FormLabel>
                      <div className="flex flex-row gap-3 items-center">
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            !freins ? "bg-destructive/45" : null
                          }`}
                          onClick={() => setFreins(false)}
                        >
                          <IoMdCloseCircle
                            className={`text-destructive size-6 `}
                          />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Mauvais état
                          </FormLabel>
                        </div>
                        <div
                          className={`flex flex-row items-center border border-primary/15 rounded-lg px-4 py-1 gap-2 cursor-pointer ${
                            freins ? "bg-emerald-500/45" : null
                          }`}
                          onClick={() => setFreins(true)}
                        >
                          <IoMdCheckmarkCircle className="text-emerald-500 size-6 cursor-pointer" />
                          <FormLabel className="text-nowrap cursor-pointer">
                            Bonne état
                          </FormLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full ">
              <div className="flex flex-row w-full items-center gap-4">
                <Checkbox
                  id="availableCheck"
                  checked={vehiculeNewState}
                  onCheckedChange={(e) =>
                    setVehiculeNewState(e.valueOf() ? true : false)
                  }
                />

                <Label htmlFor="availableCheck">
                  Le vehicule est hors service ?
                </Label>
              </div>
              <Button disabled={isPending} type="submit" className="mt-8">
                Valider la reservation
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReceptionForm;
