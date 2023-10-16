import { FilterIcon } from '@/assets/filter'
import { SearchIcon } from '@/assets/search'
import React from 'react'

export default function Search() {
  return (
    <div className='w-10/12 flex items-center border-2 rounded-xl gap-1 px-3 py-2 bg-white justify-between'>
        <SearchIcon/>
        <input className='w-[200px]' type="text" name="" id="" placeholder='Search...' />
        <FilterIcon/>
    </div>
  )
}
