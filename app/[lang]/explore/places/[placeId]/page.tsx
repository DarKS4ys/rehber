"use client"

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import 'useParams' from 'next/router'
import { useLanguage } from '@/app/[lang]/languageContext';

interface PlaceTypes {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export default function PlaceId({userLanguage}: {userLanguage: string}) {
  const router = useRouter();
  const { placeId } = useParams()

  const { selectedLanguage } = useLanguage(); // Use the hook to get the selected language
  console.log('user lang is ' + selectedLanguage)

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
    // You can show a loading indicator here while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{place.name}</p>
      <p>{place.description}</p>
    </div>
  );
}
