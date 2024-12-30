"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaSquarePlus } from "react-icons/fa6";
import { z } from "zod";

const NewCategorie = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    startTransition(() => console.log("Form values : ", values));
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex flex-row gap-2 items-center">
          <FaSquarePlus className="size-4" />
          Nouvelle categorie
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Creer une nouvelle categorie</SheetTitle>
              <SheetDescription>
                Veillez entrer les informations de la categorie.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Nom de categorie :
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="text"
                          placeholder="Voitures de luxe, voitures economique,..."
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Description :
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Description de la categorie"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button disabled={isPending} type="submit" className="mt-2">
              Creer la categorie
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorie;
