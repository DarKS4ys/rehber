import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function ImageBlob({image}: {image:string | StaticImageData}) {
  return (
    <div className='rounded-xl flex'>
        <Image className='object-cover rounded-xl w-[14rem] h-[22rem]' width={800} height={800} alt="place image" src={image}/>
    </div>
  )
}
