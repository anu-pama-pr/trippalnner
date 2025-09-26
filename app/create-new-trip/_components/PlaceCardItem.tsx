"use client";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Ticket } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Activity } from "./ChatBox";
import Link from "next/link";
import { fetchUnsplashPhotos } from "@/utils/unsplash";

type Props = {
  activity: Activity;
};

function PlaceCardItem({ activity }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const getPhoto = async () => {
      const results = await fetchUnsplashPhotos(`${activity.place_name} travel`, 1);
      if (results.length > 0) setPhoto(results[0].urls.small);
    };
    getPhoto();
  }, [activity.place_name]);

  return (
    <div>
      <Image
        src={photo || "/placeholder.jpg"}
        width={400}
        height={200}
        alt={activity.place_name}
        className="object-cover rounded-xl"
      />
      <h2 className="font-semibold text-lg">{activity.place_name}</h2>
      <p className="text-grey-500 line-clamp-2">{activity.place_details}</p>
      <p className="flex text-orange-400 gap-2 line-clamp-1">
        <Clock /> {activity.best_time_to_visit}
      </p>
      <Link
        href={"http://www.google.com/maps/search/?api=1&query=" + activity.place_name}
        target="_blank"
      >
        <Button size={"sm"} variant={"outline"} className="w-full mt-2">
          View <ExternalLink />
        </Button>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
