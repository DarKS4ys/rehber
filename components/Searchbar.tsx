"use client"

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Places"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="px-4 py-2 rounded-lg border w-full"
      />
    </div>
  );
};

export default SearchBar;