"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
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
    path: "/pricing", // you might want to update this
  },
  {
    name: "Contact Us",
    path: "/contact-us", // you might want to update this
  },
];

function Header() {
  const { isSignedIn, isLoaded, user } = useUser();

  // Wait for Clerk to load before rendering anything
  if (!isLoaded) return null;

  return (
    <div className="w-full flex items-center justify-between px-8 py-4 sticky top-0 bg-white/50 backdrop-blur-md z-50">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
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

      {/* Get Started or Create New Trip button */}
      <div>
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        ) : (
          <Link href="/create-new-trip">
            <Button>Create New Trip</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
