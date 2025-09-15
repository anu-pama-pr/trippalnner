"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/"); // Redirect to homepage when already signed in
    }
    if (!isLoaded || !isSignedIn) {
      router.replace("/sign-in?redirect_url=/create-new-trip");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignIn />
    </div>
  );
}
