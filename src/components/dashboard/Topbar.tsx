import { auth } from "@/auth";
import Image from "next/image";
import React from "react";

const Topbar = async () => {
  const session = await auth();

  return (
    <div className="flex flex-row items-center justify-between w-full bg-secondary border-b border-primary/15 p-2 text-primary ">
      <h2 className="font-semibold">Bienvenue : {session?.user.name}</h2>
      {session?.user.image ? (
        <Image
          src={session.user.image}
          height={35}
          width={35}
          className="rounded-full"
          alt="avatar"
        />
      ) : null}
    </div>
  );
};

export default Topbar;
