"use client";
import Image from "next/image";
import React from "react";
import { Hotel } from "./ChatBox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Wallet } from "lucide-react";


type Props = {
  hotel: Hotel;
  photos?: string[]; // pass fetched Unsplash photos here
};

function HotelCarditem({ hotel, photos }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Image
        src={photos?.[0] || "/placeholder.jpg"} // use first photo or fallback
        alt={hotel.hotel_name}
        width={400}
        height={200}
        className="rounded-xl shadow object-cover mb-2"
      />

      <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
      <h2 className="text-grey-500">{hotel.hotel_address}</h2>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-green-600">
          <Wallet /> {hotel.price_per_night}
        </p>
        <p className="text-yellow-500 flex gap-2">
          <Star /> {hotel.rating}
        </p>
      </div>
      <Link
        href={
          "http://www.google.com/maps/search/?api=1&query=" + hotel?.hotel_name
        }
        target="_blank"
      >
        <Button variant={"outline"} className="mt-1 w-full">
          View
        </Button>
      </Link> 
    </div>
  );
}

export default HotelCarditem;
