import React from 'react'

import { usePathname } from 'next/navigation';

import DashboardExample from '@/components/Cards';

export default function tpage() {
  return (
    <div className=''>
      <DashboardExample/>
      </div>
  )
}
