import React from 'react';
import Content from '@/components/Content';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function PlaceId({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const { place } = await getDictionary(lang)
  return (
    <Content placeLocal={place}/>
  );
}

//! FINISH ASAP