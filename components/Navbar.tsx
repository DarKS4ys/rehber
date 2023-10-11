"use client"

import { ModeToggle } from './ui/toggle-mode'
import LangSwitch from './LangSwitch'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NavItems = [
  {
    label: 'Explore',
    href: '/explore'
  },
  {
    label: 'Contact',
    href: '/contact'
  },
  {
    label: 'Homepage',
    href: '/'
  },
]

export default function Nav({navbar}: {navbar: any}) {
  let [activeTab, setActiveTab] = useState(NavItems[1].label)
  const pathname = usePathname();
  const pathnameWithoutLanguage = pathname.replace(/^\/[a-z]{2}\//, '/');
  

  return (
    <header className='w-full sticky top-0 bg-opacity-80 backdrop-blur-md bg-[--background] dark:shadow-none shadow-lg dark:border-border dark:border-b z-50'>
      <div className='md:max-w-[1000px] mx-auto'>
        <ul className='flex items-center justify-between px-8 py-4'>
          <li className="hidden md:flex ">
            <Link href={'/'} className='text-2xl font-semibold tracking-wide text-highlight'>
              TRABZON REHBERİM
            </Link>
          </li>
          <li className="md:flex gap-4 hidden">
          {NavItems.map((item)=> (
            <Link onClick={() => setActiveTab(item.label)} href={pathnameWithoutLanguage === item.href ? '/' : item.href} key={item.label} className={clsx(
              'px-3 py-2 hover:bg-highlighthover rounded-xl transition duration-200 hover:text-zinc-200',
              pathnameWithoutLanguage === item.href
              ? 'text-white bg-highlight'
              : 'text-zinc-600 dark:text-muted-foreground'
            )}>
              {item.label}
            </Link>
          ))}
          </li>
          <li className='flex gap-4 items-center justify-end'>
            <ModeToggle navbar={navbar}/>
            <LangSwitch navbar={navbar}/>
          </li>
        </ul>
      </div>
    </header>
  )
}
