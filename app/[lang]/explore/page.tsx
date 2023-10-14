import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Explore({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  return (
    <main className='h-full max-w-[1000px] mx-auto'>
      Test Page
    </main>
  )
}
