'use client'

import React from 'react'
import { motion } from 'framer-motion'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { services } = data

interface ServicesProps {
  isDarkMode: boolean
}

export default function Services({ isDarkMode }: ServicesProps) {
  return (
    <section id="services" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {services.title}
        </motion.h2>
        <motion.p 
          className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {services.description}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.list.map((service, index) => (
            <ServiceCard key={index} service={service} isDarkMode={isDarkMode} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: {
    title: string
    description: string
    icon: string
  }
  isDarkMode: boolean
  index: number
}

function ServiceCard({ service, isDarkMode, index }: ServiceCardProps) {
  const { title, description, icon } = service
  const Icon = resolveIcon(icon)

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
          : 'bg-white text-gray-800 hover:bg-gray-50'
      } transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full mr-4 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
        }`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
    </motion.div>
  )
}