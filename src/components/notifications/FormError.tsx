import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";

const FormError = ({
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
    <div className="flex flex-row gap-2 items-center w-full my-2 bg-destructive/15 p-3 border border-destructive rounded-md text-sm text-destructive">
      <div className="flex flex-row items-center gap-2 w-full">
        <IoWarningOutline className="size-4" />
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

export default FormError;
