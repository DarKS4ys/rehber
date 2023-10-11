"use client"

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Spline from "@splinetool/react-spline";

export default function ThreeDTest() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const delay = 500;
    setTimeout(() => {
      setIsLoaded(true);
    }, delay);
  }, []);

  return (
    <div className='w-fit h-fit items-center justify-center'>
      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Spline scene="https://prod.spline.design/uaQTXr9Ba8jMeA0E/scene.splinecode" />
        </motion.div>
      ) : (
        "" // You can create a loading spinner or any other placeholder component.
      )}
    </div>
  );
}
