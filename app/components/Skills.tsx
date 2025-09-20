'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { skills, uiLabels } = data

interface SkillsProps {
  isDarkMode: boolean
}

export default function Skills({ isDarkMode }: SkillsProps) {
  const [activeTab, setActiveTab] = useState(skills.categories[0].id)

  return (
    <section id="skills" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-hidden`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {skills.title}
        </motion.h2>

        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {skills.categories.map((category: any) => {
            const Icon = resolveIcon(category.icon)
            return (
              <motion.button
                key={category.id}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <span>{category.label}</span>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skills.categories.find((c: any) => c.id === activeTab)?.skills.map((skill: any, index: number) => (
              <SkillCard key={index} skill={skill} index={index} isDarkMode={isDarkMode} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: {
    name: string
    level: number
    color: string
    icon: string
  }
  index: number
  isDarkMode: boolean
}

function SkillCard({ skill, index, isDarkMode }: SkillCardProps) {
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 mr-4 relative">
          <Image
            src={skill.icon}
            alt={`${skill.name} icon`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{skill.name}</h3>
      </div>
      <div className="relative pt-1">
        <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${skill.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
        </div>
        <div className="flex justify-between">
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {uiLabels.proficiency}
          </span>
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {skill.level}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}