import Link from "next/link";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const BackLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <Link
      href={link}
      className="flex flex-row items-center gap-1 mt-2 text-blue-500"
    >
      <IoIosArrowRoundBack className="size-4" />
      {text}
    </Link>
  );
};

export default BackLink;
