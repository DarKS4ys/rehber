"use client"

import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SearchBar from './Searchbar';
import TagFilter from './TagFilter';
import NotFound from './NotFound';
import { motion } from 'framer-motion';

interface Place {
  id: string;
  image: string;
  name: string;
  description: string;
  tags: string[];
}

export default function Places({ userLanguage, explore }: { userLanguage: string, explore: any }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fadeInAnimationVariants = { // for framer motion  
    initial: {
        opacity: 0,
        scale: 0.7,
        y: 10,
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

  useEffect(() => {
    const placesCollectionRef = collection(db, 'places');

    const unsubscribe = onSnapshot(placesCollectionRef, (snapshot) => {
      try {
        const placesData = snapshot.docs.map((doc) => {
          const data = doc.data();

          const languageData = {
            name: data.name?.[userLanguage] || data.name?.en || 'Default Name',
            description: data.description?.[userLanguage] || data.description?.en || 'Default Description',
            tags: data.tags?.[userLanguage] || data.tags?.en || [''],
          };

          return {
            id: doc.id,
            image: data.image || '',
            ...languageData,
          };
        }) as Place[];

        setPlaces(placesData);
      } catch (err) {
        console.log(err);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userLanguage]);

  useEffect(() => {
    const filtered = places.filter((place) => {
      const nameMatch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = selectedTags.every(tag => place.tags.includes(tag));

      return nameMatch && tagMatch;
    });

    setFilteredPlaces(filtered);
  }, [places, searchQuery, selectedTags]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {

        // removes the tag if already selected
        return prevSelectedTags.filter(selectedTag => selectedTag !== tag);
      } else {

        // adds the tag if not already selected
        return [...prevSelectedTags, tag];
      }
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <SearchBar onSearch={handleSearch} search={explore.main.search}/>
      <TagFilter tags={getUniqueTags(places)} onTagFilter={handleTagFilter} selectedTags={selectedTags} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {searchQuery && filteredPlaces.length === 0 ? (
        <motion.div className="col-span-3"
        initial={{y:100, opacity:0}}
        animate={{y:0, opacity: 1}}
        >
          <NotFound label={explore.main.notFound} />
        </motion.div>
        ) : (
        filteredPlaces.map((place, index) => (
          <motion.div key={place.name}
          custom={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          >
            <PlaceCard place={place} />
          </motion.div>
        ))
      )}
    </div>
    </div>
  );
}

const getUniqueTags = (places: Place[]): string[] => {
  const allTags = places.flatMap((place) => place.tags);
  return Array.from(new Set(allTags));
};