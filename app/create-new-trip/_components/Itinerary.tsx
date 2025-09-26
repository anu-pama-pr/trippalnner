"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import HotelCarditem from "./HotelCarditem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetails } from "@/app/provider";
import { TripInfo, Activity, Hotel } from "./ChatBox";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

function Itinerary() {
  //@ts-ignore
  const { tripDetailInfo } = useTripDetails(); 
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  // Set tripData when tripDetailInfo changes
  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);
    }
  }, [tripDetailInfo]);

  // Timeline data
  const data = tripData
    ? [
        {
          title: "Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData.hotels.map((hotel: Hotel, index: number) => (
                <HotelCarditem key={index} hotel={hotel} />
              ))}
            </div>
          ),
        },
        ...tripData.itinerary.map((dayData, dayIndex) => ({
          title: `Day ${dayData.day}`,
          content: (
            <div key={dayIndex}>
              <p className="mb-2 font-bold text-xl text-primary">
                Best Time: {dayData.places_to_visit[0]?.best_time_to_visit}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {dayData.places_to_visit.map((place: Activity, index: number) => (
                  <PlaceCardItem key={index} activity={place} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];

  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div className="relative w-full h-full">
          <h2 className="flex gap-2 text-4xl text-white left-20 items-center absolute bottom-20">
            <ArrowLeft /> Getting to know to build perfect trip here....
          </h2>
          <Image
            src="/travel.jpg"
            alt="travel"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}
    </div>
  );
}

export default Itinerary;
