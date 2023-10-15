"use client"
import clsx from 'clsx';
import React from 'react';

interface TagFilterProps {
  tags: string[];
  onTagFilter: (tag: string) => void;
  selectedTags: string[]; // Change the type to an array of strings
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, onTagFilter, selectedTags }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base">Filter by Tag:</h2>
      <div className="flex">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagFilter(tag)}
            className={clsx('px-4 py-2 mr-2 rounded-lg bg-accent text-sm', {
              '!bg-highlight': selectedTags.includes(tag), // Check if the tag is in selectedTags
            })}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;