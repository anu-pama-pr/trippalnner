"use client";
import { Button } from "@/components/ui/button";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUserDetails } from "../provider";
import { api } from "@/convex/_generated/api";
import { TripInfo } from "../create-new-trip/_components/ChatBox";
import { ArrowBigRightIcon } from "lucide-react";
import Image from "next/image";
import MyTripCardItem from "./_components/MyTripCardItem";

 export type Trip = {
  tripId: any;
  tripDetail: TripInfo;
  _id: string;
};

function MyTrips() {
  const [MyTrips, setMyTrips] = useState<Trip[]>([]);
  const { userDetail, setUserDetail } = useUserDetails();
  const convex = useConvex();
  
  const GetUserTrip = async () => {
    const result = await convex.query(api?.tripDetail?.GetUserTrips, {
      uid: userDetail?._id,
    });
    setMyTrips(result);
    console.log(result);
  };
  useEffect(() => {
    if (userDetail) {
      console.log("userDetail", userDetail); // check this!
      GetUserTrip();
    }
  }, [userDetail]);
  
  return (
    <div className="px-10 p-10 md:px-24 lg:px-48">
      <h2 className="font-bold text-3xl">MyTrips</h2>
      {MyTrips?.length == 0 && (
        <div
          className="p-7 border rounded-2xl flex flex-col 
             items-center justify-center gap-5 mt-6 text-primary"
        >
          <h2> You don't have any Trip plan created ! </h2>
          <Link href={"/create-new-trip"}>
            <Button>Create New Trip </Button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {MyTrips?.map((trip, index) => (
         <MyTripCardItem trip = {trip } key={index}/>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
