import { Locale } from '@/i18n.config'
import React from 'react'
import ImageBlob from './ImageBlob'
import HeaderText from './HeaderText'
import { getDictionary } from '@/lib/dictionary'
import ThreeDTest from './3DTest'

export default async function Header({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang)
  return (
    <div className='h-screen w-full items-center flex flex-col py-40 text-lg relative text-center p-4'>

{/*         <div className='absolute top-0 left-0 w-full h-full -z-50 justify-center flex'>
        </div> */}
        <div>
        <HeaderText page={page}/>
        </div>
    </div>
  )
}
