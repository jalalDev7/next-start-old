import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const HeroSection = () => {
  return (
    <section className="bg-secondary flex flex-col w-full pt-4 rounded-b-xl">
      <div className="flex w-full items-center justify-center rounded-xl relative">
        <Link href="#">
          <IoIosArrowDropleftCircle className="size-12 translate-x-6" />
        </Link>
        <Image
          src="/store/sliders/slider.jpg"
          alt="slider"
          width={1200}
          height={800}
          className="rounded-xl object-cover max-h-[600px] max-w-[1200px]"
        />
        <Link href="#">
          <IoIosArrowDroprightCircle className="size-12 -translate-x-6" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
