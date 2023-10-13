"use client"
import React, { useRef } from 'react'
import HeaderText from './HeaderText'
import {motion} from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import MiddleText from './MiddleText'
import ImageBlob from './ImageBlob'
import Image from 'next/image'
import one from '../public/images/1.jpg'
import two from '../public/images/2.jpg'
import three from '../public/images/3.jpg'
import four from '../public/images/4.jpg'
import five from '../public/images/5.jpg'
import six from '../public/images/6.jpg'
import seven from '../public/images/7.jpg'
import eight from '../public/images/8.jpg'
import nine from '../public/images/9.jpg'
import ten from '../public/images/10.jpg'
import eleven from '../public/images/11.jpg'
import twelve from '../public/images/12.jpg'
import useDimension from '@/lib/useDimension'

import styles from '@/components/styles/middle.module.css'

const images = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve
]

export default function Middle({page}: {page: any}) {

  const ref = useRef(null);

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const {height} = useDimension()

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2.2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.9])
  
  const textY = useTransform(scrollYProgress, [0, 1], [0, 1650]);

  return (
    <section className='py-40 relative'>
    <main className='h-[22%] relative  overflow-hidden'>
{/*     <div className="absolute top-0 z-10 bottom-0 w-full h-[20rem]">
      <div className="h-full w-full bg-gradient-to-b from-background via-transparent to-transparent"></div>
    </div> */}
      <div className="justify-center items-center flex flex-col">
        <motion.div className="absolute z-10 pt-20" style={{ y: textY }}>
            <MiddleText />
        </motion.div>
      </div>
      <div className={styles.main}></div>
      <div ref={ref} className={styles.gallery} style={{ zIndex:0}}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>
    </main>
    </section>
/*     <motion.div
      ref={ref}
      className="overflow-hidden py-40 h-[50rem] w-full flex gap-4 justify-center text-center relative"
    >
        <div className="relative">
            <motion.div className="z-10 pt-10" style={{ y: textY }}>
                <MiddleText />
            </motion.div>
            <div className='-z-50 absolute top-0 left-[100%] items-center justify-center flex flex-col w-full'>
              
            </div>
        </div>
        <div className="absolute inset-0 z-20 bottom-0 pointer-events-none">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-white dark:to-background"></div>
        </div>
    </motion.div> */
  );
  }

  const Column = ({images, y=0}: {images:any, y:any}) => {
    return(
      <motion.div style={{y}} className={styles.column}>
        {
          images.map((src:any,index:string) => {
            return <div key={index} className={styles.imageContainer}>
              <Image
              src={src}
              fill
              alt='image'
              className='object-cover'
              />
            </div>
          })
        }
      </motion.div>
    )
  }
