'use client'

import Image from "next/image"

import icon from '@/public/icon.svg'
import Link from "next/link"

export default function Branding() {
    return (
        <Link href='/' className="flex flex-row gap-2">
            <Image
                src='../icon.svg'
                alt='NeighborhoodPins icon'
                width={40}
                height={40}
                className=''
                priority
            />
            <Image
                src='../logo.svg'
                alt='NeighborhoodPins logo'
                width={300}
                height={80}
                className='mt-2 hidden md:inline-block'
                priority
            />
        </Link>
    )
}