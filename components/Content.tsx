"use client"
import { useLanguage } from '@/app/[lang]/languageContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner';
import { motion } from 'framer-motion';
import Carousel from './Carousel';
import Image from 'next/image';

interface PlaceTypes {
    id: string;
    name: string;
    description: string;
    image: string;
    tags: string[];
  }
  
  interface ContentTypes {
    id: string;
    header: string;
    middle: string;
    last: string
  }
  
  interface MediaTypes {
    firstImg: string;
    carouselMedia: string[];
  }

export default function Content({placeLocal}: {placeLocal: any}) {

    const { selectedLanguage } = useLanguage();
    const router = useRouter();
    const { placeId } = useParams()

    const [place, setPlace] = useState<PlaceTypes | null>(null);
    const [content, setContent] = useState<ContentTypes | null>(null);
    const [media, setMedia] = useState<MediaTypes | null>(null);

    useEffect(() => {
        let errorDisplayed = false;
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
    
                //! CONTENT
    
                const contentDocumentRef = doc(db, 'places', placeId as string, 'content', selectedLanguage);
                const contentSnap = await getDoc(contentDocumentRef)
    
                const MediaRef = doc(db, 'places', placeId as string, 'content', 'media');
                const mediaSnap = await getDoc(MediaRef)
    
                if(mediaSnap.exists()) {
                  const mediaData = mediaSnap.data();
    
                  const media = {
                    firstImg: mediaData.firstImg,
                    carouselMedia: mediaData.carouselMedia
                    // add more
                  }
    
                  setMedia({
                    /* firstImg: mediaData.firstImg */
    
                    ...media
                  })
                }
    
                if(contentSnap.exists()) {
                  const contentData = contentSnap.data();
    
                  const content = {
                    header: contentData.header,
                    middle: contentData.middle,
                    last: contentData.last
                    // add more
                  }
    
                  setContent({
                    id: contentSnap.id,
    
                    ...content
                  })
    
                  console.log(contentData)
                } else {
                  errorDisplayed = false
                  if (!errorDisplayed) {
                    toast.error(`${placeLocal.error}`)
                    errorDisplayed = true
                    return;
                  }
                }
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
      }, [placeId, router, selectedLanguage, placeLocal.error]);
    
      if (!place) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
      }

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <Toaster />
      <div className='h-[20rem] w-full flex relative overflow-hidden group text-center'>
        <h1 className='text-6xl font-semibold z-20 items-center justify-center flex w-full uppercase text-white group-hover:opacity-0 transition duration-500'>{place.name}</h1>
        <Image priority={true} alt={place.name} src={place.image} fill className='brightness-50 group-hover:brightness-100 object-cover group-hover:scale-105 transition duration-500'/>
      </div>
      <div className='flex flex-col items-center p-8 gap-6 max-w-[1200px] rounded-lg'>
        <p className="text-2xl text-center">{place.description}</p>

        {content ? 
          <p className='md:text-lg'>{content.header}</p>
          : <p>Loading...</p>
        }

        {media?.carouselMedia ? (
        <motion.div
        initial={{y: 50, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        className='w-full flex items-center justify-center'        >
          <Carousel images={media.carouselMedia} />
        </motion.div>
        ) : null}

        {content ? 
          <p className='md:text-lg'>{content.middle}</p>
          : <p>Loading...</p>
        }

        {media ? 
        <motion.div className='md:w-[44rem] md:h-[26rem] w-full h-[16rem] relative overflow-hidden group rounded-lg'
        initial={{y: 50}}
        whileInView={{y: 0}}
        >
          <Image alt='Image' fill src={media?.firstImg} className="object-cover rounded-lg group-hover:scale-105 transition duration-200"/>
        </motion.div>
        : null}

        {content ? 
          <p className='md:text-lg'>{content.last}</p>
          : <p>Loading...</p>
        }

        <h1 className='text-3xl font-semibold my-8'>Go there now!</h1>

        <iframe
        className='rounded-lg w-full h-[16rem] md:w-[44rem] md:h-[26rem]'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1505.4478333256036!2d39.730222692845594!3d41.00565674770153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40643c4467d413c3%3A0xe0d8e39ac277ba48!2sTrabzon%20Square%20Park!5e0!3m2!1sen!2str!4v1697826063681!5m2!1sen!2str'
        loading="lazy"
        ></iframe>

      </div>
    </section>
  )
}
