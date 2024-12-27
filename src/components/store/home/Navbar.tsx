import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiSmartphone } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex flex-row w-full justify-between gap-4 pt-2 px-6 bg-secondary">
      <div className="text-3xl font-semibold">Logo</div>
      <div className="flex flex-row gap-6 w-full text-xl items-center justify-center">
        <Link href="/">Home</Link>
        <Link href="/cars">Cars</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2 rounded-lg px-4 py-2">
          <FiSmartphone className="size-4" />
          <h2>06.76.23.53.48</h2>
        </div>
        <div className="flex flex-row items-center gap-2 border border-primary rounded-lg px-4 py-2">
          <FaWhatsapp className="size-4" />
          <h2>06.76.23.53.48</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
