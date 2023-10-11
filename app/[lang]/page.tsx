import Header from '@/components/Header'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Home({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const { page } = await getDictionary(lang)

  return (
    <main className='h-[400rem]'>
      <Header page={page}/>
      {/* <ThreeDTest/> */}
    </main>
  )
}
