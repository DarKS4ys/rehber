"use client"

import React from 'react'
import ContactInner from './ContactInner'
import { motion } from 'framer-motion';

export default function Contact({contact}: {contact: any}) {
  return (
    <motion.section
    initial={{ opacity: 0, y:100}}
    whileInView={{opacity:1, y:0}}
    transition={{duration: 1.2}}
    >
      <ContactInner contact={contact}/>
    </motion.section>
  )
}
