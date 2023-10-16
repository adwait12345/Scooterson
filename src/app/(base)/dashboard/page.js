import React from 'react'

import { usePathname } from 'next/navigation';
import { Playground } from '@/components/Chart';
import KpiCard from '@/components/Cards';
import DashboardExample from '@/components/Cards';

export default function tpage() {
  return (
    <div className=''>
      <DashboardExample/>
      </div>
  )
}
