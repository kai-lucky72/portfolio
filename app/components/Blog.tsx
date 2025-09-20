'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import Link from 'next/link'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { blog } = data

interface BlogProps {
  isDarkMode: boolean
}

interface BlogCardProps {
  icon: string
  title: string
  description: string
  color: string
  darkColor: string
  isDarkMode: boolean
}

const MotionLink = motion(Link)

const BlogCard = ({ icon, title, description, color, darkColor, isDarkMode }: BlogCardProps) => {
  const Icon = resolveIcon(icon)
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-all duration-300 ease-in-out hover:shadow-lg`}
    >
      <h3 className={`text-xl font-semibold mb-4 flex items-center ${isDarkMode ? darkColor : color}`}>
        <Icon className="mr-2" /> {title}
      </h3>
      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
    </motion.div>
  )
}

export default function Blog({ isDarkMode }: BlogProps) {
  const backgroundGradient = isDarkMode
    ? 'bg-gradient-to-br from-gray-900 to-gray-800'
    : 'bg-gradient-to-br from-gray-50 to-gray-100'

  return (
    <section id="blog" className={`py-16 ${backgroundGradient}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`w-full max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
        >
          <div className="p-8">
            <motion.h2 
              className={`text-2xl font-bold text-center flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {(() => {
                const Icon = resolveIcon("Code")
                return <Icon className="mr-3 text-blue-500" size={32} />
              })()}
              {blog.title}
            </motion.h2>
            <motion.p 
              className={`text-center text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {blog.description}
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {blog.cards.map((card, index) => (
                <BlogCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  color={card.color}
                  darkColor={card.darkColor}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <MotionLink
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } font-bold py-3 px-6 rounded-full text-md transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="mr-2" /> {blog.buttonText}
              </MotionLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

