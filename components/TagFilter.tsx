"use client"
import clsx from 'clsx';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
interface TagFilterProps {
  tags: string[];
  onTagFilter: (tag: string) => void;
  selectedTags: string[];
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
      <motion.ul className="flex list-none flex-wrap gap-2"> {/* Apply 'list-none' class to remove bullets */}
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
              className={clsx('shadow hover:scale-110 active:scale-95 dark:shadow-none px-4 py-2 rounded-lg text-sm border border-border bg-background hover:bg-border transition duration-300', {
                'bg-primary text-background hover:bg-primary/30 hover:text-black dark:hover:bg-white/80 border-primary': selectedTags.includes(tag),
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