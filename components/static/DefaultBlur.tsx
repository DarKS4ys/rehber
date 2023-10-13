import Image from 'next/image'
import React from 'react'

export default function DefaultBlur({src}: {src:any}) {
  return (
        <div className='relative w-full h-full'>
            <Image
            alt='image'
            src={src}
            fill
            objectFit="cover"
            objectPosition='bottom'
            placeholder='blur'
            />
        </div>
  )
}
