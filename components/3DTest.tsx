"use client"

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Spline from "@splinetool/react-spline";
import LoadingPlaceholder from "./LoadingPlaceholder";

export default function ThreeDTest() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay using setTimeout
    const delay = 2000; // Adjust the delay time as needed
    setTimeout(() => {
      setIsLoaded(true);
    }, delay);
  }, []);

  return (
    <div className='w-full h-full items-center justify-center'>
      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Spline scene="https://prod.spline.design/msKBSmf600hzRoh2/scene.splinecode" />
          {/* <Spline scene="https://prod.spline.design/uaQTXr9Ba8jMeA0E/scene.splinecode" /> */}
        </motion.div>
      ) : (
        <LoadingPlaceholder /> // You can create a loading spinner or any other placeholder component.
      )}
    </div>
  );
}
