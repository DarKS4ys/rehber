import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface Place {
  id: string;
  image: string;
  name: string;
  description: string;
  tags: string[];
}

export default function PlaceCard({place}: {place: Place}) {
const pathname = usePathname()
  return (
    <Link href={`${pathname}/places/${place.id}`} className='dark:shadow-none shadow pb-4 group relative flex flex-col gap-4 w-full h-[27rem] items-center text-center border border-border hover:border-primary/80 rounded-xl hover:scale-105 transition duration-200 overflow-hidden'>
      <div className="relative group-hover:scale-110 transition duration-200">
        <div className="absolute top-44 left-0 w-full h-20 bg-gradient-to-b from-transparent via-transparent to-background"/>
        <Image loading='lazy' alt='image' src={place.image} width={400} height={200} className='w-full rounded-none h-[15.4rem] object-cover' />
      </div>
      <div className="px-4 pt-4 pb-4 gap-2 flex flex-col relative z-10">
        <h1 className="text-3xl font-medium">{place.name}</h1>
        <h2 className='font-light'>{place.description}</h2>
        <ul className='flex gap-2 justify-center'>
            {place.tags.map((tag, index) => (
            <li className="bg-accent px-4 py-2 rounded-lg text-xs" key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
