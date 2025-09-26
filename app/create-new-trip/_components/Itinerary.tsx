"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import HotelCarditem from "./HotelCarditem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetails } from "@/app/provider";
import { TripInfo, Activity, Hotel } from "./ChatBox";
import Image from "next/image";
import { div } from "motion/react-client";
import { ArrowLeft } from "lucide-react";

// Interface for photos state
type PhotosState = {
  [name: string]: string[];
};

function Itinerary() {
  //@ts-ignore
  const { tripDetailInfo ,setTripDetailInfo} = useTripDetails(); 
  const [tripData, setTripData] = useState<TripInfo | null>(null);
  const [photos, setPhotos] = useState<PhotosState>({});

  // Function to fetch photos from Unsplash API
  const fetchPhotos = async (name: string) => {
    try {
     const res = await fetch(`/api/unsplash?query=${encodeURIComponent(name)}`);
const data = await res.json();
if (data?.results) {
  setPhotos(prev => ({
    ...prev,
    [name]: data.results.map((img: any) => img.urls.small),
  }));
}
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  // When tripDetailInfo changes, set data and fetch photos
  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);

      // Fetch photos for hotels
      tripDetailInfo.hotels.forEach((hotel: Hotel) => fetchPhotos(hotel.hotel_name));

      // Fetch photos for places
      tripDetailInfo.itinerary.forEach((day: { places_to_visit: Activity[] }) =>
        day.places_to_visit.forEach(place => fetchPhotos(place.place_name))
      );
    }
  }, [tripDetailInfo]);

  // Timeline data
  const data = tripData
    ? [
        {
          title: "Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData.hotels.map((hotel, index) => (
                <HotelCarditem
                  key={index}
                  hotel={hotel}
                  photos={photos[hotel.hotel_name] || []} // pass hotel photos
                />
              ))}
            </div>
          ),
        },
        ...tripData.itinerary.map(dayData => ({
          title: `Day ${dayData.day}`,
          content: (
            <div>
              <p className="mb-2 font-bold text-xl text-primary">
               Best Time: {dayData.places_to_visit[0]?.best_time_to_visit}
                         </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {dayData.places_to_visit.map((place, index) => (
                  <PlaceCardItem
                    key={index}
                    activity={place}
                    photos={photos[place.place_name] || []} // pass place photos
                  />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];

  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData ? <Timeline data={data} tripData={tripData}  />
      :
      <div>
      <h2 className="flex gap-2 text-4xl text-white left-20 items-center absolute bottom-20" ><ArrowLeft/> Getting to know to build perfect trip here....</h2>
      <Image src ={'/travel.jpg' } alt = 'travel' width={'800'} 
      height={800}
      className="w-full h-full object-cover rounded-3xl"
      />
 </div>

 }
    </div>
  );
} 

export default Itinerary;
