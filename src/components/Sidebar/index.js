"use client"

import { Dashbaord } from '@/assets/dashboard'
import { Date } from '@/assets/date'
import { Message } from '@/assets/message'
import { Settings } from '@/assets/settings'
import { Track } from '@/assets/track'
import { Transactions } from '@/assets/transactions'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import Link from 'next/link'
import { Active } from '@/assets/active'
import Card from '../Card'
import Data from '@/data/vehicle'
import { usePathname } from 'next/navigation';
import '../../styles/globals.css'
import axios from 'axios'
import { Live } from '../Loader/Live'
import Loader from '../Loader/Loader'


export default function Sidebar() {
    const router = usePathname();
    const [loading, setLoading] = useState(true)

    const [Response, setResponse] = useState([])

    const Fetcher = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://static-api-henna.vercel.app/live-vehicles")
            setResponse(response.data.Data)
            setLoading(false)
        } catch (error) {

            console.log(error)
        }



    }

    useEffect(() => {
        Fetcher()
    }, [])


    return (
        <div className={`flex items-start justify-start fixed z-[1000]  h-full bg-[#ffffffc8]  ${router == "/track" ? " w-[450px] border-r-[1px]  " : "w-auto border-r-[0px]  "} `}>
            <div className='flex flex-col items-center  h-full bg-white justify-evenly border-r-[1px] '>
                <div className="w-20 h-fit flex flex-col items-center  justify-center  ">
                    <Image className='w-full' src="/logo.png" alt='' width={100} height={100} />
                    {/* <p className=' font-bold font-Bebas  text-[13px] tracking-wide ' >Scooterson</p> */}
                </div>
                <div className="flex flex-col gap-6 items-center w-full ">
                    <Link href="/dashboard" role="tab" >
                        <button className={` p-2 rounded  ${router == "/dashboard" ? "bg-black text-[#fff]" : "bg-white text-black  "}`}>
                            <Dashbaord />

                        </button>
                    </Link>
                    <Link href="/track">
                        <button className={` p-2 rounded  ${router == "/track" ? "bg-black text-[#fff]" : "bg-white text-black  "}`}>
                            <Track />
                        </button>
                    </Link>

                    <Link href="/message">
                        <button className=' active:bg-black p-2 rounded active:text-[#fff]  '>
                            <Message />
                        </button>
                    </Link>

                    <Link href="/payment">
                        <button className=' active:bg-black p-2 rounded active:text-[#fff]  '>

                            <Transactions />
                        </button>
                    </Link>
                    <Link href="/date">
                        <button className=' active:bg-black p-2 rounded active:text-[#fff]  '>

                            <Date />
                        </button>

                    </Link>



                </div>
                <div className=" w-full flex flex-col items-center mt-24 gap-10 ">
                    <Link href="/settings">
                        <button className=' active:bg-black p-2 rounded active:text-[#fff]  '>

                            <Settings />
                        </button>
                    </Link>


                    <Image className=' rounded-full' src="/profile.png" alt='' width={40} height={40} />

                </div>

            </div>
            {
                router == "/track" ?
                    <div className="flex flex-col items-center w-full overflow-y-scroll h-full no-scrollbar ">
                        <div className="flex flex-col mt-14 w-full  items-center">
                            <Search />
                            <div className="w-10/12 flex items-center ml-10 mt-5 gap-5">
                                <Live />
                                <p className=' font-Poppins font-medium'> Active Rolley</p>
                            </div>

                        </div>
                        <div className="w-10/12 flex flex-col gap-5 my-4 ">
                            {loading ?
                                <div className="w-full flex mt-64 items-center justify-center">
                                    <Loader />
                                </div>


                                : <>
                                    {Response.map((e) => {
                                        return (
                                            <Card name={e.user} model={e.model} />

                                        )
                                    })}
                                </>}



                        </div>

                    </div>
                    : <></>
            }

        </div>


    )
}
