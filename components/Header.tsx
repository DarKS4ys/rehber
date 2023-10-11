"use client"
import React, { useRef } from 'react'
import ImageBlob from './ImageBlob'
import HeaderText from './HeaderText'
import ThreeDTest from './3DTest'
import {motion} from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'

export default function Header({page}: {page: any}) {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "260%"]);

  return (
    <div ref={ref} className='overflow-hidden h-screen w-full items-center flex flex-col py-32 md:py-18 2xl:py-40 text-lg relative text-center p-4'>
        
      <motion.div className='z-20 relative'
      style={{y: textY}}
      >
        <div className='absolute bottom-32 md:bottom-40 left-0 w-full h-full justify-center flex z-10 drop-shadow-lg'>
          <ThreeDTest/>
        </div>
        <HeaderText page={page}/>
      </motion.div>

      <motion.div
      className='absolute inset-0 z-0 opacity-60 dark:opacity-80'
      style={{
        backgroundImage: `url(/parallaxfull.jpg)`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        y: backgroundY
      }}
      />
      <div
      className='absolute inset-0 z-30'
      style={{
        backgroundImage: `url(/parallax-bottom.png)`,
        backgroundPosition: "bottom",
        backgroundSize: "cover"
      }}
      />
    </div>
  )
}
