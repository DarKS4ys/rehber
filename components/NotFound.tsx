import Image from 'next/image';
import React from 'react'
import NotFoundImage from '@/public/notfoundwebp.webp'


export default function NotFound({label}: {label: string}) {
  return (
    <div className='text-2xl md:text-3xl w-full items-center justify-center flex flex-col gap-8 my-8'>
      {label}
      <Image
      alt={label}
      src={NotFoundImage}
      loading='lazy'
      className='md:w-96 w-64 drop-shadow-md'
      />
    </div>
  )
}
