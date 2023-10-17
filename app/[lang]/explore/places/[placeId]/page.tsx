"use client"

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/app/[lang]/languageContext';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion'; // Import Framer Motion


interface PlaceTypes {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export default function PlaceId() {
  const router = useRouter();
  const { placeId } = useParams()

  const { selectedLanguage } = useLanguage(); // Use the hook to get the selected language

  const [place, setPlace] = useState<PlaceTypes | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (placeId) {
          const placeDocRef = doc(db, 'places', placeId as string);
          const placeSnap = await getDoc(placeDocRef);

          if (placeSnap.exists()) {
            const placeData = placeSnap.data();

            const languageData = {
              name: placeData.name?.[selectedLanguage] || placeData.name?.en || 'Default Name',
              description: placeData.description?.[selectedLanguage] || placeData.description?.en || 'Default Description',
              tags: placeData.tags?.[selectedLanguage] || placeData.tags?.en || [],
            };

            setPlace({
              id: placeSnap.id,
              image: placeData.image || '',
              
              ...languageData,
            });
          } else {
            router.push('/404');
          }
        } else {
          router.push('/');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlace();
  }, [placeId, router, selectedLanguage]);

  if (!place) {
    return <div>Loading...</div>;
  }
  

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <div className='h-[20rem] w-full flex relative overflow-hidden group text-center'>
        <h1 className='text-6xl font-semibold z-50 items-center justify-center flex w-full uppercase text-background group-hover:opacity-0 transition duration-500'>{place.name}</h1>
        <Image priority={true} alt={place.name} src={place.image} fill className='brightness-50 group-hover:brightness-100 object-cover group-hover:scale-125 transition duration-500'/>
      </div>
      <div className='flex flex-col items-center p-8'>
        <p className="text-2xl">{place.description}</p>
      </div>
    </section>
  );
}
