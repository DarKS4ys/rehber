import React from 'react'

export default function Loading() {
  return (
    <div className="flex gap-2">
        <div className="md:w-32 md:h-24 w-24 h-20 animate-pulse bg-primary/20 rounded-lg"/>
        <div className="md:w-32 md:h-24 w-24 h-20 animate-pulse bg-primary/20 rounded-lg"/>
    </div>
  )
}

export function LoadingText() {
    return (
        <div className="flex flex-col gap-2 w-[1200px]">
            <div className="h-4 w-full animate-pulse bg-primary/20 rounded-lg"/>
            <div className="h-4 w-full animate-pulse bg-primary/20 rounded-lg"/>
            <div className="h-4 w-full animate-pulse bg-primary/20 rounded-lg"/>
            <div className="h-4 w-full animate-pulse bg-primary/20 rounded-lg"/>
            <div className="h-4 w-full animate-pulse bg-primary/20 rounded-lg"/>
            <div className="h-4 w-2/4 animate-pulse bg-primary/20 rounded-lg"/>
        </div>
      )  
}

export function LoadingImage(){
  return ( 
    <div className='w-full h-[16rem] md:w-[44rem] md:h-[26rem] rounded-lg bg-primary/20 animate-pulse'/>
  )
}