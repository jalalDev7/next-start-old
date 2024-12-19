"use client";
import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex flex-row items-center justify-between p-2">
      <h1 className="text-2xl font-bold">LOGO ipsum</h1>
      <div className="flex flex-row items-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {session && session.user ? (
          <button
            className="bg-primary px-4 py-1 rounded-md text-secondary"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        ) : status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <button
            className="bg-primary px-4 py-1 rounded-md text-secondary"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
