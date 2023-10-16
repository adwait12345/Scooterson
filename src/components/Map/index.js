
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, useMap, Popup,   } from 'react-leaflet'
// import markerIconPng from "../../assets/scooter.png"
import { Icon } from 'leaflet'
import Data from '../../data/vehicle';
import SearchField from "./SearchField";


import './control.css'
import Card from '../Card';
import Image from 'next/image';
import { RotatedMarker } from './RotatedMarker';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProgressCircle } from "@tremor/react";
import Loader from '../Loader/Loader';



export default function MyAwesomeMap() {
    const position = [51.505, -0.10]
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
    const prov = new OpenStreetMapProvider();


    return (
        <>
            <div className="flex items-end justify-end w-full h-screen">
                {loading?
                <div className="w-2/3 h-full flex items-center justify-center">
                   <Loader/> 
                </div>
                
                :
                
                   <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <SearchField
                        provider={prov}
                        showMarker={true}
                        showPopup={false}
                        popupFormat={({ query, result }) => result.label}
                        maxMarkers={3}
                        retainZoomLevel={false}
                        animateZoom={true}
                        autoClose={false}
                        searchLabel={"Enter address, please"}
                        keepResult={true}
                    />
                    <TileLayer
                        url="https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=dQryrU0TBw6uq3m2Em7J"
                    />
                                         {Response.map((e, key) => {
                        return (
                            <RotatedMarker rotationAngle={e.rot} rotationOrigin='center'
                                  key={key} position={[e.currentLoc[0], e.currentLoc[1]]} icon={new Icon({ iconUrl: "/scooter-map.png", iconSize: [40, 40],  className:"rotate-45" })}>
                                <Popup>
                                    <>
                                        <div className="flex items-center w-full justify-between">
                                            <div className="flex flex-col text-left font-Poppins">
                                                <span className='text-[11px] font-semibold text-[#B0B0B0] '>Model number</span>
                                                <h1 className='font-bold'>{e.model}</h1>
                                                <p className='text-[13px]'>{e.warrenty}</p>
                                            </div>
                                            <div className="">
                                                <Image src="/scooter-red.png" alt='' width={80} height={80} />
                                            </div>
                                        </div>
                                        <span className=' font-Poppins font-semibold text-[10px] cursor-pointer underline'>Details</span>
                                    </>
                                </Popup>
                            </RotatedMarker>)
                    })}   
                    



                </MapContainer>
                }
             
            </div>

        </>
    )
}
