import React from 'react'
import { clsx } from 'clsx';

interface CardProps {
  title: string,
  icon: React.ReactNode,
  color: string,
  border:string
  text:string
}

export default function FeatureCard({icon, title, color, border, text}: CardProps) {
  return (
    <div className={clsx('border mr-2 flex flex-col justify-center items-center gap-1 px-16 py-6 rounded-xl bg-opacity-5 hover:bg-opacity-30 transition duration-300', color, border)}>
        <div className={clsx('rounded-full flex flex-col justify-center items-center p-4 w-14 h-14 bg-opacity-10', color, text)}>
          {icon}
        </div>
        <p className="text-lg pt-2">{title}</p>
    </div>
  )
}
