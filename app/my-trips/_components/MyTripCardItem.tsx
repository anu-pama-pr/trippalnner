
'use client';
import Image from 'next/image'
import React from 'react'
import { Trip } from '../page'
import { ArrowBigRightIcon } from 'lucide-react'
import Link from 'next/link'

type Props={
trip:Trip
}

function MyTripCardItem({trip}:Props) {
  return (
        <Link href={'/view-tip' +trip?.tripId} className='p-5 shadow rounded-2xl'>

            <Image  src ={'/placeholder.jpg'} alt={trip.tripId} width={400} height={400}
            className=" rounded-xl object-cover"/>
            <h2 className=" flex gap-2 font-semibold text-xl mt-2">{trip?.tripDetail?.destination} <ArrowBigRightIcon/>{trip?.tripDetail?.destination}</h2>
            <h2 className='mt-2 text-gray-600'>{trip?.tripDetail?.duration}Trip with {trip.tripDetail?.budget} Budget</h2>

</Link>
           )
}

export default MyTripCardItem