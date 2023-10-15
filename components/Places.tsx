"use client"

import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SearchBar from './Searchbar';
import TagFilter from './TagFilter';
import NotFound from './NotFound';

interface Place {
  id: string;
  image: string;
  name: string;
  description: string;
  tags: string[];
}

export default function Places({ userLanguage }: { userLanguage: string }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <div>
      <SearchBar onSearch={handleSearch} />
      <TagFilter tags={getUniqueTags(places)} onTagFilter={handleTagFilter} selectedTags={selectedTags} />
      <div className='flex gap-4 py-4 flex-wrap'>
      {searchQuery && filteredPlaces.length === 0 ? (
        <NotFound/>
        ) : (
        filteredPlaces.map((place) => (
          <PlaceCard key={place.name} place={place} />
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