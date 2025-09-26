import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Activity } from './ChatBox'
import Link from 'next/link'

type Props = {
    activity: Activity;
    photos?: string[]; // optional array of image URLs
}

function PlaceCardItem({ activity, photos }: Props) {
  return (
    <div>
      <Image
        src={photos && photos.length > 0 ? photos[0] : "/placeholder.jpg"} // use first photo if available
        width={400}
        height={200}
        alt={activity.place_name}
        className="object-cover rounded-xl"
      />
      <h2 className="font-semibold text-lg">{activity?.place_name}</h2>
      <p className="text-grey-500 line-clamp-2">{activity?.place_details}</p>
      <h2 className="flex gap-2 text-blue-500 line-clamp-1">
        <Ticket />
      </h2>
      <p className="flex text-orange-400 gap-2 line-clamp-1">
        <Clock /> {activity?.best_time_to_visit}
      </p>
      <Link
        href={'http://www.google.com/maps/search/?api=1&query=' + activity?.place_name}
        target='_blank'
      >
        <Button size={'sm'} variant={"outline"} className="w-full mt-2">
          View <ExternalLink />
        </Button>
      </Link>
    </div> 
  )
}

export default PlaceCardItem
