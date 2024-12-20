import React from "react";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";

const page = async () => {
  const user = await auth();
  return (
    <div className="">
      <Navbar />
      <div className="text-lg font-semibold flex flex-col gap-2 items-center justify-center">
        <h1>User name : {user?.user?.name}</h1>
        <h1>User email : {user?.user?.email}</h1>
        <h1>User id : {user?.user?.id}</h1>
        <h1>User role : {user?.user?.role}</h1>
        <h1>User image : {user?.user?.image}</h1>
      </div>
    </div>
  );
};

export default page;
