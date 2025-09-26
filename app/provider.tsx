"use client";
import React, { useEffect, useState, useContext } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripDetailContext, TripContextType } from "@/context/TripDetailContent";
import { TripInfo } from "./create-new-trip/_components/ChatBox";

function Provider({ children }: { children: React.ReactNode }) {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

  const { user } = useUser();

  useEffect(() => {
    if (user) CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      const result = await CreateUser({
        email: user.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user.imageUrl,
        name: user.fullName ?? "",
      });
      setUserDetail(result);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => useContext(UserDetailContext);
export const useTripDetails = (): TripContextType | undefined =>
  useContext(TripDetailContext);
