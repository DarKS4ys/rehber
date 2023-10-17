import Link from 'next/link'
import React from 'react'

export default function Footer({footer}: {footer:any}) {
  
  const navigationOptions = footer.navigation.options
  const socialsOptions = footer.socials.options

  return (
    <section className='p-10 h-48 flex justify-center items-center border-t border-border'>
      <div className='w-[min(100%,1200px)] flex justify-between h-full'>
        <div className="flex flex-col justify-between h-full">
            <h1 className='tracking-wide text-3xl font-semibold'>
              {footer.title}
            </h1>
            <h2 className='text-sm font-light text-muted-foreground'>
              {footer.legal}
            </h2>
        </div>
        <div className="flex gap-8">
          <div className='flex flex-col gap-2'>
            <h1 className='font-medium'>{footer.navigation.title}</h1>
            <ul className="text-muted-foreground flex flex-col gap-1">
              {Object.entries(navigationOptions).map(([key, value]) => (
                <Link className='hover:underline' href={`#${key}`} key={key}>
                  {typeof value === 'string' ? value : null}
                </Link>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='font-medium'>Socials</h1>
            <ul className="text-muted-foreground flex flex-col gap-1">
            {Object.entries(socialsOptions).map(([key, value]) => (
              <Link className='hover:underline' href={`#${key}`} key={key}>
                {typeof value === 'string' ? value : null}
              </Link>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
