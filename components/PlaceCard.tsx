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
    <Link href={`${pathname}/places/${place.id}`} className='flex flex-col gap-2'>
      <p>{place.name}</p>
      <p>{place.description}</p>
      <p>{place.id}</p>
      {place.tags.map((tag, index) => (
        <li key={index}>{tag}</li>
      ))}
      <div className='w-40 h-40'>
        <Image height={300} width={300} alt={place.name} src={place.image}/>
      </div>
    </Link>
  )
}
