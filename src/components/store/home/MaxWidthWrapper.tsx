import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(className, "flex flex-col w-full max-w-[1400px] mx-auto")}
    >
      {children}
    </main>
  );
};

export default MaxWidthWrapper;
