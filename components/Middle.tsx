"use client"
import React, { useRef } from 'react'
import HeaderText from './HeaderText'
import {motion} from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import MiddleText from './MiddleText'

export default function Middle({page}: {page: any}) {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "900%"]);

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden py-40 h-screen w-full flex gap-4 justify-center text-center relative"
    >
        <div className="relative">
            <motion.div className="z-10" style={{ y: textY }}>
                <MiddleText />
            </motion.div>
            <div className='-z-50 absolute top-0 items-center justify-center flex flex-col w-full'>
                <p>SADDADSADASDADASD</p>
                <p>SADDADSADASDADASD</p>
                <p>SADDADSADASDADASD</p>
                <p>SADDADSADASDADASD</p>
                <p>SADDADSADASDADASD</p>
                <p>SADDADSADASDADASD</p>
                <p>SADDADSADASDADASD</p>
            </div>
        </div>
        <div className="absolute inset-0 z-20 bottom-0">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>
    </motion.div>
  );
  }
