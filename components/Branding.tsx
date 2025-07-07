'use client'

import Image from "next/image"

import icon from '@/public/icon.svg'

export default function Branding() {
    return (
        <div className="flex flex-row gap-2">
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
        </div>
    )
}