"use client"
import React from 'react'
import {motion} from 'framer-motion'
import ShinyButton from './ShinyButton'
import Link from 'next/link'

export default function HeaderText() {
  return (
    <motion.div
    initial={{ opacity: 0}}
    whileInView={{ opacity: 1}}
    transition={{duration: 1}}
    className='text-background flex flex-col gap-4 relative drop-shadow-lg items-center bg-neutral-900 rounded-xl px-12 py-8'
    >
        <h2 className="font-bold text-2xl md:text-4xl">Explore places now!</h2>
        <div className="flex flex-col gap-2 items-center">
          <Link href="/explore">
            <ShinyButton/>
          </Link>
          <p className='md:text-lg text-base text-muted-foreground my-2'>ASDADAD</p>
        </div>
    </motion.div>
  )
}
