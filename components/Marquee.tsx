import React from 'react'
import Marquee from "react-fast-marquee";
import FeatureCard from './FeatureCard';
import { AiOutlineBank, AiOutlineShopping } from 'react-icons/ai';
import {HiOutlineSparkles, HiOutlineTicket} from 'react-icons/hi'
import {MdOutlineFastfood, MdOutlineForest} from 'react-icons/md'
import {TbBeach} from 'react-icons/tb'

export default function MarqueeComponent({marqueeLocal}: {marqueeLocal: any}) {
  const featureData = [
    {
      title: marqueeLocal.marquee.shopping,
      icon: <AiOutlineShopping size={24} />,
      color: 'bg-red-500',
      border: 'border-red-500',
      'text': 'text-red-600'
    },
    {
      title: marqueeLocal.marquee.history,
      icon: <AiOutlineBank size={24} />,
      color: 'bg-emerald-500',
      border: 'border-emerald-500',
      text: 'text-emerald-600'
    },
    {
      title: marqueeLocal.marquee.entertainment,
      icon: <HiOutlineTicket size={24} />,
      color: 'bg-violet-500',
      border: 'border-violet-500',
      text: 'text-violet-600'
    },
    {
      title: marqueeLocal.marquee.beaches,
      icon: <TbBeach size={24} />,
      color: 'bg-yellow-500',
      border: 'border-yellow-500',
      text: 'text-yellow-600'
    },
    {
      title: marqueeLocal.marquee.foodanddrink,
      icon: <MdOutlineFastfood size={24} />,
      color: 'bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-600'
    },
    {
      title: marqueeLocal.marquee.art,
      icon: <HiOutlineSparkles size={24} />,
      color: 'bg-pink-500',
      border: 'border-pink-500',
      text: 'text-pink-600'
    },
    {
      title: marqueeLocal.marquee.nature,
      icon: <MdOutlineForest size={24} />,
      color: 'bg-green-500',
      border: 'border-green-500',
      text: 'text-green-600'
    },
  ];
  return (
    <div className="w-full py-16">
      <h1 className='text-3xl flex justify-center pb-8 font-medium'>{marqueeLocal.title}</h1>
      <Marquee gradient gradientColor='background' pauseOnHover autoFill>
      <div className='flex'>
      {featureData.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} icon={feature.icon} color={feature.color} border={feature.border} text={feature.text} />
        ))}
      </div>
      </Marquee>
    </div>
  )
}
