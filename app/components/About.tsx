'use client'

import React from 'react'
import { motion } from 'framer-motion'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { about } = data

interface AboutProps {
  isDarkMode: boolean
}

export default function About({ isDarkMode }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          variants={itemVariants}
        >
          {about.title}
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="w-full lg:w-1/3 mb-8 lg:mb-0 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
              <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'} blur-lg opacity-75`}></div>
              <motion.img
                src={about.image}
                alt={about.name}
                className="rounded-full object-cover shadow-lg relative z-10 w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="w-full lg:w-2/3 lg:pl-12"
            variants={itemVariants}
          >
            <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {about.name}
            </h3>
            <p className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>{about.role}</p>
            <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {about.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href={about.resumeLink}
                className={`px-6 py-2 rounded-md text-white transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.uiLabels.viewResume}
              </motion.a>
              {about.socials.map((social) => (
                <SocialIcon 
                  key={social.platform}
                  href={social.url} 
                  icon={resolveIcon(social.icon)} 
                  label={social.platform} 
                  isDarkMode={isDarkMode} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

interface SocialIconProps {
  href: string
  icon: React.ElementType
  label: string
  isDarkMode: boolean
}

function SocialIcon({ href, icon: Icon, label, isDarkMode }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode 
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </motion.a>
  )
}

