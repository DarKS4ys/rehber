"use client"
import React from 'react'
import {motion} from 'framer-motion'

export default function HeaderText() {
  return (
    <motion.div
    initial={{ opacity: 0}}
    whileInView={{ opacity: 1}}
    transition={{duration: 1}}
    className='flex flex-col gap-4 relative drop-shadow-lg items-center'
    >
        <h2 className="font-bold text-3xl md:text-4xl">Explore places now!</h2>
        <button className='px-6 py-4 w-40 rounded-xl bg-highlight hover:bg-highlighthover hover:scale-125 transition'>EXPLORE</button>
        <p className='md:text-lg text-base text-muted-foreground my-2'>ASDADAD</p>
    </motion.div>
  )
}
