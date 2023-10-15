import { useLanguage } from '@/app/[lang]/languageContext';
import React from 'react'

export default function NotFound() {
const { selectedLanguage } = useLanguage(); // Use the hook to get the selected language
  return (
    <div>NotFound</div>
  )
}
