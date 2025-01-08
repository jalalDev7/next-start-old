import { SlDrawer } from "react-icons/sl";
const NoData = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col gap-2 w-fulll items-center justify-center py-4">
      <SlDrawer className="size-10 " />
      <h3 className="text-sm">{message ? message : "Pas de données"}</h3>
    </div>
  );
};

export default NoData;
