" use client"
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/",
  },
  {
    name: "Contact Us",
    path: "/",
  },
];

function Header() {

const { user } = useUser();


  return (
    <div className="w-full flex items-center justify-between px-8 py-4 sticky top-0 bg-white/50 backdrop-blur-md z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={30}
          height={30}
        ></Image>
        <h2 className="font-bold text-2xl capitalize">Trav-AI</h2>
      </div>
      {/*  menu options  */}
      <div className="flex items-center gap-6">
        {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
            
            <h2 className="text-lg hover:scale-105 transition  hover:text-primary"> {menu.name}</h2>
            </Link>
        ))}
      </div>
      {/* get start */}

     
    {!user ? 
      <SignInButton mode="modal">
        <Button>Get Started</Button>
      </SignInButton>
     : 
      <Link href={"/create-new-trip"}>
        <Button>Create New Trip</Button>
      </Link>
    } 
    </div>
  )
}
  
export default Header
