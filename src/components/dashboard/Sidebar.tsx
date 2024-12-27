import Link from "next/link";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLogoutCircleFill, RiShoppingCartFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { signOut } from "@/auth";
import { BiSolidStore } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-secondary border-r border-primary/15 min-w-[250px] min-h-screen fixed">
      <div className="text-2xl font-semibold pl-4 py-6 border-b border-primary/15 flex ">
        Rental cars
      </div>
      <aside className="flex flex-col w-full h-full justify-between mt-4 text-lg flex-grow">
        <div className="flex flex-col w-full gap-6 h-full ">
          <Link
            href="/dashboard"
            className="flex flex-row gap-2 items-center px-4 font-semibold"
          >
            <MdSpaceDashboard className="size-6" />
            Dashborad
          </Link>
          <Link
            href="/dashboard/reservation"
            className="flex flex-row gap-2 items-center px-4"
          >
            <FaCalendarAlt className="size-6" />
            Reservations
          </Link>
          <Link
            href="/dashboard/commandes"
            className="flex flex-row gap-2 items-center px-4"
          >
            <RiShoppingCartFill className="size-6" />
            Commandes
          </Link>
          <Link
            href="/dashboard"
            className="flex flex-row gap-2 items-center px-4"
          >
            <FaCar className="size-6" />
            Vehicles
          </Link>
          <Link
            href="/dashboard"
            className="flex flex-row gap-2 items-center px-4"
          >
            <BiSolidStore className="size-6" />
            Store
          </Link>
        </div>
        <div className="flex flex-col w-full gap-4 pb-4">
          <Link
            href="/dashboard"
            className="flex flex-row gap-2 items-center px-4"
          >
            <AiFillSetting className="size-6" />
            Settings
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex flex-row gap-2 items-center px-4">
              <RiLogoutCircleFill className="size-6" />
              Logout
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
