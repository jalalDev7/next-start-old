"use client";
import FacebookSVG from "@/components/SVGs/FacebookSVG";
import GoogleSVG from "@/components/SVGs/GoogleSVG";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const Register = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center h-full ">
      <FaCircleUser className="size-16" />
      <h1 className="text-lg font-semibold mb-8 mt-4">
        Welcome to register page
      </h1>
      <div className="flex flex-col w-full items-start justify-start gap-2">
        <Label className="font-semibold">Username </Label>
        <Input type="text" placeholder="Username" className="" />
        <Label className="font-semibold">Email </Label>
        <Input type="email" placeholder="email@company.com" className="" />
        <Label className="font-semibold">Password :</Label>
        <Input type="password" placeholder="Paswword" className="" />
        <Label className="font-semibold">Confirm password :</Label>
        <Input type="password" placeholder="Paswword" className="" />
        <Button className="w-full mt-2">Create account</Button>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        <div className="flex flex-row gap-2 items-center justify-center border border-primary rounded-lg p-2 w-full cursor-pointer">
          <GoogleSVG className="size-6" />
          <h2>Register with google</h2>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center border border-primary rounded-lg p-2 w-full cursor-pointer">
          <FacebookSVG className="size-6" />
          <h2>Register with facebook</h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
