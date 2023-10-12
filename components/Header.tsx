"use client"
import React, { useRef } from 'react'
import HeaderText from './HeaderText'
import {motion} from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import ThreeDTest from './3DTest'
import Image from 'next/image'

export default function Header({page}: {page: any}) {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "270%"]);

  
  return (
    <div ref={ref} className='overflow-hidden h-screen w-full items-center flex flex-col py-32 md:py-18 2xl:py-40 text-lg relative text-center p-4'>
      <motion.div className='z-20 relative' style={{ y: textY }}>
        <div className='absolute bottom-24 md:bottom-36 right-5 w-full h-full justify-center flex z-10 drop-shadow-lg'>
          <ThreeDTest />
        </div>
        <HeaderText page={page} />
      </motion.div>

        <motion.div
          className='absolute inset-0 z-0 opacity-60 dark:opacity-80 dark:hidden'
          style={{
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        >
          {/* Use next/image for background */}
          <Image
            quality={95}
            src="/parallaxfull.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            objectPosition='bottom'
          />
        <div className="absolute inset-0 z-10 bottom-[5rem]">
          <div className="h-full w-full bg-gradient-to-b from-white via-transparent to-transparent"></div>
        </div>
        </motion.div>


      <div className='absolute inset-0 z-30 dark:hidden'>
        {/* Use next/image for background */}
        <Image
          quality={95}
          src="/parallax-bottom.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition='bottom'
        />
        <div className="absolute inset-0 z-10 top-[30rem]">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>
      </div>


        
      <motion.div
        className='absolute inset-0 z-0 opacity-60 dark:opacity-80 dark:flex hidden'
        style={{
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      >
        {/* Use next/image for background */}
        <Image
          quality={95}
          src="/parallaxfull-night.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition='bottom'
        />
        <div className="absolute inset-0 z-10 bottom-[5rem]">
          <div className="h-full w-full bg-gradient-to-b from-neutral-950 via-transparent to-transparent"></div>
        </div>
      </motion.div>

      <div className='absolute inset-0 z-30 dark:flex hidden'>
        {/* Use next/image for background */}
        <Image
          quality={95}
          src="/parallax-bottom-night.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition='bottom'
        />
        <div className="absolute inset-0 z-10 top-[30rem]">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-neutral-950"></div>
        </div>
      </div>
    </div>
  );
}



/* return (
  <div ref={ref} className='overflow-hidden h-screen w-full items-center flex flex-col py-32 md:py-18 2xl:py-40 text-lg relative text-center p-4'>
      
    <motion.div className='z-20 relative'
    style={{y: textY}}
    >
      <div className='absolute bottom-24 md:bottom-36 right-4 w-full h-full justify-center flex z-10 drop-shadow-lg'>
        <ThreeDTest/>
      </div>
      <HeaderText page={page}/>
    </motion.div>

    <motion.div
    className='absolute inset-0 z-0 opacity-60 dark:opacity-80 dark:hidden'
    style={{
      backgroundImage: `url(/parallaxfull.jpg)`,
      backgroundPosition: "bottom",
      backgroundSize: "cover",
      y: backgroundY
    }}
    />
    <div
    className='absolute inset-0 z-30 dark:hidden'
    style={{
      backgroundImage: `url(/parallax-bottom.png)`,
      backgroundPosition: "bottom",
      backgroundSize: "cover"
    }}
    />
  </div>
)
} */