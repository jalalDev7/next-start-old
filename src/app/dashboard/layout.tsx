import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row w-full gap-4">
      <Sidebar />
      <div className="flex flex-col w-full pl-[250px]">
        <Topbar />
        <div className="flex flex-col w-full p-8 gap-8">{children}</div>
      </div>
    </div>
  );
};

export default layout;
