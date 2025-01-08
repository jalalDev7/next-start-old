import { Loader2 } from "lucide-react";
import React from "react";

const LoadingData = () => {
  return (
    <div className="flex flex-col gap-2 w-fulll items-center justify-center py-4">
      <Loader2 className="size-10 animate-spin " />
      <h3 className="text-sm">Chargement de données...</h3>
    </div>
  );
};

export default LoadingData;
