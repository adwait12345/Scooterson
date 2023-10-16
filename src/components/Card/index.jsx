import { Message } from '@/assets/message'
import { PhoneIcon } from '@/assets/phone'
import Image from 'next/image'
import React from 'react'

export default function Card(props) {
    return (
        <div className='w-full flex flex-col border-[2px] border-[#eaeaea] px-3 py-3 rounded-[12px] bg-white '>
            <div className="flex items-center w-full justify-between border-b-2 pb-2">
                <div className="flex flex-col text-left font-Poppins">
                    <span className='text-[11px] font-semibold text-[#B0B0B0] '>Model number</span>
                    <h1 className='font-bold'>{props.model}</h1>
                    <p className='text-[13px]'>Red</p>
                </div>
                <div className="">
                    <Image src="/logo.png" alt='' width={80} height={80} />
                </div>
            </div>
            <div className="flex w-full items-center justify-between my-2 ">
                <div className="flex items-center gap-2">
                    <Image className=' rounded-full' src="/profile.png" alt='' width={45} height={45} />
                    <div className=" leading-4">
                        <span className='text-[10px] font-semibold text-[#B0B0B0] '>Client</span>
                        <h1 className='font-bold text-[14px]'>{props.name}</h1>
                        <p className='text-[12px]'>Mariene, LTD</p>
                    </div>
                </div>

                <div className="flex gap-2 items-center text-white">
                    {/* <button className='p-1 bg-[#9b9b9b] rounded '><PhoneIcon /></button> */}
                    <button className='p-2 bg-[#00d200] rounded-full'><Message /></button>
                </div>
            </div>
        </div>
    )
}
