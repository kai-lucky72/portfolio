'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Calendar, Award, Book } from 'lucide-react'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { roadmap } = data

interface EducationalJourneyProps {
  isDarkMode: boolean
}

export default function EducationalJourney({ isDarkMode }: EducationalJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextItem = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === roadmap.education.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevItem = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? roadmap.education.length - 1 : prevIndex - 1
    )
  }

  return (
    <section id="educational-journey" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {roadmap.title}
        </motion.h2>
        <motion.p 
          className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {roadmap.description}
        </motion.p>
        <div className="relative max-w-4xl mx-auto">
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-200'}`}></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <EducationItem
                item={roadmap.education[currentIndex]}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-12">
            <motion.button
              className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'} shadow-lg`}
              onClick={prevItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'} shadow-lg`}
              onClick={nextItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {roadmap.education.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${
                index === currentIndex
                  ? isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface EducationItemProps {
  item: {
    year: string
    title: string
    institution: string
    achievement: string
    description: string
    icon: string
  }
  isDarkMode: boolean
}

function EducationItem({ item, isDarkMode }: EducationItemProps) {
  const Icon = resolveIcon(item.icon)
  return (
    <div className="flex flex-col items-center mb-16">
      <motion.div
        className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
          isDarkMode ? 'bg-blue-500 border-gray-800' : 'bg-blue-500 border-white'
        } shadow-lg`}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateY: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={40} className="text-white" />
      </motion.div>
      <motion.div
        className={`mt-8 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'} transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
        <p className={`text-base mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {item.institution}
        </p>
        <div className="flex items-center mb-4">
          <Calendar size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
          <span className={`ml-2 text-base ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.year}</span>
        </div>
        <div className="flex items-center mb-4">
          <Award size={20} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
          <span className={`ml-2 text-base ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{item.achievement}</span>
        </div>
        <div className="flex items-start mt-6">
          <Book size={24} className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`ml-4 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  )
}