import { Locale, i18n } from '@/i18n.config'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import { getDictionary } from '@/lib/dictionary'
import { LanguageProvider } from './languageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trabzon Rehberim',
  description: 'Trabzon rehberi ile şehir hakkında bilgi al.',
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale}))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: {lang: Locale}
}) {

  const {page} = await getDictionary(params.lang)
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Providers>
        <LanguageProvider initialLanguage={params.lang}>
        <Navbar navbar={page.navbar}/>
          {children}
        </LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}
