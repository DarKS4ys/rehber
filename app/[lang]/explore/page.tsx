import Places from '@/components/Places'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Explore({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const {explore} = await getDictionary(lang)

  return (
    <main className='p-8 h-full max-w-[1200px] mx-auto flex flex-col gap-2'>
      <div className='text-center p-4 items-center justify-center w-full text-3xl font-semibold'>
        <h1 className="uppercase tracking-wide">{explore.main.title}</h1>
      </div>
      <Places explore={explore} userLanguage={lang}/>
    </main>
  )
}
