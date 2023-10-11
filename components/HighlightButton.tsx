import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface HighlightButtonProps {
    children: ReactNode;
    className?: string | null;
  }
  

export default function HighlightButton({children, className}: HighlightButtonProps) {
  return (
    <button className={clsx("bg-highlight hover:bg-highlighthover text-white py-2 px-4 rounded-lg transition duration-200", className)}>
      {children}
    </button>
  )
}
