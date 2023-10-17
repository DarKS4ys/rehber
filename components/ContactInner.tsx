import { sendEmail } from '@/actions/sendEmail'
import React from 'react'
import {FaPaperPlane} from 'react-icons/fa'

export default function ContactInner({contact}: {contact: any}) {

  return (
    <section className="w-full items-center justify-center flex flex-col px-4 pb-28 2xl:pt-12 py-8">
        <div className='w-[min(100%,38rem)] flex flex-col text-center gap-4'>
        <h1 className='text-3xl md:text-4xl font-semibold'>{contact.title}</h1>
        <p className='text-neutral-700 dark:text-neutral-400'>
        {contact.descriptionpart1}{" "}
          <a className='underline' href='mailto:melihyardim1057@gmail.com'>
            melihyardim1057@gmail.com
          </a>
        {" "}{contact.descriptionpart2}
        </p>

        <form
        className='mt-4 flex flex-col'
        action={async formData => {
          await sendEmail(formData)
        }}
        >
          <input name='senderEmail' className='px-4 h-14 rounded-lg border border-border bg-transparent outline-none focus:border-primary transition duration-200' type="email" required maxLength={100} placeholder={contact.inputplaceholder}/>
          <textarea name='message' className='p-4 h-52 my-3 rounded-lg border border-border bg-transparent outline-none focus:border-primary transition duration-200' required maxLength={5000} placeholder={contact.textareaplaceholder}/>
          <button className="focus:scale-110 hover:scale-110 active:scale-105 group flex gap-2 items-center justify-center h-[3rem] w-[8rem] rounded-full bg-gray-900 hover:bg-gray-950 dark:bg-slate-200 dark:hover:bg-slate-300 outline-none transition-all duration-200 text-white dark:text-black" type='submit'>{contact.buttonLabel}<FaPaperPlane className="transition duration-200 text-xs opacity-80 group-hover:-translate-y-1 group-hover:translate-x-1"/></button>
        </form>
        </div>
    </section>
  )
}
