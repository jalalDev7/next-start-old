import Link from "next/link";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const FormSuccess = ({
  message,
  link,
  linkText,
}: {
  message?: string;
  link?: string;
  linkText?: string;
}) => {
  if (!message) return null;
  return (
    <div className="flex flex-row gap-2 items-center w-full my-2 bg-emerald-500/15 p-3 border border-emerald-500 rounded-md text-sm text-emerald-500 justify-between">
      <div className="flex flex-row items-center gap-2 w-full">
        <MdOutlineFileDownloadDone className="size-4" />
        {message}
      </div>
      {link && linkText ? (
        <Link href={link} className="px-4 underline">
          {linkText}
        </Link>
      ) : null}
    </div>
  );
};

export default FormSuccess;
