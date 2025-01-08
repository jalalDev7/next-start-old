"use client";
import { getCouponbyCode } from "@/actions/coupon";
import { checkDisponibilte, createReservation } from "@/actions/reservation";
import FormError from "@/components/notifications/FormError";
import FormSuccess from "@/components/notifications/FormSuccess";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { reservationSchema } from "@/schemas";
import { clientData, vehiculeType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { eachDayOfInterval, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

const NewReservationForm = ({
  client,
  vehicule,
}: {
  client: clientData;
  vehicule: vehiculeType;
}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>();
  const [coupon, setCoupon] = useState<string | undefined>();
  const [couponValue, setCouponValue] = useState<number | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [startDate, setStartdate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [periodDone, setPeriodDone] = useState(false);
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      vehiculeId: vehicule.id,
      clientId: client.id,
      assurance: undefined,
      couponId: undefined,
      dropOff: "Bureau",
      dropOffTime: undefined,
      endDate: endDate,
      startDate: startDate,
      limitKm: undefined,
      note: undefined,
      paymentStatut: false,
      pickup: "Bureau",
      pickupTime: undefined,
      state: "ATTENTE",
      totalPrice: 0,
    },
  });
  const onSubmit = (values: z.infer<typeof reservationSchema>) => {
    if (periodDone) {
      startTransition(() => {
        createReservation(values).then((res) => {
          if (res.error) {
            setFormSuccess(undefined);
            setFormError(res.error);
          }
          if (res.success) {
            setFormError(undefined);
            setFormSuccess(res.success);
            setPeriodDone(false);
            setCoupon(undefined);
            setCouponValue(undefined);
            setEndDate(undefined);
            setStartdate(undefined);
            form.reset();
            queryClient.invalidateQueries("getReservations");
            redirect(`/dashboard/reservation/editState/${res.resId}`);
          }
        });
      });
    } else {
      setFormError("Veillez selectioner une periode valid!");
    }
  };
  useEffect(() => {
    if (couponValue) {
      form.setValue("totalPrice", form.getValues("totalPrice") - couponValue);
    }
  }, [couponValue, form]);
  useEffect(() => {
    if (coupon) {
      setCouponValue(undefined);
      getCouponbyCode(coupon).then((res) => {
        if (res) {
          setCouponValue(res.discountValue);
          form.setValue("couponId", res.id);
        }
      });
    }
  }, [coupon, form]);
  useEffect(() => {
    if (endDate) {
      form.setValue("endDate", endDate);
    } else {
      form.resetField("endDate");
    }
    if (startDate) {
      form.setValue("startDate", startDate);
    } else {
      form.resetField("startDate");
    }
    if (startDate && endDate) {
      form.setValue(
        "totalPrice",
        vehicule.price *
          eachDayOfInterval({ start: endDate, end: startDate }).length
      );
    } else {
      form.resetField("totalPrice");
    }
    if (startDate && endDate) {
      setFormError("");
      setFormSuccess("");
      checkDisponibilte(
        vehicule.id,
        eachDayOfInterval({ start: startDate, end: endDate }),
        undefined
      ).then((res) => {
        if (res?.error) {
          setFormError(res.error);
          setPeriodDone(false);
        } else {
          setPeriodDone(true);
        }
      });
    }
  }, [endDate, startDate, form, vehicule.price, vehicule.id]);
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Nouvelle reservation</h1>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-4">
        <div className="flex flex-row items-start justify-between w-full pb-4 border-b border-primary/15">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center gap-4 mb-2">
              <h2 className="text-lg font-semibold">Client informations :</h2>
              <Link href="/dashboard/reservation/new">
                <Button>Changer le client</Button>
              </Link>
            </div>
            <h3 className="text-sm">
              <span className="font-semibold">Nom du client : </span>
              {client.firstName} {client.lastName}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">CID : </span>
              {client.cid}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Telephone : </span>
              {client.mobile}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Email : </span>
              {client.email}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Addresse : </span>
              {client.address}
            </h3>
            <h3 className="text-sm">
              <span className="font-semibold">Ville : </span>
              {client.city}
            </h3>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row items-center justify-between mb-2 gap-4">
                <h2 className="text-lg font-semibold  text-nowrap">
                  Vehicule informations :
                </h2>
                <Link href={`/dashboard/reservation/new/${client.id}`}>
                  <Button>Changer le vehicule</Button>
                </Link>
              </div>
              <div className="flex flex-row items-start w-full justify-between gap-4">
                <div className="flex flex-col w-fit gap-1">
                  <div className="text-sm flex flex-col">
                    <h2 className="font-semibold">Vehicule name : </h2>
                    {vehicule.name}
                  </div>
                  <div className="text-sm flex flex-col">
                    <h2 className="font-semibold">Kilometrage actual : </h2>
                    {vehicule.kilo} KM
                  </div>
                  <div className="text-sm flex flex-col">
                    <h2 className="font-semibold">Moteur : </h2>
                    {vehicule.motor} - {vehicule.gear}
                  </div>
                  <div className="text-sm flex flex-col">
                    <h2 className="font-semibold">Prix par jour : </h2>
                    {vehicule.price}
                  </div>
                </div>

                <Image
                  src={`https://utfs.io/f/${vehicule.images[0]}`}
                  width={170}
                  height={170}
                  alt="vehicule image"
                  className="rounded-lg object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormError message={formError} />
            <FormSuccess message={formSuccess} />
            <div className="flex flex-row gap-4 py-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Le jour de depart :
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {startDate ? (
                                  format(startDate, "PPP")
                                ) : (
                                  <span>Selectionez une date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartdate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Le jour de recupuration :
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {endDate ? (
                                  format(endDate, "PPP")
                                ) : (
                                  <span>Selectionez une date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {startDate && endDate ? (
                  <FormLabel className=" font-semibold bg-emerald-300 rounded-lg px-4 py-1 w-fit">
                    Periode :{" "}
                    {
                      eachDayOfInterval({ start: endDate, end: startDate })
                        .length
                    }{" "}
                    jours
                  </FormLabel>
                ) : null}
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-col items-start gap-4">
                    <FormField
                      control={form.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Heure de Pick-up :
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="time"
                              className="w-[180px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="pickup"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Lieu de Pick-up :
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="Lieu de Pick-up"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-col items-start gap-4">
                    <FormField
                      control={form.control}
                      name="dropOffTime"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Heure de recuperation :
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="time"
                              className="w-[180px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col items-start w-full gap-4">
                    <FormField
                      control={form.control}
                      name="dropOff"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-semibold">
                            Lieu de recuperation :
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="Lieu de recuperation"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="limitKm"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Limite de Kilometrage par jour :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                            placeholder="50000"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="assurance"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Additional assurance :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="Additional assurance"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Additional informations :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="Additional informations"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="couponId"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Coupon code :
                        </FormLabel>
                        <FormControl>
                          <Input
                            onChange={(e) => setCoupon(e.currentTarget.value)}
                            disabled={isPending}
                            type="text"
                            placeholder="Coupon code"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {couponValue ? (
                  <FormLabel className=" font-semibold bg-emerald-300 rounded-lg px-4 py-1 w-fit">
                    Coupon value : -{couponValue} Dhs
                  </FormLabel>
                ) : null}
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="totalPrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Prix total :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                            placeholder="Prix total"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="paymentStatut"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Statut de paiement :
                        </FormLabel>
                        <div className="flex flex-row items-center w-full gap-2 py-2 px-2">
                          <FormControl>
                            <Checkbox
                              id="availableCheck"
                              checked={field.value}
                              onCheckedChange={(e) =>
                                form.setValue(
                                  "paymentStatut",
                                  e.valueOf() ? true : false
                                )
                              }
                            />
                          </FormControl>
                          <Label htmlFor="availableCheck">
                            Le reservation a été payée.
                          </Label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {periodDone ? (
              <div className="flex w-full items-end justify-end">
                <Button disabled={isPending} type="submit" className="mt-2">
                  Creer nouvelle reservation
                </Button>
              </div>
            ) : null}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewReservationForm;
