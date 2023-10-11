"use client"
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import {VscCircleFilled} from 'react-icons/vsc'
import {BiChevronDown} from 'react-icons/bi'

export default function LangSwitch() {
    const router = useRouter();
    let { lang } = useParams();

    const [currentLang, setCurrentLang] = useState<string | string[]>("...")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    useEffect(() => {
        if(lang == "tr") {
          setCurrentLang("Turkish");
        } else if (lang == "en") {
          setCurrentLang("English")
        } else {
          setCurrentLang("?")
        }

        console.log(lang)
    }, [lang])

    const changeLang = (newLang: string) => {
      if (lang != newLang) {
        let lang = newLang
        
        const newUrl = `/${lang}`
        router.push(newUrl)
      }
    }

    const toggleDropdown = () => {
      setIsDropdownOpen((prevState) => !prevState);
    };

    const arrowClass = isDropdownOpen ? "rotate-180" : "";


    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`bg-highlight hover:bg-highlighthover duration-200 `}
            onClick={toggleDropdown} // Toggle dropdown state on button click
          >
          <p>{currentLang}</p>
          <BiChevronDown size={20} className=""/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuItem key="en" onClick={() => changeLang("en")} >
          <p className='flex gap-2 items-center'>
            English
            {currentLang == "English" ?
            <VscCircleFilled/>
            : null}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem key="tr" onClick={() => changeLang("tr")} >
          <p className='flex gap-2 items-center text-popover-foreground'>
            Turkish
            {currentLang == "Turkish" ?
            <VscCircleFilled/>
            : null}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
