"use client"
import React from 'react'
import {motion} from 'framer-motion'
import ThreeDTest from './3DTest'

export default function HeaderText({ page }: { page: any }) {
  return (
    <motion.div
    initial={{y:100, opacity: 0}}
    animate={{y:0, opacity: 1}}
    className='flex flex-col gap-2 drop-shadow-lg relative'
    >
      <div className='absolute bottom-32 md:bottom-40 right-0 w-full h-full justify-center flex z-10 drop-shadow-lg'>
          <ThreeDTest/>
        </div>
        <h2 className="font-bold text-3xl md:text-4xl">{page.header.welcome}</h2>
        <h1 className='font-bold text-7xl md:text-8xl text-highlight'>{page.header.city}</h1>
        <p className='md:text-lg text-base text-muted-foreground my-2'>{page.header.description}</p>
    </motion.div>
  )
}
