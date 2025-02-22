"use client";

import { deleteImageByKey } from "@/actions/delete-image";
import FormError from "@/components/notifications/FormError";
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
import { UploadDropzone } from "@/lib/uploadthing";
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaSquarePlus } from "react-icons/fa6";
import { z } from "zod";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { useQueryClient } from "react-query";
import { createCategorie } from "@/actions/categories";
import FormSuccess from "@/components/notifications/FormSuccess";

const NewCategorie = () => {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [uploadError, setUploadError] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    startTransition(async () => {
      createCategorie(values).then((res) => {
        if (res.error) {
          setFormSuccess(undefined);
          setFormError(res.error);
        }
        if (res.success) {
          setFormError(undefined);
          setFormSuccess(res.success);
          setImage(undefined);
          form.reset();
          queryClient.invalidateQueries("getCategories");
        }
      });
    });
  };
  const deleteImage = (img: string) => {
    setUploadError("");
    deleteImageByKey(img).then((res) => {
      if (res.success) {
        setImage(undefined);
      }
      if (res.error) setUploadError(res.error);
    });
  };
  useEffect(() => {
    if (image) {
      form.setValue("image", image);
      form.clearErrors("image");
    } else {
      form.setValue("image", "");
    }
  }, [image, form]);
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
              <FormError message={formError} />
              <FormSuccess message={formSuccess} />
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
              <div className="flex flex-col gap-1 ">
                <FormError message={uploadError} />
                {image ? (
                  <div className="flex gap-2 w-full relative">
                    <div className="flex relative">
                      <Image
                        src={`https://utfs.io/f/${image}`}
                        width={400}
                        height={400}
                        alt="image"
                        className="h-32 w-full aspect-square object-cover "
                      />
                      <div
                        className="absolute bottom-2 right-2 cursor-pointer text-destructive p-1 rounded-lg bg-destructive/55 border border-destructive shadow-md"
                        onClick={() => deleteImage(image)}
                      >
                        <MdDeleteForever className="size-6  " />
                      </div>
                    </div>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Image / Icone :
                        </FormLabel>
                        <FormControl>
                          <UploadDropzone
                            config={{ mode: "auto" }}
                            className="w-full text-primary max-h-24"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              const links = res.map((s) => s.key);
                              if (links.length > 0) setImage(links[0]);
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              setUploadError(error.message);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
