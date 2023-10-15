"use client"
import clsx from 'clsx';
import React from 'react';
import { motion } from 'framer-motion';

interface TagFilterProps {
  tags: string[];
  onTagFilter: (tag: string) => void;
  selectedTags: string[]; // Change the type to an array of strings
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, onTagFilter, selectedTags }) => {
  const fadeInAnimationVariants = { // for framer motion  
    initial: {
        opacity: 0,
        scale: 0.7,
        x: 100,
    },
    animate: (index: number) => ({
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
          delay: 0.05 * index,
          type: "spring",
          stiffness: 260,
          damping: 20
        }
    })
  }
  return (
      <motion.ul className="flex list-none"> {/* Apply 'list-none' class to remove bullets */}
        {tags.map((tag, index) => (
          <motion.li
            key={tag}
            custom={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
          >
            <button
              onClick={() => onTagFilter(tag)}
              className={clsx('px-4 py-2 mr-2 rounded-lg text-sm border border-border bg-background hover:bg-border transition duration-200', {
                '!bg-highlight': selectedTags.includes(tag), // Check if the tag is in selectedTags
              })}
            >
              {tag}
            </button>
          </motion.li>
        ))}
      </motion.ul>
  );
};

export default TagFilter;