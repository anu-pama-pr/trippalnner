import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function pricing() {
  return (
    <div className='mt-20'> 
    <h2 className=' font-bold text-3xl my-5 text-center text-primary'> AI-Powered Trip PLanning - Pick Your Plan</h2>
     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
    </div>
  )
}

export default pricing