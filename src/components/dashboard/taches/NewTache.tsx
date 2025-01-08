"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/notifications/FormError";
import FormSuccess from "@/components/notifications/FormSuccess";
import { Button } from "@/components/ui/button";

import { useQuery, useQueryClient } from "react-query";
import { tacheSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getVehicules } from "@/actions/vehicules";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { createTask } from "@/actions/tahes";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import BackLink from "../BackLink";

const NewTache = () => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [lastDate, setLastDate] = useState<Date | undefined>();
  const { data: vehicules, isLoading } = useQuery(["getVehicules"], () =>
    getVehicules(undefined, undefined)
  );
  const form = useForm<z.infer<typeof tacheSchema>>({
    resolver: zodResolver(tacheSchema),
    defaultValues: {
      lastDate: lastDate,
      note: "",
      state: false,
      type: "MAINTENANCE",
      vehiculeId: undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof tacheSchema>) => {
    console.log(values);
    startTransition(() => {
      createTask(values).then((res) => {
        if (res.error) {
          setFormSuccess(undefined);
          setFormError(res.error);
        }
        if (res.success) {
          setFormError(undefined);
          setFormSuccess(res.success);
          form.reset();
          queryClient.invalidateQueries("getTaches");
        }
      });
    });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-xl font-semibold">Ajouter un client</h1>
      </div>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-8">
        <div className="flex flex-col w-full gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormError message={formError} />
              <FormSuccess message={formSuccess} />
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col w-full items-start gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Type de tache :
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger className="bg-white w-full">
                              <SelectValue placeholder="Maintenance" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Type du tache</SelectLabel>
                                <SelectItem value="MAINTENANCE">
                                  Maintenance
                                </SelectItem>
                                <SelectItem value="PEINTURE">
                                  Peinture
                                </SelectItem>
                                <SelectItem value="VIDANGE">Vidange</SelectItem>
                                <SelectItem value="VIGNETTE">
                                  Vignette
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start w-full gap-4">
                  <FormField
                    control={form.control}
                    name="vehiculeId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Vehicule :
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger className="bg-white w-full">
                              <SelectValue placeholder="Choisissez un vehicule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Vehicules liste</SelectLabel>
                                {vehicules ? (
                                  vehicules.map((car) => (
                                    <SelectItem key={car.id} value={car.id}>
                                      {car.marque.name} {car.name} - {car.plate}
                                    </SelectItem>
                                  ))
                                ) : isLoading ? (
                                  <SelectLabel>
                                    Chargement des vehicules...
                                  </SelectLabel>
                                ) : null}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                  name="note"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">Message :</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Texte descriptif decrire la tache"
                          {...field}
                          disabled={isPending}
                          className="w-full h-24 bg-white"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <FormField
                  control={form.control}
                  name="lastDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Date limite pour la tache :
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Selectionez une date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={lastDate}
                              onSelect={field.onChange}
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
              {/* <div className="flex flex-col items-start gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Statut du tache:
                      </FormLabel>
                      <div className="flex flex-row items-center w-full gap-2 py-2 px-2">
                        <FormControl>
                          <Checkbox
                            id="tacheState"
                            checked={field.value}
                            onCheckedChange={(e) =>
                              form.setValue("state", e.valueOf() ? true : false)
                            }
                          />
                        </FormControl>
                        <Label htmlFor="tacheState">
                          La tache est complete ?
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              <div className="flex w-full items-end justify-end mt-4">
                <Button disabled={isPending} type="submit" className="mt-2">
                  Ajouter la tache
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <BackLink
        link="/dashboard/taches"
        text="Retourner vers la liste des taches"
      />
    </div>
  );
};

export default NewTache;
