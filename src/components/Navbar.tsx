import Link from "next/link";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex flex-row items-center justify-between p-2">
      <h1 className="text-2xl font-bold">LOGO ipsum</h1>
      <div className="flex flex-row items-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {session && session.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              className="bg-primary px-4 py-1 rounded-md text-secondary"
            >
              Sign out
            </Button>
          </form>
        ) : (
          <Link
            href="/auth/login"
            className="bg-primary px-4 py-1 rounded-md text-secondary"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
