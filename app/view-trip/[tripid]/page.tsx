import { useParams } from 'next/navigation'
import React from 'react'

function viewTrip() {
    const {tripid}=useParams();
  return (
    <div>viewTrip</div>
  )
}

export default viewTrip