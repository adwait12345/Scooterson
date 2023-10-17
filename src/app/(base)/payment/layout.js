import Card from '@/components/Card'
import Data from '@/data/vehicle'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Payment',
    description: 'Generated by create next app',
}

export default function HomeLayout({ children }) {
    return (
        <div className="container">

            <div className="">{children}</div>
        </div>
    )
}
