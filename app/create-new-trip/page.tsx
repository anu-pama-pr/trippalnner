"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CLoader from "../_components/CLoader";
import ChatBox from "./_components/ChatBox";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();


  if (!isLoaded || !isSignedIn) {
    return <CLoader/>;
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <ChatBox/>
    </div>
  );
}
