import CategoriesList from "@/components/dashboard/vahicules/categories/CategoriesList";
import MarquesList from "@/components/dashboard/vahicules/marques/MarquesList";
import VehiculesList from "@/components/dashboard/vahicules/vehicules/VahiculesList";
import React from "react";

const page = () => {
  return (
    <>
      <VehiculesList />
      <CategoriesList />
      <MarquesList />
    </>
  );
};
export default page;
