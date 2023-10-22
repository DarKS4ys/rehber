import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MarqueeComponent from '@/components/Marquee'
import Middle from '@/components/Middle'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Home({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const { page } = await getDictionary(lang)

  return (
    <main>
      <Header header={page.header}/>
      <MarqueeComponent marqueeLocal={page.marqueeLocal}/>
      <Middle middle={page.middle}/>
      <Contact contact={page.contact}/>
      <Footer footer={page.footer}/>
    </main>
  )
}
