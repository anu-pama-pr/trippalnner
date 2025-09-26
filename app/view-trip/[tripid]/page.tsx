
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trips/page';
import { useTripDetails, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function viewTrip() {
    const { tripid } =useParams();
    const {userDetail,setUserDetail}=useUserDetail();
    const convex=useConvex();
    const [tripData,setTripData]=useState<Trip>();
    //@ts-ignore
      const { tripDetailInfo ,setTripDetailInfo} = useTripDetails(); 
    

    useEffect(()=>{
      userDetail&&GetTrip()
    },
  [userDetail])

    const GetTrip=async()=>{
      const result= await convex.query(api.tripDetail.GetTripById,{
        uid:userDetail?._id,
        tripId:tripid+''

      });
      console.log(result);
      setTripData(result);
      setTripDetailInfo(result?.tripDetail)
    };

    
  return (
    <Itinerary/> 
  )
}

export default viewTrip     