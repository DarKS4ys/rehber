"use client"
import React from 'react'
import {motion} from 'framer-motion'
import ShinyButton from './ShinyButton'

export default function HeaderText() {
  return (
    <motion.div
    initial={{ opacity: 0}}
    whileInView={{ opacity: 1}}
    transition={{duration: 1}}
    className='flex flex-col gap-4 relative drop-shadow-lg items-center'
    >
        <h2 className="font-bold text-3xl md:text-4xl">Explore places now!</h2>
        <ShinyButton/>
        <p className='md:text-lg text-base text-muted-foreground my-2'>ASDADAD</p>
    </motion.div>
  )
}
