"use client"




import dynamic from "next/dynamic"

const MyAwesomeMap = dynamic(() => import("../../../components/Map/index"), { ssr: false })
export default function page() {
  return (
    <>
    <MyAwesomeMap/>
    </>
  )
}
