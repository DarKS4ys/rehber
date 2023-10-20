import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const [selectedDot, setSelectedDot] = useState(0);

  const slideToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedDot((prevDot) => (prevDot + 1) % images.length);
  };

  const slideToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSelectedDot((prevDot) => (prevDot - 1 + images.length) % images.length);
  };

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;

    if (autoSlide) {
      slideInterval = setInterval(slideToNextImage, 5000);
    }

    return () => {
      clearInterval(slideInterval);
    };
  },);

  const handleMouseEnter = () => {
    setAutoSlide(false);
  };

  const handleMouseLeave = () => {
    setAutoSlide(true);
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedDot(index);
  };

  return (
    <div
      className="relative w-full h-[16rem] md:w-[44rem] md:h-[26rem] overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ x: index === currentImageIndex ? 0 : (index > currentImageIndex ? '100%' : '-100%') }}
          animate={{ x: index === currentImageIndex ? 0 : (index > currentImageIndex ? '100%' : '-100%') }}
          exit={{ x: index === currentImageIndex ? 0 : (index > currentImageIndex ? '100%' : '-100%') }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full"
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </motion.div>
      ))}

      <button
        className="hover:scale-110 active:scale-100 absolute top-1/2 -mt-4 left-4 text-2xl hover:bg-white text-black bg-white/60 dark:text-white dark:bg-black/60 dark:hover:bg-black transition duration-150 p-2 rounded-full"
        onClick={slideToPrevImage}
      >
        <ChevronLeft />
      </button>
      <button
        className="hover:scale-110 active:scale-100 absolute top-1/2 -mt-4 right-4 text-2xl hover:bg-white text-black bg-white/60 dark:text-white dark:bg-black/60 dark:hover:bg-black transition duration-150 p-2 rounded-full"
        onClick={slideToNextImage}
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full bg-white cursor-pointer transition duration-200 border border-white hover:bg-neutral-300 dark:hover:border-neutral-900 shadow-md ${selectedDot === index ? ' scale-125 dark:border-neutral-900 dark:!bg-neutral-800 !border-neutral-200 !bg-neutral-400 hover:bg-neutral-400' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;