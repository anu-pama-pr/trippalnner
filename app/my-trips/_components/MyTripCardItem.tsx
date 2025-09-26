'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Trip } from '../page'
import { ArrowBigRightIcon } from 'lucide-react'
import Link from 'next/link'
import { fetchUnsplashPhotos } from '@/utils/unsplash'

type Props = {
  trip: Trip
}

function MyTripCardItem({ trip }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const getPhoto = async () => {
      // Use trip destination as query for Unsplash
      const results = await fetchUnsplashPhotos(`${trip.tripDetail?.destination} travel`, 1);
      if (results.length > 0) setPhoto(results[0].urls.small);
    };
    getPhoto();
  }, [trip.tripDetail?.destination]);

  return (
    <Link href={'/view-trip' + trip?.tripId} className='p-5 shadow rounded-2xl'>
  <div className="w-full h-64 rounded-xl overflow-hidden">
    <Image
      src={photo || '/placeholder.jpg'}
      alt={trip.tripId}
      width={400}
      height={400}
      className="w-full h-full object-cover"
    />
  </div>

  <h2 className="flex gap-2 font-semibold text-xl mt-2">
    {trip?.tripDetail?.from} <ArrowBigRightIcon /> {trip?.tripDetail?.destination}
  </h2>

  <h2 className='mt-2 text-gray-600'>
    {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget
  </h2>
</Link>

  )
}

export default MyTripCardItem;
