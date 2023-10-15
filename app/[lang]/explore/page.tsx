import Places from '@/components/Places'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Explore({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  return (
    <main className='p-8 h-full max-w-[1200px] mx-auto flex flex-col gap-2'>
      <div className='text-center p-4 items-center justify-center w-full text-3xl font-semibold'>
        <h1>Explore</h1>
      </div>
      <Places userLanguage={lang}/>
    </main>
  )
}
