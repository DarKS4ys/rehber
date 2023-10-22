"use client"
import { useLanguage } from '@/app/[lang]/languageContext';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner';
import { motion } from 'framer-motion';
import Carousel from './Carousel';
import Image from 'next/image';
import { FiLoader } from 'react-icons/fi';
import Loading, { LoadingImage, LoadingText } from './Loading';
import { clsx } from 'clsx';

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
    mapsUrl: string;
  }

  interface ActivityTypes {
    id: string;
    iconUrl: string;
    label: string;
    color: string;
    border: string;
  }

export default function Content({placeLocal}: {placeLocal: any}) {

  const fadeInAnimationVariants = { // for framer motion  
    initial: {
        opacity: 0,
        scale: 0.5,
        y: 50,
    },
    animate: (index: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          delay: 0.05 * index,
          type: "spring",
          stiffness: 260,
          damping: 20
        }
    })
  }

    const { selectedLanguage } = useLanguage();
    const router = useRouter();
    const { placeId } = useParams()

    const [place, setPlace] = useState<PlaceTypes | null>(null);
    const [content, setContent] = useState<ContentTypes | null>(null);
    const [media, setMedia] = useState<MediaTypes | null>(null);
    const [activities, setActivities] = useState<ActivityTypes[] | null>(null);

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

                const activitiesDocumentRef = doc(db, 'places', placeId as string, 'content', 'activities');
                const activitiesDocSnap = await getDoc(activitiesDocumentRef);
                
                if (activitiesDocSnap.exists()) {
                  const activitiesData = activitiesDocSnap.data();
                  const activitiesArray = Object.keys(activitiesData).map((activityId) => {
                    const activity = activitiesData[activityId];
                    return {
                      id: activityId,
                      iconUrl: activity.iconUrl,
                      label: activity.label[selectedLanguage] || activity.label.en,
                      color: activity.color,
                      border: activity.border
                    };
                  });
                
                  setActivities(activitiesArray);
                } else {
                  toast.error(`${placeLocal.activityError}`)
                }
    
                const MediaRef = doc(db, 'places', placeId as string, 'content', 'media');
                const mediaSnap = await getDoc(MediaRef)
    
                if(mediaSnap.exists()) {
                  const mediaData = mediaSnap.data();
    
                  const media = {
                    firstImg: mediaData.firstImg,
                    carouselMedia: mediaData.carouselMedia,
                    mapsUrl: mediaData.mapsUrl
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
      }, [placeId, router, selectedLanguage, placeLocal.error, placeLocal.activityError]);
    
      if (!place) {
        return <div className="w-full h-screen flex items-center justify-center text-2xl"><FiLoader size={64} className="animate-spin"/></div>;
      }

  return (
    <section className='flex flex-col items-center w-full h-full'>
      <Toaster />
      <div className='h-[20rem] w-full flex relative overflow-hidden group text-center'>
        <h1 className='text-6xl font-semibold z-20 items-center justify-center flex w-full uppercase text-white group-hover:opacity-0 transition duration-500'>{place.name}</h1>
        {place.image ? 
        <Image priority={true} alt={place.name} src={place.image} fill className='brightness-50 group-hover:brightness-100 object-cover group-hover:scale-105 transition duration-500'/>
        : <div className="bg-black/5 w-full h-full animate-pulse"/>}
      </div>
      <div className='flex flex-col items-center p-8 py-4 gap-6 max-w-[1200px] rounded-lg'>      
      
      <p className="text-2xl font-medium text-center">{place.description}</p>
        <div className="flex flex-col gap-4">
{/*           <h1 className="text-2xl">Some of the things you can do here:</h1> */}
          {activities ? (
          <ul className="flex gap-2">
            {activities.map((activity, index) => (
              <motion.div viewport={{once: true }} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" key={activity.id} custom={index}>
              <li style={{ borderColor: `${activity.border}`, backgroundColor: `${activity.color}`}} className={`mx-auto flex text-sm flex-col items-center justify-center gap-1 p-2 border rounded-xl md:w-32 md:h-24 w-24 h-20 hover:bg-green-400 hover:shadow-xl shadow-green-400 transition duration-200`}>
                  <div className='w-8 h-8 relative'>
                    <Image fill src={activity.iconUrl} alt={activity.label} />
                  </div>
                  <h3 className="md:text-base text-sm">{activity.label}</h3>
              </li>
              </motion.div>
            ))}
          </ul>
      ) : <Loading/>}
      </div>

        {content ? 
          <p className='md:text-lg'>{content.header}</p>
          : <LoadingText/>
        }

        {media?.carouselMedia ? (
        <motion.div
        initial={{y: 50, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{once: true }}
        className='w-full flex items-center justify-center'        >
          <Carousel images={media.carouselMedia} />
        </motion.div>
        ) : <LoadingImage/>}

        {content ? 
          <p className='md:text-lg'>{content.middle}</p>
          : <LoadingText/>
        }

        {media ? 
        <motion.div className='md:w-[44rem] md:h-[26rem] w-full h-[16rem] relative overflow-hidden group rounded-lg'
        initial={{y: 50}}
        whileInView={{y: 0}}
        viewport={{once: true }}
        >
          <Image alt='Image' fill src={media?.firstImg} className="object-cover rounded-lg group-hover:scale-105 transition duration-200"/>
        </motion.div>
        : <LoadingImage/>}

        {content ? 
          <p className='md:text-lg'>{content.last}</p>
          : <LoadingText/>
        }

        <h1 className='text-3xl font-semibold my-8'>{placeLocal.go}</h1>

        {media ?
        <motion.div
        initial={{y: 50, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{once: true }}
        >
          <iframe
          className='rounded-lg w-full h-[16rem] md:w-[44rem] md:h-[26rem]'
          src={media.mapsUrl}
          loading="lazy"
          ></iframe>
        </motion.div>
        : <LoadingImage/>
        }

      </div>
    </section>
  )
}
