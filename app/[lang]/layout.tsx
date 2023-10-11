import { Locale, i18n } from '@/i18n.config'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trabzon Rehberim',
  description: 'Trabzon rehberi ile şehir hakkında bilgi al.',
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale}))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: {lang: Locale}
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Navbar/>
        {children}
        </Providers>
      </body>
    </html>
  )
}
