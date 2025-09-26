"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Hotel } from "./ChatBox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Wallet } from "lucide-react";
import { fetchUnsplashPhotos } from "@/utils/unsplash";

type Props = {
  hotel: Hotel;
  bookingUrl?: string; // new optional prop for hotel booking
};

function HotelCarditem({ hotel, bookingUrl }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const getPhoto = async () => {
      const results = await fetchUnsplashPhotos(`${hotel.hotel_name} hotel`, 1);
      if (results.length > 0) setPhoto(results[0].urls.small);
    };
    getPhoto();
  }, [hotel.hotel_name]);

  return (
    <div className="flex flex-col gap-1">
      {/* Fixed height container for aligned images */}
      <div className="w-full h-64 rounded-xl overflow-hidden shadow">
        <Image
          src={photo || "/placeholder.jpg"}
          alt={hotel.hotel_name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="font-semibold text-lg mt-2">{hotel.hotel_name}</h2>
      <h2 className="text-gray-500">{hotel.hotel_address}</h2>

      <div className="flex justify-between items-center mt-1">
        <p className="flex gap-2 text-green-600">
          <Wallet /> {hotel.price_per_night}
        </p>
        <p className="text-yellow-500 flex gap-2">
          <Star /> {hotel.rating}
        </p>
      </div>

      {/* Existing Map Button */}
      <Link
        href={"http://www.google.com/maps/search/?api=1&query=" + hotel.hotel_name}
        target="_blank"
      >
        <Button variant={"outline"} className="mt-2 w-full">
          View
        </Button>
      </Link>

      {/* New Booking Button */}
      {bookingUrl && (
        <Link href={bookingUrl} target="_blank">
          <Button className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white">
            Book Now
          </Button>
        </Link>
      )}
    </div>
  );
}

export default HotelCarditem;
