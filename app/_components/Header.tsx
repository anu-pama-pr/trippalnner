"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const menuOptions = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact Us", path: "/contact-us" },
];

function Header() {
  const {user } = useUser();
  const path = usePathname(); // ✅ Hook always called before conditional returns

  // console.log(path); 


  return (
    <div className="w-full flex items-center justify-between px-8 py-4 sticky top-0 bg-white/50 backdrop-blur-md z-50">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <h2 className="font-bold text-2xl capitalize">Trav-AI</h2>
        </div>
      </Link>

      {/* Menu options */}
      <div className="flex items-center gap-6">
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className="text-lg hover:scale-105 transition hover:text-primary cursor-pointer">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Right side buttons */}
      <div className="flex gap-5 items-center">
        {!user? <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
         : path === "/create-new-trip" ? 
          <Link href="/my-trips">
            <Button>My Trips</Button>
          </Link>
        : 
          <Link href="/create-new-trip">
            <Button>Create New Trip</Button>
          </Link>
        }
        <UserButton />
      </div> 
    </div>
  )
}

export default Header;
