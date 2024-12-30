"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { vehiculeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HiPlusCircle } from "react-icons/hi";
import { UploadDropzone } from "@/lib/uploadthing";
import FormError from "@/components/notifications/FormError";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { deleteImageByKey } from "@/actions/delete-image";

const NewVehicule = () => {
  const [assurance, setAssurance] = useState<Date>();
  const [tax, setTax] = useState<Date>();
  const finishField = useRef<HTMLInputElement>(null);
  const [finish, setFinish] = useState<string[]>();
  const [images, setImages] = useState<string[]>();
  const [uploadError, setUploadError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof vehiculeSchema>>({
    resolver: zodResolver(vehiculeSchema),
    defaultValues: {
      assurance: assurance,
      category: "",
      coffre: "",
      color: "",
      finish: finish,
      gear: "",
      images: images,
      kilo: 0,
      marque: "",
      motor: "",
      name: "",
      passengers: 0,
      plate: "",
      tax: tax,
    },
  });

  const onSubmit = (values: z.infer<typeof vehiculeSchema>) => {
    startTransition(() => console.log("Form values : ", values));
  };
  const addFinish = () => {
    if (finishField.current && finishField.current.value) {
      if (finish) {
        setFinish([...finish, finishField.current.value]);
        finishField.current.value = "";
      } else {
        setFinish([finishField.current.value]);
        finishField.current.value = "";
      }
    }
  };
  const addImages = (imgLinks: string[]) => {
    setUploadError("");
    form.clearErrors("images");
    imgLinks.map((link) => {
      if (images) {
        setImages([...images, link]);
      } else {
        setImages([link]);
      }
    });
  };
  const deleteImage = (img: string) => {
    setUploadError("");
    deleteImageByKey(img).then((res) => {
      if (res.success) {
        if (images) {
          setImages(images.filter((i) => i !== img));
        }
      }
      if (res.error) setUploadError(res.error);
    });
  };
  useEffect(() => {
    if (tax) form.setValue("tax", tax);
    if (assurance) form.setValue("assurance", assurance);
    if (finish) form.setValue("finish", finish);
    if (images) form.setValue("images", images);
  }, [tax, assurance, finish, images, form]);
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Nouvelle vehicule</h1>
      <div className="flex flex-col w-full bg-secondary border border-primary/15 p-4 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-4 py-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Nom de la vehicule :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="Picanto"
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
                    name="color"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Couleur de la vehicule :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="Rouge, Noir, Blanche..."
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
                    name="plate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Numero du plaque :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="A 00000"
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
                    name="kilo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Kilometrage actual :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                            placeholder="100000"
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
                    name="passengers"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Nombre de voyageurs :
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                            placeholder="5"
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
                    name="coffre"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex flex-row w-full items-center justify-between">
                          <FormLabel className="font-semibold">
                            Taille de coffre :
                          </FormLabel>
                          <FormLabel className="text-xs">Facultatif</FormLabel>
                        </div>

                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="Normal, Moyen, Grand..."
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
                    name="finish"
                    render={() => (
                      <FormItem className="w-full">
                        <div className="flex flex-row w-full items-center justify-between">
                          <FormLabel className="font-semibold">
                            Autre option de la vehicule :
                          </FormLabel>
                          <FormLabel className="text-xs">Facultatif</FormLabel>
                        </div>

                        <FormControl>
                          <div className="flex flex-row items-center w-full gap-2">
                            <Input
                              ref={finishField}
                              type="text"
                              placeholder="Toute options, Salon cuir,..."
                              className="w-full"
                            />

                            <HiPlusCircle
                              className="size-8 cursor-pointer"
                              onClick={addFinish}
                            />
                          </div>
                        </FormControl>
                        {finish ? (
                          <div className="flex flex-col gap-2 w-full px-4">
                            {finish.map((f, index) => (
                              <div
                                key={`finish-${index}`}
                                className="flex flex-row gap-2 items-center text-sm "
                              >
                                <div className="size-2 rounded-full bg-primary" />
                                <h3>{f}</h3>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Categorie de la vehicule :
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            {...field}
                            disabled={isPending}
                          >
                            <SelectTrigger className="bg-white w-full">
                              <SelectValue placeholder="Selectionez une categorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Statut</SelectLabel>
                                <SelectItem value="SUV">SUV</SelectItem>
                                <SelectItem value="Lux">Lux</SelectItem>
                                <SelectItem value="Economique">
                                  Economique
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
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="marque"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Marque de la vehicule :
                        </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger className="bg-white w-full">
                              <SelectValue placeholder="Selectionez une marque" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Kia">Kia</SelectItem>
                                <SelectItem value="Mercedes">
                                  Mercedes
                                </SelectItem>
                                <SelectItem value="BMW">BMW</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="motor"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Type de carburant :
                        </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger className="bg-white w-full">
                              <SelectValue placeholder="Selectionez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Mechanique</SelectLabel>
                                <SelectItem value="Essence">Essence</SelectItem>
                                <SelectItem value="Diesel">Diesel</SelectItem>
                                <SelectLabel>Electique</SelectLabel>
                                <SelectItem value="Electrique">
                                  Electrique
                                </SelectItem>
                                <SelectItem value="Hybrid essence">
                                  Hybrid Essence
                                </SelectItem>
                                <SelectItem value="Hybrid diesel">
                                  Hybrid Diesel
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
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="gear"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Type de moteur :
                        </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger className="bg-white w-full">
                              <SelectValue placeholder="Selectionez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Manuel">Manuel</SelectItem>
                                <SelectItem value="Automatique">
                                  Automatique
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
                <div className="flex flex-col items-start gap-4">
                  <FormField
                    control={form.control}
                    name="assurance"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Date fin d&apos;assurance :
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !assurance && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {assurance ? (
                                  format(assurance, "PPP")
                                ) : (
                                  <span>Selectionez une date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={assurance}
                                onSelect={setAssurance}
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
                    name="tax"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Date fin de vignette :
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !tax && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {tax ? (
                                  format(tax, "PPP")
                                ) : (
                                  <span>Selectionez une date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={tax}
                                onSelect={setTax}
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
                    name="images"
                    render={() => (
                      <FormItem className="w-full">
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel className="font-semibold">
                            Photos de vehicule :
                          </FormLabel>
                        </div>
                        <FormError message={uploadError} />
                        <FormControl>
                          <div className="flex flex-col gap-2 w-full  border border-primary/15 py-1 items-center justify-center">
                            <UploadDropzone
                              config={{ mode: "auto" }}
                              className="w-full text-primary max-h-24"
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                // Do something with the response
                                const links = res.map((s) => s.key);
                                if (links.length > 0) addImages(links);
                              }}
                              onUploadError={(error: Error) => {
                                // Do something with the error.
                                setUploadError(error.message);
                              }}
                            />
                          </div>
                        </FormControl>
                        {images ? (
                          <div className="grid grid-cols-3 gap-2 w-full relative">
                            {images.map((img, index) => (
                              <div
                                key={`image-${index}`}
                                className="flex relative"
                              >
                                <Image
                                  src={`https://utfs.io/f/${img}`}
                                  width={400}
                                  height={400}
                                  alt="image"
                                  className="h-32 aspect-square object-cover "
                                />
                                <div
                                  className="absolute bottom-2 right-2 cursor-pointer text-destructive p-1 rounded-lg bg-destructive/55 border border-destructive shadow-md"
                                  onClick={() => deleteImage(img)}
                                >
                                  <MdDeleteForever className="size-6  " />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full items-end justify-end">
              <Button disabled={isPending} type="submit" className="mt-2">
                Creer la vehicule
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewVehicule;
